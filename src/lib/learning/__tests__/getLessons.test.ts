import { describe, it, vi, expect, beforeEach } from "vitest";

vi.mock("../lessons/ai", () => ({
  generateAILesson: vi.fn(),
}));
import { resetStores } from "./test-utils";
import { lessons } from "../lessons/store";
import { getLessons } from "../lessons/queries";

describe("get lesson queries", () => {
  beforeEach(() => {
    resetStores();
  });

  describe("getLessons", () => {
    it("returns lessons sorted by newest first", async () => {
      const older = {
        id: "1",
        title: "Old Lesson",
        originalPrompt: "old prompt",
        explanation: "old explanation",
        keyPoints: ["a"],
        createdAt: new Date("2020-01-01"),
      };

      const newer = {
        id: "2",
        title: "New Lesson",
        originalPrompt: "new prompt",
        explanation: "new explanation",
        keyPoints: ["b"],
        createdAt: new Date("2023-01-01"),
      };

      lessons.push(older, newer);

      const result = await getLessons();

      expect(result.length).toBe(2);
      expect(result[0].id).toBe("2"); // newest first
      expect(result[1].id).toBe("1");
    });

    it("returns an empty array if no lessons exist", async () => {
      const result = await getLessons();
      expect(result).toEqual([]);
    });

    it("does not mutate the original lessons array", async () => {
      lessons.push({
        id: "1",
        title: "Lesson",
        originalPrompt: "prompt",
        explanation: "explanation",
        keyPoints: ["a"],
        createdAt: new Date("2022-01-01"),
      });

      const result = await getLessons();

      expect(result).not.toBe(lessons); 
    });
  });
});
