import { sendMessage } from "@/lib/telegramClient";
import { NextApiRequest, NextApiResponse } from "next";

const telegramifyMarkdown = require("telegramify-markdown");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { query } = req;
    if (query.chatId && query.body) {
      const result = await sendMessage(
        query.chatId as string,
        telegramifyMarkdown(query.body)
      );
      res.status(200).json({ data: result });
    } else {
      res.status(400).json({ error: "Missing body parameter" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
