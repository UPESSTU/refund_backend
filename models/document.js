const { Schema, model, default: mongoose } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const childDocSchema = Schema(
  {
    file: {
      type: mongoose.ObjectId,
      ref: "File",
      required: true,
    },
    remarks: {
      type: String,
    },
  },
  { timestamps: true }
);

const documentSchema = Schema(
  {
    student: {
      type: mongoose.ObjectId,
      ref: "User",
      required: true,
    },
    passportPhoto: childDocSchema,
    classTenMarksheet: childDocSchema,
    studentSignature: childDocSchema,
    adhaarCardFront: childDocSchema,
    adhaarCardBack: childDocSchema,
    gazetteNotification: childDocSchema,
    gazetteNotificationSerial: {
      type: String,
    },
    newspaperCutting: childDocSchema,
    notarizeAffidavit: childDocSchema,
  },
  { timestamps: true }
);

documentSchema.plugin(mongoosePaginate);

const Document = model("Document", documentSchema);

module.exports = Document;
