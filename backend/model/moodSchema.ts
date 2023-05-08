import mongoose from "mongoose";

const moodSchema = new mongoose.Schema({
    name: {type: String, require: true, unique: true},
    color: {type: String, require: true, unique: true},
    status: {type: Boolean, default: true},
    createdAT: {types: Date, default: new Date()}
})

const Mood = mongoose.model("moods", moodSchema);
export default Mood;