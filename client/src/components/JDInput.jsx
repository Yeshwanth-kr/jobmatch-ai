import { useJobMatch } from '../context/JobMatchContext.jsx';

const JDInput = () => {
  const { jdText, setJdText } = useJobMatch();

  return (
    <div className="p-4 border rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-2">Paste Job Description</h2>
      <textarea
        value={jdText}
        onChange={(e) => setJdText(e.target.value)}
        rows={8}
        placeholder="Paste the job description here..."
        className="w-full p-2 border rounded"
      />
    </div>
  );
};

export default JDInput;
