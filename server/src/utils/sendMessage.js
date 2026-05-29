const sendMessage = async(groq, pool, channel, content, chatId) => {
    await pool.query(
      "INSERT INTO messages (sender, content, chat_id) VALUES ($1, $2, $3) RETURNING *",
      ["user", content, chatId],
    );

    // send through Stream (for realtime de
    // livery to the frontend)
    await channel.sendMessage({ text: content, user_id: String(userId) });

    // send a message to the groq
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", // free and very capable
      messages: [{ role: "user", content: content }],
    });

    const whisprMessage = response.choices[0].message.content;

    // save AI response to db
    await pool.query(
      "INSERT INTO messages (sender, content, chat_id) VALUES ($1, $2, $3) RETURNING *",
      ["assistant", whisprMessage, chatId],
    );

    // send AI response through Stream
    await channel.sendMessage({ text: whisprMessage, user_id: "whisper_bot" });


}

export default sendMessage;