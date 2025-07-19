import { useJobMatch } from "../context/JobMatchContext.jsx";
import { extractTextFromPDF } from "../utils/parsePDF.js";

const JDUpload = () => {
  const { setJdText } = useJobMatch();

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const text = await extractTextFromPDF(file);
      setJdText(text);
    }
  };

  return (
    <div className="p-4 border rounded-xl shadow-sm mb-2 mt-2">
      <h2 className="text-lg font-semibold mb-2">Upload Job Description PDF</h2>
      <input type="file" accept="application/pdf" onChange={handleFileUpload} />
    </div>
  );
};

export default JDUpload;
