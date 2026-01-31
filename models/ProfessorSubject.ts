import mongoose, { Schema, model, models } from "mongoose";

const profSubSchema = new Schema({
  professor: { type: Schema.Types.ObjectId, ref: "Professor", required: true },
  subject: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
});

const ProfessorSubject = models.ProfessorSubject || model("ProfessorSubject", profSubSchema);
export default ProfessorSubject;
