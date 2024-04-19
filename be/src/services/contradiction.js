import "openai/shims/node";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.KEY_OPENAI,
});

const buildMessage = (term, newTerm) => {
  const message = {
    role: "user",
    content: `Kiểm tra cặp câu sau? Chỉ trả lời 1 cho có mâu thuẫn, 2 khi một câu vi phạm luật hình sự, 3 khi nội dung trùng lặp và 0 cho các trường hợp khác.'${term}' và '${newTerm}'`,
  };
  return message;
};

const buildListMessage = (terms, newTerm) => {
  const messages = [];
  for (var i = 0; i < terms.length; i++) {
    var message = "";
    if (i === 0) {
      message = buildMessage(terms[i].content, newTerm);
    } else {
      message = {
        role: "user",
        content: `'${terms[i].content}' và '${newTerm}'`,
      };
    }
    messages.push(message);
  }
  return messages;
};

export const detectContraction = async ({ terms = [], newTerm = "" }) => {
  const result = [];
  const messages = buildListMessage(terms, newTerm);
  // for (var term of terms) {
  //   const message = buildMessage(term);
  //   try {
  //     const chatCompletion = await openai.chat.completions.create({
  //       messages: [message],
  //       model: "gpt-4",
  //     });

  //     if (chatCompletion?.choices[0]?.message?.content) {
  //       result.push(chatCompletion?.choices[0]?.message?.content);
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //     result.push(0);
  //   }
  // }
  try {
    console.log(messages);

    const chatCompletion = await openai.chat.completions.create({
      messages: messages,
      model: "gpt-4",
    });

    if (chatCompletion?.choices[0]?.message?.content) {
      console.log(chatCompletion?.choices);
    }
  } catch (error) {
    console.log(error);
  }

  return result;
};
