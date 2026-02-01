import mongoose, { Schema, model, models } from "mongoose";

const professorSchema = new Schema({
  name: { type: String, required: true },
  course: { type: String }, 

  
  subjects: [{
    type: Schema.Types.ObjectId, 
    ref: "Subject", 
    required: true 
  }],
});

const Professor = models.Professor || model("Professor", professorSchema);
export default Professor;