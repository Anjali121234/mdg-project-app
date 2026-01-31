import mongoose, { Schema, model, models } from "mongoose";

const professorSchema = new Schema({
  name: { type: String, required: true },
  subjects: [{ type: Schema.Types.ObjectId, ref: "Subject" }], // links to subjects
});

const Professor = models.Professor || model("Professor", professorSchema);
export default Professor;
