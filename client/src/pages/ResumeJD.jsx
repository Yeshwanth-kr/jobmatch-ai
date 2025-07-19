import { useState } from "react";
import CompareButton from "../components/CompareButton";
import JDInput from "../components/JDInput";
import JDUpload from "../components/JDUpload";
import OpenButton from "../components/OpenButton";
import ResumeUpload from "../components/ResumeUpload";
import { compareResumeAndJD } from "../utils/gemini";

const ResumeJD = () => {
  const [error, setError] = useState("");
  const [comparisonResult, setComparisonResult] = useState("");
  const [comparing, setComparing] = useState(false);

  const handleCompare = async (resumeText, jdText) => {
    if (!resumeText || !jdText) {
      alert("Please upload both resume and job description.");
      return;
    }

    setComparing(true);
    setError("");
    setComparisonResult("");

    try {
      const result = await compareResumeAndJD(resumeText, jdText);
      setComparisonResult(result);
    } catch (err) {
      setError("Error comparing resume and JD");
      console.error(err);
    } finally {
      setComparing(false);
    }
  };

  return (
    <div className="p-2">
      <OpenButton />
      <h1 className="text-3xl font-bold text-center mb-6">JobMatch AI</h1>
      <ResumeUpload />
      <JDInput />
      <JDUpload />
      <CompareButton onCompare={handleCompare} loading={comparing} />

      {comparisonResult && (
        <div className="mt-6 p-4 bg-white border rounded shadow-sm space-y-4 mb-3">
          {comparisonResult.split("\n").map((line, index) => {
            if (line.startsWith("Score:")) {
              return (
                <div key={index} className="text-xl font-bold text-green-600">
                  {line}
                </div>
              );
            }
            if (line.startsWith("Strengths:")) {
              return (
                <h3
                  key={index}
                  className="text-lg font-semibold text-blue-600 mt-4"
                >
                  ✅ Strengths
                </h3>
              );
            }
            if (line.startsWith("Weaknesses:")) {
              return (
                <h3
                  key={index}
                  className="text-lg font-semibold text-red-600 mt-4"
                >
                  ⚠️ Weaknesses
                </h3>
              );
            }
            if (line.startsWith("Suggestions")) {
              return (
                <h3
                  key={index}
                  className="text-lg font-semibold text-yellow-600 mt-4"
                >
                  💡 Suggestions
                </h3>
              );
            }
            if (line.startsWith("- ")) {
              return (
                <li key={index} className="ml-6 list-disc">
                  {line.replace("- ", "")}
                </li>
              );
            }
            return <p key={index}>{line}</p>;
          })}
        </div>
      )}

      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default ResumeJD;
