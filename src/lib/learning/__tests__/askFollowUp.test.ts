import { describe, it, expect, beforeEach, vi } from "vitest";
import { resetStores } from "./test-utils";
import { followUpMessages } from "../followups/store";
import { askFollowUp } from "../followups/mutations";

// Mock AI follow-up generator
vi.mock("../followups/ai", () => ({
  generateFollowUpAnswer: vi.fn().mockResolvedValue("Mock assistant answer"),
}));

// Mock lesson lookup
vi.mock("../lessons/queries", () => ({
  getLessonById: vi.fn().mockImplementation(async (id: string) => {
    if (id === "missing") return null;

    return {
      id,
      title: "Test Lesson",
      explanation: "Some explanation",
      keyPoints: ["a", "b"],
      createdAt: new Date(),
    };
  }),
}));

const { generateFollowUpAnswer } = await import("../followups/ai");

describe("askFollowUp", () => {
  beforeEach(() => {
    resetStores();
    vi.clearAllMocks();
  });

  it("creates a user and assistant message", async () => {
    await askFollowUp("1", "What is example?");

    expect(followUpMessages.length).toBe(2);

    const userMessage = followUpMessages[0];
    const assistantMessage = followUpMessages[1];

    expect(userMessage.text).toBe("What is example?");
    expect(assistantMessage.text).toBe("Mock assistant answer");

    expect(userMessage.role).toBe("user");
    expect(assistantMessage.role).toBe("assistant");

    expect(userMessage.lessonId).toBe("1");
    expect(assistantMessage.lessonId).toBe("1");
  });


  it("throws if question is empty", async () => {
    await expect(askFollowUp("1", "")).rejects.toThrow(
      "Question is required"
    );
  });

  it("throws if lessonId is missing", async () => {
    await expect(askFollowUp("", "Hello")).rejects.toThrow(
      "lessonId is required"
    );
  });

  it("throws if lesson does not exist", async () => {
    await expect(askFollowUp("missing", "Hello")).rejects.toThrow(
      "Lesson not found"
    );
  });

  it("calls AI with the cleaned question", async () => {
    await askFollowUp("1", "Hi there");

    expect(generateFollowUpAnswer).toHaveBeenCalledTimes(1);
    expect(generateFollowUpAnswer).toHaveBeenCalledWith(
      expect.any(Object), // lesson object
      "Hi there"
    );
  });

  it("stores messages in correct order (user first, assistant second)", async () => {
    await askFollowUp("1", "Hi!");

    expect(followUpMessages[0].role).toBe("user");
    expect(followUpMessages[1].role).toBe("assistant");
  });
});