import mongoose from "mongoose";

const UniSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String }
});

const University = mongoose.model("University", UniSchema);
export default University;
