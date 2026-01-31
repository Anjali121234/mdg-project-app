import mongoose, { Schema, model, models } from "mongoose";

const subjectSchema = new Schema({
  name: { type: String, required: true },
});

const Subject = models.Subject || model("Subject", subjectSchema);
export default Subject;
