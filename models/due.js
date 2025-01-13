const { Schema, model, default: mongoose } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')



const dueSchema = Schema({
    student: {
        type: mongoose.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    libraryDue: {
        type: String,
        enums: ['YES', 'NO'],
    },
    libraryRemark: {
        type: String
    },
    libraryStatus: {
        type: String,
        enums: ['PENDING', 'IN-REVIEW', 'SUCCESS', 'REJECTED'],
        default: 'PENDING'
    },
    financeDue: {
        type: String,
        enums: ['YES', 'NO'],
    },
    financeRemark: {
        type: String,
    },
    financeStatus: {
        type: String,
        enums: ['PENDING', 'IN-REVIEW', 'SUCCESS', 'REJECTED'],
        default: 'PENDING'
    },
    documentDue: {
        type: String,
        enums: ['YES', 'NO'],
    },
    documentRemark: {
        type: String,
    },
    documentStatus: {
        type: String,
        enums: ['PENDING', 'IN-REVIEW', 'SUCCESS', 'REJECTED'],
        default: 'PENDING'
    },
    hostelDue: {
        type: String,
        enums: ['YES', 'NO'],
    },
    hostelRemark: {
        type: String,
    },
    hostelStatus: {
        type: String,
        enums: ['PENDING', 'IN-REVIEW', 'SUCCESS', 'REJECTED'],
        default: 'PENDING'
    },
    transportDue: {
        type: String,
        enums: ['YES', 'NO'],
    },
    transportRemark: {
        type: String,
    },
    transportStatus: {
        type: String,
        enums: ['PENDING', 'IN-REVIEW', 'SUCCESS', 'REJECTED'],
        default: 'PENDING'
    },
    sdlDue: { //School/Department/Labs
        type: String,
        enums: ['YES', 'NO'],
    },
    sdlRemark: {
        type: String,
    },
    sdlStatus: {
        type: String,
        enums: ['PENDING', 'IN-REVIEW', 'SUCCESS', 'REJECTED'],
        default: 'PENDING'
    },
    csdOfferLetterDue: {
        type: String,
        enums: ['YES', 'NO', 'NOT APPLICABLE'],
        
    },
    csdOfferLetterRemark: {
        type: String,
    },
    csdOfferLetterStatus: {
        type: String,
        enums: ['PENDING', 'IN-REVIEW', 'SUCCESS', 'REJECTED'],
        default: 'PENDING'
    },
    alumniRegistrationDue: {
        type: String,
        enums: ['YES', 'NO'],
    },
    alumniRegistrationRemark: {
        type: String,
    },
    alumniRegistrationStatus: {
        type: String,
        enums: ['PENDING', 'IN-REVIEW', 'SUCCESS', 'REJECTED'],
        default: 'PENDING'
    },
}, { timestamps: true })

dueSchema.plugin(mongoosePaginate)

const Due = model('Due', dueSchema)

module.exports = Due