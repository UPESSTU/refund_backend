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
    financeDue: {
        type: String,
        enums: ['YES', 'NO'],
    },
    financeRemark: {
        type: String,
    },
    documentDue: {
        type: String,
        enums: ['YES', 'NO'],
    },
    documentRemark: {
        type: String,
    },
    hostelDue: {
        type: String,
        enums: ['YES', 'NO'],
    },
    hostelRemark: {
        type: String,
    },
    transportDue: {
        type: String,
        enums: ['YES', 'NO'],
    },
    transportRemark: {
        type: String,
    },
    sdlDue: { //School/Department/Labs
        type: String,
        enums: ['YES', 'NO'],
    },
    sdlRemark: {
        type: String,
    },
    csdOfferLetterDue: {
        type: String,
        enums: ['YES', 'NO', 'NOT APPLICABLE'],
    },
    csdOfferLetterRemark: {
        type: String,
    },
    alumniRegistrationDue: {
        type: String,
        enums: ['YES', 'NO'],
    },
    alumniRegistrationRemark: {
        type: String,
    },

}, { timestamps: true })

dueSchema.plugin(mongoosePaginate)

const Due = model('Due', dueSchema)

module.exports = Due