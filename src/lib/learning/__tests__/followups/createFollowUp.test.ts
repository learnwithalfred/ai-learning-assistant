import { beforeEach, describe, expect, it, Mock, vi } from "vitest";

vi.mock('@/lib/ai/openai-client', () => ({
  openaiClient: {
    responses: {
      create: vi.fn(),
    },
  },
}))

vi.mock("@/lib/learning/lessons/queries", () => ({
  getLessonById: vi.fn(),
}));

vi.mock('@/lib/learning/followups/ai', () => ({
  generateFollowUpAnswer: vi.fn(),
}))

vi.mock("@/lib/prisma", () => ({
  prisma: {
    followUp: {
      create: vi.fn(),
    },
  },
}));

import { createFollowUp } from "@/lib/learning/followups/mutations";
import { getLessonById } from "@/lib/learning/lessons/queries";
import { generateFollowUpAnswer } from "@/lib/learning/followups/ai";
import { prisma } from "@/lib/prisma";


describe("createFollowUp", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates follow-up successfully", async () => {
    (getLessonById as Mock).mockResolvedValue({
      id: "1",
      userId: "user-1",
      title: "React",
      explanation: "Test",
      keyPoints: [],
    });

    (generateFollowUpAnswer as Mock).mockResolvedValue("AI answer");

    await createFollowUp("1", "What is React?", "user-1");

    expect(prisma.followUp.create).toHaveBeenCalledWith({
      data: {
        lessonId: "1",
        userId: "user-1",
        question: "What is React?",
        answer: "AI answer",
      },
    });

    expect(generateFollowUpAnswer).toHaveBeenCalledWith(
      expect.objectContaining({ id: "1" }),
      "What is React?"
    );
  });

  it("throws if lessonId missing", async () => {
    await expect(
      createFollowUp("", "Q", "user-1")
    ).rejects.toThrow("lessonId is required");
  });

  it("throws if question empty", async () => {
    await expect(
      createFollowUp("1", "", "user-1")
    ).rejects.toThrow("Question is required");
  });

  it("throws if lesson not found", async () => {
    (getLessonById as Mock).mockResolvedValue(null);

    await expect(
      createFollowUp("1", "Q", "user-1")
    ).rejects.toThrow("Lesson not found");
  });
});

