import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const departmentSchema = new mongoose.Schema(
  {
    departmentName: {
      type: String,
      required: true
    },
    state:{
      type: String,
      required: true
    },
    totalComplain: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Complain'

      }]
    },
    totalPending: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Complain'

      }]
    },
    totalResolve: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Complain'

      }]
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
  { timestamps: true }
);

const Department = mongoose.model("Department", departmentSchema);
export default Department;