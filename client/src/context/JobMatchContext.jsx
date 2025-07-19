import { createContext, useContext, useState } from 'react';

const JobMatchContext = createContext();

export const JobMatchProvider = ({ children }) => {
  const [resumeText, setResumeText] = useState('');
  const [jdText, setJdText] = useState('');

  return (
    <JobMatchContext.Provider value={{ resumeText, setResumeText, jdText, setJdText }}>
      {children}
    </JobMatchContext.Provider>
  );
};

export const useJobMatch = () => useContext(JobMatchContext);
