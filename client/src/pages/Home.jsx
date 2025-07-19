import { useState } from "react";
import ResumeUpload from "../components/ResumeUpload.jsx";
import JDInput from "../components/JDInput.jsx";
import JDUpload from "../components/JDUpload.jsx";
import CompareButton from "../components/CompareButton.jsx";
import { compareResumeAndJD } from "../utils/gemini.js";
import Profile from "../components/Profile.jsx";
import Tabs from "../components/Tabs.jsx";
import CloseButton from "../components/CloseButton.jsx";
import { useMenu } from "../context/MenuContext.jsx";
import { useTab } from "../context/TabContext.jsx";
import ATS from "./ATS.jsx";
import History from "./History.jsx";
import OpenButton from "../components/OpenButton.jsx";

const Home = () => {
  const [comparisonResult, setComparisonResult] = useState("");
  const [comparing, setComparing] = useState(false);
  const [error, setError] = useState("");
  const { menuOpen } = useMenu();
  const { tab } = useTab();

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
    <div className="w-full h-full flex-row flex ">
      <div
        className={`${
          menuOpen
            ? "w-full xl:w-[20%] flex-col md:border-r-2"
            : "hidden xl:block"
        } h-screen w-[20%] xl:block fixed flex-col border-r-2 bg-white px-3`}
      >
        <CloseButton />
        <Tabs />
        <Profile />
      </div>
      {tab === "ResumeJD" && (
        <div
          className={`${
            menuOpen ? "hidden xl:block" : ""
          } mx-auto px-8 w-full xl:w-[80%] xl:absolute xl:right-0`}
        >
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
                    <div
                      key={index}
                      className="text-xl font-bold text-green-600"
                    >
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
      )}
      {tab === "ATS" && <ATS />}
      {tab === "History" && <History />}
    </div>
  );
};

export default Home;
