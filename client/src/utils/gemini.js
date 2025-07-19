export const compareResumeAndJD = async (resumeText, jdText) => {
  const prompt = `
You are an AI Resume Evaluator. Compare the given resume and job description. 
Return a detailed response in the following **strict structure**:


Score: <Give a percentage match between 0-100%>

Strengths:
- Point 1
- Point 2

Weaknesses:
- Point 1
- Point 2

Suggestions for Improvement:
- Point 1
- Point 2


Resume:
${resumeText}

Job Description:
${jdText}
`;

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
      process.env.REACT_APP_GEMINI_API_KEY,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  const data = await response.json();
  console.log(data);
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
};
