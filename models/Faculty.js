import mongoose from "mongoose";

const FacultySchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: String,
    university: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "University",
        required: true
    }
});

const Faculty = mongoose.model("Faculty", FacultySchema);
export default Faculty;
