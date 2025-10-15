import mongoose from "mongoose";

const complainSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  file: {
    type: [String]
  },
  departmentAddressed: {
    type: String,
    ref: "Department"
  },
  category: {
    type: String,

  },
  state: {
    type: String
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  status: {
    type: String,
    enum: ["seen", "assign", "resolve", "reject"],
    default: "pending"
  }

})

export const Complain = mongoose.model("Complain", complainSchema)