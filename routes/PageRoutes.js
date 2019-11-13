const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.send(`<h1>Welcome Home ${process.env.SOME_VAR}</h1>`)
});

router.get('/about', (req, res)=>{

    res.send(`
                <h1>About Page</h1>
                <p>${req.query.section}</p>
                <p>${req.query.year}</p>
                <p>${req.query.industry}</p>
    `)

});

router.get('/contact', (req, res)=>{
    res.send("<h1>Contact Page</h1>")
});

router.get('/blog/:page', (req, res)=>{
    const page = req.params.page;
    res.send("<h1>Welcome to " + page + "</h1>")
});

router.get('*', (req, res)=>{
    res.send("<h1>404!</h1>")
});




module.exports = router;