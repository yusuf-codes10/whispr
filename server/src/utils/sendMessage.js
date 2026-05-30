const sendMessageUtil = async (groq, pool, channel, content, conversation, userId, chatId) => {
  const groqMessages = conversation ?? [{ role: "user", content }];

  await pool.query(
    "INSERT INTO messages (sender, content, chat_id) VALUES ($1, $2, $3) RETURNING *",
    ["user", content, chatId]
  );

  await channel.sendMessage({ text: content, user_id: String(userId) }); // ✅ always a string

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: groqMessages, //  uses conversation context
  });

  const whisprMessage = response.choices[0].message.content;

  await pool.query(
    "INSERT INTO messages (sender, content, chat_id) VALUES ($1, $2, $3) RETURNING *",
    ["assistant", whisprMessage, chatId]
  );

  await channel.sendMessage({ text: whisprMessage, user_id: "whisper_bot" });

  return whisprMessage;
};

export default sendMessageUtil;