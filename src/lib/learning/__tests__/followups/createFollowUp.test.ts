import { describe, it, expect, vi, type Mock, beforeEach } from "vitest";

vi.mock("@/modules/followups/followup.repository", () => ({
  createNewFollowUp: vi.fn(),
}));

vi.mock("@/modules/lessons/lesson.repository", () => ({
  findLessonById: vi.fn(),
}));

vi.mock("@/lib/learning/followups/ai", () => ({
  generateFollowUpAnswer: vi.fn(),
}));

import * as followupRepository from "@/modules/followups/followup.repository";
import * as lessonRepository from "@/modules/lessons/lesson.repository";
import { generateFollowUpAnswer } from "@/lib/learning/followups/ai";
import { createFollowUp } from "@/modules/followups/followup.service";

describe("createFollowUp", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates follow up successfully", async () => {
    (lessonRepository.findLessonById as Mock).mockResolvedValue({
      id: "lesson-1",
      userId: "user-1",
      title: "React",
    });

    (generateFollowUpAnswer as Mock).mockResolvedValue("AI answer");

    (followupRepository.createNewFollowUp as Mock).mockResolvedValue({
      id: "f-1",
      answer: "AI answer",
    });

    const result = await createFollowUp(
      "lesson-1",
      "  What is JSX?  ",
      "user-1",
    );

    expect(generateFollowUpAnswer).toHaveBeenCalledWith(
      expect.objectContaining({ id: "lesson-1" }),
      "What is JSX?",
    );

    expect(followupRepository.createNewFollowUp).toHaveBeenCalledWith({
      lessonId: "lesson-1",
      question: "What is JSX?",
      answer: "AI answer",
      userId: "user-1",
    });
  });

  it("throws if unauthenticated", async () => {
    await expect(createFollowUp("lesson-1", "Question", "")).rejects.toThrow(
      "Unauthenticated",
    );
  });

  it("throws if lessonId missing", async () => {
    await expect(createFollowUp("", "Question", "user-1")).rejects.toThrow(
      "Lesson ID is required",
    );
  });

  it("throws if question empty", async () => {
    await expect(createFollowUp("lesson-1", "   ", "user-1")).rejects.toThrow(
      "Question is required",
    );
  });

  it("throws if lesson not found", async () => {
    (lessonRepository.findLessonById as Mock).mockResolvedValue(null);

    await expect(
      createFollowUp("lesson-1", "Question", "user-1"),
    ).rejects.toThrow("Lesson not found");
  });

  it("throws if lesson belongs to another user", async () => {
    (lessonRepository.findLessonById as Mock).mockResolvedValue({
      id: "lesson-1",
      userId: "other-user",
    });

    await expect(
      createFollowUp("lesson-1", "Question", "user-1"),
    ).rejects.toThrow("Lesson not found");
  });
});
