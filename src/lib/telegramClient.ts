export async function sendMessage(chatId: string, text: string) {
  try {
    const res = await fetch(
      "https://api.telegram.org/bot" +
        process.env.TELEGRAM_BOT_TOKEN +
        "/sendMessage",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: "Markdown",
        }),
      }
    );
    if (!res.ok) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}
