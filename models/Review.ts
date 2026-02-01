import mongoose, { Schema, model, models } from "mongoose";

const reviewSchema = new Schema(
  {
    subject: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    professor: {
      type: Schema.Types.ObjectId,
      ref: "Professor",
      required: true,
    },
   
    collegeId: { 
      type: String, 
      required: true 
    }, 
    teachingQuality: { type: Number, min: 1, max: 5, required: true },
    conceptClarity: { type: Number, min: 1, max: 5, required: true },
    gradingQuality: { type: Number, min: 1, max: 5, required: true },
    chillness: { type: Number, min: 1, max: 5, required: true },
    approachability: { type: Number, min: 1, max: 5, required: true },
  },
  { timestamps: true }
);

const Review = models.Review || model("Review", reviewSchema);
export default Review;