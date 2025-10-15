import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    whistler: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Whistle", 
      required: true,
    },
    ComplainId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Complain", 
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true } 
);

export const Chat = mongoose.model("Chat", chatSchema);
