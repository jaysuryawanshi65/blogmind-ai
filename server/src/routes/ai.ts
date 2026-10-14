import { Router } from "express";
import { GoogleGenAI } from "@google/genai";
import { requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

const MAX_RETRIES = 3;
const INITIAL_DELAY_MS = 2000;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function generateWithRetry(
  ai: GoogleGenAI,
  model: string,
  prompt: string,
): Promise<string> {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const result = await ai.models.generateContent({
        model,
        contents: prompt,
      });

      const text = result.text || "";

      if (!text.trim()) {
        throw new Error("Gemini returned an empty response.");
      }

      return text;
    } catch (error: unknown) {
      const apiError = error as {
        status?: number;
        message?: string;
      };

      const status = apiError?.status;

      // Retry temporary server errors and rate limits.
      const retryable =
        status === 429 ||
        status === 500 ||
        status === 502 ||
        status === 503 ||
        status === 504;

      if (!retryable || attempt === MAX_RETRIES) {
        throw error;
      }

      const delay = INITIAL_DELAY_MS * Math.pow(2, attempt);

      console.warn(
        `Gemini request failed (status ${status}). ` +
          `Retry ${attempt + 1}/${MAX_RETRIES} in ${delay / 1000}s.`,
      );

      await sleep(delay);
    }
  }

  throw new Error("Gemini generation failed after retries.");
}

router.post(
  "/generate",
  requireAuth,
  asyncHandler(async (req, res) => {
    const topic = String(req.body.topic || "").trim();
    const tone = String(req.body.tone || "friendly").trim();

    if (topic.length < 4) {
      return res.status(400).json({
        message: "Enter a topic with at least 4 characters.",
      });
    }

    if (topic.length > 500) {
      return res.status(400).json({
        message: "Topic must be 500 characters or fewer.",
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        message: "Gemini API key is missing. Check server/.env.",
      });
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const model = process.env.GEMINI_MODEL || "gemini-3.8-flash";

      const prompt = `You are a professional blog writer.

Write a useful, engaging blog post about: ${topic}

Writing tone: ${tone}

Requirements:
1. Start with a compelling title.
2. Write an engaging introduction.
3. Organize the article using clear Markdown headings.
4. Include practical examples.
5. Add useful takeaways.
6. Finish with a meaningful conclusion.
7. Use readable paragraphs and lists.
8. Do not invent citations or present uncertain facts as true.

Return only the blog draft in well-structured Markdown.`;

      const text = await generateWithRetry(ai, model, prompt);

      return res.json({
        demo: false,
        text,
      });
    } catch (error: unknown) {
      console.error("Gemini generation failed:", error);

      const apiError = error as {
        status?: number;
      };

      const status = apiError?.status;

      if (status === 503) {
        return res.status(503).json({
          message:
            "Gemini is temporarily busy, even after retries. Please try again later.",
        });
      }

      if (status === 429) {
        return res.status(429).json({
          message:
            "Gemini API quota or rate limit reached. Please check your quota and try again later.",
        });
      }

      if (status === 401 || status === 403) {
        return res.status(502).json({
          message:
            "Gemini authentication failed. Check your API key and permissions.",
        });
      }

      if (status === 404) {
        return res.status(502).json({
          message:
            "Gemini model is unavailable. Check GEMINI_MODEL in server/.env.",
        });
      }

      return res.status(502).json({
        message:
          "AI generation failed. Please check the server logs and try again.",
      });
    }
  }),
);

export default router;
