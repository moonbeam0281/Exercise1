import mongoose from "mongoose";

const UniScheme = new mongoose.Schema({
    name: {type: String, require: true},
    address: {type: String}
});

const University = mongoose.model("University", UniScheme);
export default University;
