import { useJobMatch } from "../context/JobMatchContext.jsx";

const CompareButton = ({ onCompare, loading }) => {
  const { resumeText, jdText } = useJobMatch();

  const handleClick = () => {
    if (resumeText && jdText) {
      onCompare(resumeText, jdText);
    } else {
      alert("Please upload both resume and job description.");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      {loading ? "Comparing..." : "Compare Resume & JD"}
    </button>
  );
};

export default CompareButton;
