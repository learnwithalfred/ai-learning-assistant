import { describe, it, expect, vi, beforeEach } from "vitest";
vi.mock("../lessons/ai", () => ({
  generateAILesson: vi.fn(),
}));
import { resetStores } from "./test-utils";
import { lessons } from "../lessons/store";
import { getLessonById } from "../lessons/queries";

describe("get lesson by id", () => {
  beforeEach(() => {
    resetStores();
  });

  describe("getLessonById", () => {
    it("returns the lesson when found", async () => {
      const lesson = {
        id: "1",
        title: "Lesson 1",
        originalPrompt: "prompt",
        explanation: "explanation",
        keyPoints: ["a", "b"],
        createdAt: new Date(),
      };

      lessons.push(lesson);

      const result = await getLessonById("1");

      expect(result).toEqual(lesson);
    });

    it("returns null if lesson is not found", async () => {
      const result = await getLessonById("missing-id");
      expect(result).toBeNull();
    });
  });
});
