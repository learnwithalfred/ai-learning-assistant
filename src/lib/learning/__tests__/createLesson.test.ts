import { describe, it, expect, vi, beforeEach } from "vitest";
import { resetStores } from "./test-utils";

import { lessons } from "../lessons/store";
import { createLesson } from "../lessons/mutations";

// MOCK AI + TITLE EXTRACTOR
vi.mock("../lessons/ai", () => ({
  generateAILesson: vi.fn().mockResolvedValue({
    explanation: "Mock explanation",
    keyPoints: ["one", "two"],
  }),
}));

vi.mock("../lessons/title", () => ({
  extractTitle: vi.fn().mockResolvedValue("Mock Title"),
}));

describe("createLesson", () => {
  beforeEach(() => {
    resetStores();
    vi.clearAllMocks();
  });

  it("creates and stores a new lesson", async () => {
    const result = await createLesson({ prompt: "teach me about dogs" });

    expect(result.title).toBe("About dogs");
    expect(result.explanation).toBe("Mock explanation");
    expect(result.keyPoints).toEqual(["one", "two"]);

    // Store updated?
    expect(lessons.length).toBe(1);
    expect(lessons[0].title).toBe("About dogs");
  });

  it("throws if prompt is empty", async () => {
    await expect(createLesson({ prompt: " " }))
      .rejects
      .toThrow("Prompt is required");
  });

  it("creates unique IDs + timestamp", async () => {
    const lesson = await createLesson({ prompt: "what is AI" });

    expect(lesson.id).toBeDefined();
    expect(lesson.createdAt).toBeInstanceOf(Date);
  });
});
