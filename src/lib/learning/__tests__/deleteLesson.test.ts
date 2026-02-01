import { describe, it, expect,vi, beforeEach } from "vitest";
import { resetStores } from "./test-utils";
import { lessons } from "../lessons/store";
import { deleteLesson } from "../lessons/mutations";


vi.mock("@/lib/ai/openai-client", () => ({
  openaiClient: {
    responses: {
      create: vi.fn().mockResolvedValue({ output_text: "mock" })
    }
  }
}));

vi.mock("@/lib/ai/configs", () => ({
  AI_CONFIG: {
    model: "mock-model",
    reasoning: {},
    maxOutputTokens: 100
  }
}));


describe("deleteLesson", () => {

  beforeEach(() => {
    resetStores();
  });

  it("deletes a lesson by ID", async () => {
    // arrange
    lessons.push({
      id: "1",
      title: "Test Lesson",
      originalPrompt: "test prompt",
      explanation: "explanation",
      keyPoints: ["a", "b"],
      createdAt: new Date(),
    });

    await deleteLesson("1");

    expect(lessons.length).toBe(0);
  });

  it("throws if lesson does not exist", async () => {
    await expect(deleteLesson("missing-id"))
      .rejects
      .toThrow("Lesson not found");
  });

  it("only deletes the requested lesson", async () => {
    lessons.push(
      {
        id: "1",
        title: "Lesson 1",
        originalPrompt: "prompt 1",
        explanation: "explanation 1",
        keyPoints: ["a"],
        createdAt: new Date(),
      },
      {
        id: "2",
        title: "Lesson 2",
        originalPrompt: "prompt 2",
        explanation: "explanation 2",
        keyPoints: ["b"],
        createdAt: new Date(),
      }
    );

    await deleteLesson("1");

    expect(lessons.length).toBe(1);
    expect(lessons[0].id).toBe("2");
  });

});
