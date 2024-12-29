const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const mongoose = require("mongoose");
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    emailAddress: {
      type: String,
      required: true,
      unique: true,
    },
    encpy_password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
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
      unique: true,
    },
    programName: {
      type: String,
    },
    batch: {
      type: String,
    },
    dateOfBirth: {
      type: Number,
    },
    schoolName: {
      type: String,
      enum: [
        "School of Advanced Engineering",
        "School of Business",
        "School of Computer Science",
        "School of Design",
        "School of Health Sciences and Technology",
        "School of Law",
        "School of Liberal Studies(Liberal Studies)",
        "School of Liberal Studies(Modern Media)",
      ],
    },
    adhaarNumber: {
      type: Number,
      unique: false,
      default: null, // Allow null or blank entries
    },
    contactNumber: {
      type: Number,
      unique: false,
      default: null, // Allow null or blank entries
      //   unique: true,
    },
    apaarId: {
      type: String,
      unique: false,
      default: null, // Allow null or blank entries
      //   unique: true,
    },
  },
  { timestamps: true }
);

// Add pagination plugin to the schema
userSchema.plugin(mongoosePaginate);

// Check if the model already exists to avoid redefinition
const User = mongoose.models.User || model("User", userSchema);

module.exports = User;
