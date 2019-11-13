const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const UserModel = require('../models/UserModel');
const secret = 'thisIsTheSecret';

router.post('/register', (req, res)=>{

    const formData = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : req.body.password
    }

    const newUser = new UserModel(formData);

    // Step 1. Generate a salt (random data for adding complexity)
    bcrypt.genSalt((err, salt)=>{
        if(err) {
            console.log('error is', err);
        }
        
        // Step 2. Generate a hashed password using (a) the user's password
        // and (b) the salt
        bcrypt.hash(
            newUser.password,
            salt,
            (err, hashedPassword)=>{
                if(err) {
                    console.log('error is', err);
                }
                
                // Step 3. Reassign the user's password to be hashed password
                newUser.password = hashedPassword;

                // Step 4. Saving the formData to the database

                newUser
                .save() // Promise

                // If promise is fulfilled
                .then( 
                    (newUserData)=>{
                        // Send response in the form of JSON
                        res.json(newUserData)
                    }
                )
                // Otherwise...
                .catch(
                    (err)=>{
                        console.log('error', err);
                    }
                )
            }
        )
    });
});

router.post('/login', (req, res)=>{

    const email = req.body.email;
    const password = req.body.password;

    // Step 1. Check to see if account with specified email exists
    UserModel
    .findOne({ email: email }) //{}
    .then((theUser)=>{

        // If an account exists...
        if(theUser) {
            

            // Step 2. Compare the submitted password with the encrypted
            // password in database
            bcrypt
            .compare(password, theUser.password)
            .then((isMatch)=>{

                // If password correct...
                if(isMatch) {

                    // Step 3. Decide the payload (encrypted data you want to send back to client)
                    const payload = {
                        id: theUser.id,
                        email: theUser.email
                    }

                    // Step 4. Generate the JSON Web Token
                    jwt.sign(
                        payload,
                        secret,
                        (err, theJWT)=>{

                            // Step 5. Send the JWT to the client
                            res.json({ token: theJWT })
                        }
                    )

                } 
                // Otherwise, if password is not correct.
                else {
                    res.json({ message: 'Wrong password' })
                }
            })
            .catch()


        } 
        
        // Otherwise, if account doesn't exist
        else {
            res.json({ message: "No user with this account exists" })
        }
    })
    .catch()

});



module.exports = router;