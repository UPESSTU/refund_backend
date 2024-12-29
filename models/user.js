const { Schema, model } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')


const userSchema = Schema({

    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    username: {
        type: String,
        requried: true,
        unique: true
    },
    emailAddress: {
        type: String,
        required: true,
        unique:true
    },
    encpy_password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enums: ['STUDENT', 'ADMIN', 'LD', 'FD', 'TD', 'HD', 'APOD', 'CSD'],
        required: true,
        default: 'STUDENT'
    },
    sapId: {
        type: Number,
        required: true,
        unique: true
    },
    programName: {
        type: String
    },
    batch: {
        type: String
    },
    dateOfBirth: {
        type: Number
    },
    schoolName: {
        type: String,
        enums: ['SOD', 'SOCS', 'SOL', 'SOB', 'SOAE', 'SOHST'],
    },
    adhaarNumber: {
        type: Number,
        unique: true
    },
    contactNumber: {
        type: Number,
        unique: true
    },
    apaarId: {
        type: String,
        unique: true
    }

}, { timestamps: true })


userSchema.plugin(mongoosePaginate)

const User = model('User', userSchema)

module.exports = User