const { Schema, model, default: mongoose } = require('mongoose')




const fileSchema = Schema({

    fileName: String,
    fileType: String,
    filePath: String,
    uploadedBy: {
        type: mongoose.ObjectId,
        ref: 'User',
        required: true
    }
    
}, { timestamps: true })


const File = model('File', fileSchema)

module.exports = File