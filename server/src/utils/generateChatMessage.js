const generateChatTitle = async (groq, message) => {
    const prompt =
      "Extract a title out of this, 3-5 words, significant title: ";
    // send a message to the groq
    const response = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b", // free and very capable
      messages: [{ role: "user", content: prompt + message }],
    });
    const title = response.choices[0].message.content;
    return title.replace(/"/g, '');
}

export default generateChatTitle;
// ! let the error bubble up to the controller to catch it