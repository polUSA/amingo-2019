const express = require('express');
const router = express.Router();
const CompanyModel = require('../models/CompanyModel');

router.post('/', (req, res)=>{ // /feed/...
    const formData = {
        companyname: req.body.companyname,
        employees: req.body.employees,
        location: req.body.location,
        website: req.body.website,
        contact: req.body.contact,
        logo: req.body.logo,
    }

    const newCompany = new CompanyModel(formData);

    newCompany
    .save()
    .then(newCompanyData=>{
        res.json(newCompanyData);
    })
    .catch(err=>{
        res.json(err)
    });

});

module.exports = router;
