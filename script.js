const formtag = document.querySelector("#symptomForm");
const outputBox = document.querySelector("#outputBox");
const analyzeBtn = document.querySelector("#analyzeBtn");

GEMINI_API_KEY = "AIzaSyBSpNuDygTGXpNtZ8yIGjjNfwOqBeb0__A";

formtag.addEventListener("submit", (e) => {
  e.preventDefault();
  const symtomValue = e.target.symptoms.value;
  const ageValue = e.target.age.value;
  const genderValue = e.target.gender.value;

  geminiFunction(symtomValue, ageValue, genderValue);
});

const geminiFunction = async (symtomValue, ageValue, genderValue) => {
  const endpoint =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
    GEMINI_API_KEY;

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: `Patient is a ${ageValue} years old ${genderValue}. They are experiencing the following symptoms: ${symtomValue}. What could be the possible reasons or diseases? Provide a short summary.`,
          },
        ],
      },
    ],
  };

  try {
    analyzeBtn.innerText = "Loding.........";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    const aiText =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "no response found.";
    outputBox.innerText = aiText;
    analyzeBtn.innerText = "Submit";
  } catch (error) {
    console.error(error);
    outputBox.innerText = "error";
    analyzeBtn.innerText = "Submit";
  }
};
