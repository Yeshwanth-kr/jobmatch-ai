import { useJobMatch } from '../context/JobMatchContext.jsx';
import { extractTextFromPDF } from '../utils/parsePDF.js';

const ResumeUpload = () => {
  const { setResumeText } = useJobMatch();

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      try {
        const text = await extractTextFromPDF(file);
        setResumeText(text);
      } catch (err) {
        console.error('Error parsing resume:', err);
        setResumeText('Failed to extract text from resume.');
      }
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  return (
    <div className="p-4 border rounded-xl shadow-sm mb-2">
      <h2 className="text-lg font-semibold mb-2">Upload Your Resume (PDF)</h2>
      <input type="file" accept="application/pdf" onChange={handleFileUpload} />
    </div>
  );
};

export default ResumeUpload;
