import "openai/shims/node";
import OpenAI from "openai";
import db from "../models/index";

const openai = new OpenAI({
  apiKey: process.env.KEY_OPENAI,
});

const buildMessage = (term, newTerm) => {
  if (term && newTerm) {
    const message = {
      role: "user",
      content: `Kiểm tra cặp câu sau? Chỉ trả lời 1 cho có mâu thuẫn, 2 khi một câu vi phạm luật hình sự, 3 khi nội dung trùng lặp và 0 cho các trường hợp khác.'${term}' và '${newTerm}'`,
    };
    return message;
  } else {
    throw new Error("Nội dung điều khoản trống");
  }
};

export const detectContraction = async ({ terms = [], newTerm = {} }) => {
  const result = [];

  for (var term of terms) {
    const message = buildMessage(term?.content, newTerm?.content);
    try {
      const chatCompletion = await openai.chat.completions.create({
        messages: [message],
        model: "gpt-4",
      });
      console.log(message);

      if (chatCompletion?.choices[0]?.message?.content) {
        result.push(chatCompletion?.choices[0]?.message?.content);
      }

      if (String(chatCompletion?.choices[0]?.message?.content) === "2") {
        // TODO: Create ma tuy
        break;
      }

      if (String(chatCompletion?.choices[0]?.message?.content) === "1") {
        console.log(newTerm);
        console.log(term);
        await createContradiction({ termId: newTerm?.id, targetId: term?.id });
      }
      console.log(chatCompletion?.choices[0]?.message?.content);
    } catch (error) {
      console.log("error", error);
      result.push(0);
    }
  }

  return result;
};

const createContradiction = async ({ termId, targetId }) => {
  const transaction = await db.sequelize.transaction();

  if (!termId || !targetId) {
    throw new Error("Không tìm thấy điều khoản");
  }

  try {
    await db.Contradiction.create(
      {
        termId: termId,
        targetId: targetId,
      },
      { transaction: transaction }
    );

    await db.Contradiction.create(
      {
        termId: targetId,
        targetId: termId,
      },
      { transaction: transaction }
    );

    await transaction.commit();
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    throw new Error("Create term contradiction error: ", error);
  }
};
