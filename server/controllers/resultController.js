import Result from "../models/Result.js";

export const saveResult = async (req, res) => {
  const { resumeText, jobDescription, comparisonResult } = req.body;
  if (!resumeText || !jobDescription || !comparisonResult) {
    return res.status(200).json({ message: "All fields are required" });
  } else {
    try {
      const result = new Result({
        user: req.userId,
        resumeText,
        jobDescription,
        comparisonResult,
      });
      await result.save();
      res.status(201).json({ message: "Saved" });
    } catch (err) {
      console.log("Error in saveResult Controller: ", err);
      res.status(500).json({ message: "Failed to save result" });
    }
  }
};

export const getResults = async (req, res) => {
  try {
    const results = await Result.find({ user: req.userId }, { __v: 0 }).sort({
      createdAt: -1,
    });
    res.json(results);
  } catch (err) {
    console.log("Error in getResults Controller: ", err);
    res.status(500).json({ message: "Failed to fetch results" });
  }
};
