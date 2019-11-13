// Import mongoose
const mongoose = require('mongoose');

// Assign the Schema object
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    companyname: {
        type: String,
        required: true
    },
    employees: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    logo: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const CompanyModel = mongoose.model('company', CompanySchema);
module.exports = CompanyModel;