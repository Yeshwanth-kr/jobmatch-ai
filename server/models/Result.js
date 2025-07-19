import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  resumeText: { type: String, required: true },
  jobDescription: { type: String, required: true },
  comparisonResult: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Result = mongoose.model("Result", resultSchema);
export default Result;
