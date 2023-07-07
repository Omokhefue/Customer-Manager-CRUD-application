const mongoose = require('mongoose');
const nodemailer = require('nodemailer')
const Customer = require('../models/customerModel')
const ObjectId =  mongoose.Types.ObjectId
require('dotenv').config()

getAllCustomers = async (req,res) => {
    try {
        const customers = await Customer.find()
        return res.status(200).render( 'allCustomers' ,{ customers } )
    } catch (error) {
        console.log(error.message);
        return res.status(400).json( { error : "could not get customers"} )      
    }
}
getCustomersPerPagination = async (req, res) => {
    const pageSize = 2;
    const page = parseInt(req.query.page) || 1
    const skipValue = (page - 1) * pageSize
    const totalCustomerCount = await Customer.countDocuments()
    const totalPages = Math.ceil(totalCustomerCount / pageSize)
try {
    const customers = await Customer.find().skip(skipValue).limit(pageSize)
    return res.status(200).json({ customers , currentPage: page, totalPages, totalCustomerCount })
} catch (error) {
    console.log(error.message);
    return res.status(400).json({ error: "could not get customers" })
    
}
}
getSingleCustomer = async (req, res) => {
    const id = req.params.id
    try {
    const customer = await Customer.findById(id)
    res.status(200).json({customer})
    } catch (error) {
        console.log(error.message);
        res.status(400).json({error : "could not get customer "})       
    }
}
getNewCustomer = async (req,res) => {
    res.status(200).render('addCustomer',{customer: new Customer()})
}
getEditCustomer = async (req,res) => {
    const id = req.params.id
    let customer = await Customer.find({ _id : id})
    console.log(customer);
    res.status(200).render('addCustomer', {customer})
}
getSendEmail = async (req,res) => {
    res.status(200).json({email:'send email'})
}
postSendEmail = async (req,res) => {
    try {
        const { recipients, subject, message } = req.body;
    
        // Create a transporter using your email service provider's SMTP settings
        const transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: process.env.EMAILSENDER,
            pass: process.env.EMAILPASSWORD
          }
        });
        const mailOptions = {
          from: process.env.EMAILSENDER,
          to: recipients, //array of recipients
          subject: subject,
          text: message
        };
    
        // Send the email
        await transporter.sendMail(mailOptions);
    
        res.status(200).json({ message: 'Email sent successfully!' });
      } catch (error) {
        console.error('Error sending email:', error.message);
        res.status(500).json({ error: 'Failed to send email.' });
      }
}
postNewCustomer = async (req, res) => {
 const { name, email, isSubscribed, telephoneNumber, address } = req.body
 try {
    await Customer.create({ name, email, isSubscribed, telephoneNumber, address })
    return res.status(200).redirect('/customer')
 } catch (error) {
     console.log(error.message);
    res.status(400).json({error : "could not add customer to existing list"})       
 }
}
updateCustomer = async (req, res) => {
    const id = req.params.id
    const updates = req.body
    if((ObjectId.isValid(id))){
    try{
        await Customer.updateOne({_id : new ObjectId(id)},  updates )
        return res.status(200).json({customer: await Customer.find(), success : "deleted"})
    }catch(error){
        return res.status(400).json({error : "could not be updated"})
    }
    }else{
        return res.status(400).json({error : "that customer does not exist"})
    }
}
deleteCustomer = async (req, res) => {
    const id = req.params.id
    if(ObjectId.isValid(id)){
    try{
        await Customer.deleteOne({_id: new ObjectId(id)})
        return res.status(200).json({customers: await Customer.countDocuments(), success : "deleted"})
    }catch(error){
        return res.status(400).json({error : "could not be deleted"})
    }
    }else{
        return res.status(400).json({error : "that customer does not exist"})
    }
}
deleteAllCustomers = async (req, res) => {
    try{
        await Customer.deleteMany()
        return res.status(200).json({customers: await Customer.countDocuments(), success : "deleted"})
    }catch(error){
        return res.status(400).json({error : "could not be deleted"})
    }
}



module.exports = {
getCustomersPerPagination,
getSingleCustomer,
getNewCustomer,
getAllCustomers,
getEditCustomer,
postNewCustomer,
updateCustomer,
deleteCustomer,
deleteAllCustomers,
getSendEmail,
postSendEmail
}