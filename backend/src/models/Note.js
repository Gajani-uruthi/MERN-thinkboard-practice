import mongoose from "mongoose";

// 1- create a schema for the note
// 2- model based off of that schema

const noteSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true
        },
        content:{
            type: String,
            required: true
        },
    },
    {timestamps: true} // this will automatically add createdAt and updatedAt fields to the schema
);

const Note = mongoose.model("Note", noteSchema);
export default Note; 