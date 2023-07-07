const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const customerRoutes = require('./routes/customerRoutes')



const app= express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/customers',customerRoutes)
mongoose.connect(process.env.DBURI)
.then(() => app.listen(3000))
