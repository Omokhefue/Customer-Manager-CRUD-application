const { mongoose , Schema } = require('mongoose')
const { isEmail } = require('validator')


const customerSchema = new Schema({
    name:{
        type:String,
        required:[true, 'name of Customer is required']
    },
    email:{
        type:String,
        required:[true, 'email is required'],
        validate:[isEmail, 'please enter a valid email']
    },
    telephoneNumber:{
        type:Number,
        required:[true, "please input Customer's telephone number"],
    },
    address:{
        type:String
    },
        isSubscribed:{
            type:Boolean,
            default: false
        }
        
    
},{timestamps:true})

module.exports = mongoose.model('customer', customerSchema)