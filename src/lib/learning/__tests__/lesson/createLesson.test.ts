import { describe, it, expect, beforeEach, vi, Mock } from "vitest";

// Mock repository layer
vi.mock("@/modules/lessons/lesson.repository", () => ({
  createNewLesson: vi.fn(),
}));

// Mock AI + utilities
vi.mock("@/lib/learning/lessons/ai", () => ({
  generateAILesson: vi.fn(),
}));

vi.mock("@/lib/learning/utils/extractTitle", () => ({
  extractTitle: vi.fn(),
}));

import * as repository from "@/modules/lessons/lesson.repository";
import { generateAILesson } from "@/lib/learning/lessons/ai";
import { extractTitle } from "@/lib/learning/utils/extractTitle";
import { createLesson } from "@/modules/lessons/lesson.service";

describe("createLesson", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates lesson successfully", async () => {
    // Arrange
    (generateAILesson as Mock).mockResolvedValue({
      explanation: "React is a UI library",
      keyPoints: ["Component-based", "Declarative"],
    });

    (extractTitle as Mock).mockResolvedValue("React");

    (repository.createNewLesson as Mock).mockResolvedValue({
      id: "123",
      title: "React",
      originalPrompt: "Learn React",
      explanation: "React is a UI library",
      keyPoints: ["Component-based", "Declarative"],
      userId: "user-1",
    });

    // Act
    const result = await createLesson({ prompt: "  Learn React  " }, "user-1");

    // Assert
    expect(generateAILesson).toHaveBeenCalledWith({
      prompt: "Learn React",
    });

    expect(extractTitle).toHaveBeenCalledWith("Learn React");

    expect(repository.createNewLesson).toHaveBeenCalledWith({
      id: expect.any(String),
      title: "React",
      originalPrompt: "Learn React",
      explanation: "React is a UI library",
      keyPoints: ["Component-based", "Declarative"],
      userId: "user-1",
    });

    expect(result).toMatchObject({
      title: "React",
      userId: "user-1",
    });
  });

  it("throws if userId missing", async () => {
    await expect(createLesson({ prompt: "React" }, "")).rejects.toThrow(
      "Unauthenticated",
    );
  });

  it("throws if prompt empty", async () => {
    await expect(createLesson({ prompt: "   " }, "user-1")).rejects.toThrow(
      "Prompt is required",
    );
  });

  it("throws if prompt too short", async () => {
    await expect(createLesson({ prompt: "Hi" }, "user-1")).rejects.toThrow(
      "Prompt must be at least 3 characters",
    );
  });
});
