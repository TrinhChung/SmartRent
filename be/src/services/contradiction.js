import "openai/shims/node";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.KEY_OPENAI,
});

const buildMessage = (term) => {
  const message = {
    role: "user",
    content: `Các câu có mâu thuẫn không? Chỉ trả lời 1 cho có hoặc 0 cho không.'${term.s1}' và '${term.s2}'`,
  };
  return message;
};

export const detectContraction = async ({ terms = [] }) => {
  try {
    const result = [];
    for (var term of terms) {
      const message = buildMessage(term);

      const chatCompletion = await openai.chat.completions.create({
        messages: [message],
        model: "gpt-4",
      });

      if (chatCompletion?.choices[0]?.message?.content) {
        result.push(chatCompletion?.choices[0]?.message?.content);
      }
    }

    return result;
  } catch (error) {
    console.log("error", error);
    throw new Error(error);
  }
};
