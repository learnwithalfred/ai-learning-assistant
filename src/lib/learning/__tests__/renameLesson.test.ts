import { describe, it, vi, expect, beforeEach } from "vitest";
vi.mock("../lessons/ai", () => ({
  generateAILesson: vi.fn(),
}));
import { resetStores } from "./test-utils";
import { lessons } from "../lessons/store";
import { renameLesson } from "../lessons/mutations";



describe("renameLesson", () => {
  beforeEach(() => {
    resetStores();
  });

  it("renames an existing lesson", async () => {
    // arrange: add one lesson
    lessons.push({
      id: "1",
      title: "Old Title",
      originalPrompt: "some prompt",
      explanation: "explanation",
      keyPoints: ["a", "b"],
      createdAt: new Date(),
    });

    // act: call renameLesson(id, newTitle)
    await renameLesson("1", "New Title");

    // assert: title was updated
    expect(lessons[0].title).toBe("New Title");
  });

  it("throws if lesson does not exist", async () => {
    await expect(renameLesson("missing-id", "New Title"))
      .rejects
      .toThrow("Lesson not found");
  });

  it("throws if new title is empty or only spaces", async () => {
    // arrange lesson
    lessons.push({
      id: "1",
      title: "Old Title",
      originalPrompt: "some prompt",
      explanation: "explanation",
      keyPoints: ["a", "b"],
      createdAt: new Date(),
    });

    // act & assert
    await expect(renameLesson("1", "   "))
      .rejects
      .toThrow("Title cannot be empty");
  });
});
