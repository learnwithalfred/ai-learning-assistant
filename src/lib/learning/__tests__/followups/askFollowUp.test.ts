import { describe, it, expect, beforeEach, vi } from "vitest";
import type { Lesson } from "@/lib/learning/lessons/types";

vi.mock("@/lib/ai/openai-client", () => ({
  openaiClient: {
    responses: {
      create: vi.fn(),
    },
  },
}));

import { generateFollowUpAnswer } from "@/lib/learning/followups/ai";
import { openaiClient } from "@/lib/ai/openai-client";

describe("generateFollowUpAnswer", () => {
  const mockLesson: Lesson = {
    id: "1",
    title: "React",
    explanation: "React explanation",
    keyPoints: ["Hooks"],
    originalPrompt: "",
    userId: "user-1",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns answer from model", async () => {
    vi.mocked(openaiClient.responses.create).mockResolvedValue({
      output_text: "This is the answer.",
    } as Awaited<ReturnType<typeof openaiClient.responses.create>>);

    const result = await generateFollowUpAnswer(
      mockLesson,
      "What are hooks?"
    );

    expect(result).toBe("This is the answer.");
    expect(openaiClient.responses.create).toHaveBeenCalled();
  });

  it("throws if question is empty", async () => {
    await expect(
      generateFollowUpAnswer(mockLesson, "")
    ).rejects.toThrow("Question is required");
  });

  it("throws if model returns empty", async () => {
    vi.mocked(openaiClient.responses.create).mockResolvedValue({
      output_text: "",
    } as Awaited<ReturnType<typeof openaiClient.responses.create>>);

    await expect(
      generateFollowUpAnswer(mockLesson, "Test")
    ).rejects.toThrow("Empty response from model");
  });
});