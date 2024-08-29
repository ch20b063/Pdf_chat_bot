import express from "express";
import { OpenAI } from "@langchain/openai";
const router = express.Router();

router.post('/question', async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).send({ error: "No question provided" });
    }

    // Process the question here
    const answer = `You asked: ${question}`; // Example static response

    res.send({ answer });
  } catch (error) {
    console.error("Error processing question:", error);
    res.status(500).send({ error: "An error occurred" });
  }
});

export default router;

