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
        enums: ['STUDENT', 'ADMIN', 'LIBRARY_DEPT', 'FINANCE_DEPT', 'SRE_DEPT', 'CS_DEPT', 'APO_DEPT', 'SOCS_DEPT', 'SOHST_DEPT', 'SOAE_DEPT', 'SOL_DEPT', 'SOB_DEPT', 'SOD_DEPT'],
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