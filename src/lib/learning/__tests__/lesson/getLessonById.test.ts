import { describe, it, expect, vi, type Mock, beforeEach } from "vitest";

vi.mock("@/modules/lessons/lesson.repository", () => ({
  findLessonById: vi.fn(),
}));

import * as repository from "@/modules/lessons/lesson.repository";
import { getLessonById } from "@/modules/lessons/lesson.service";

describe("getLessonById", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns lesson if owned by user", async () => {
    (repository.findLessonById as Mock).mockResolvedValue({
      id: "1",
      userId: "user-1",
      title: "Test",
    });

    const result = await getLessonById("1", "user-1");

    expect(result?.title).toBe("Test");
  });

  it("throws if lesson not found", async () => {
    (repository.findLessonById as Mock).mockResolvedValue(null);

    await expect(getLessonById("1", "user-1")).rejects.toThrow(
      "Lesson not found",
    );
  });

  it("throws if lesson belongs to another user", async () => {
    (repository.findLessonById as Mock).mockResolvedValue({
      id: "1",
      userId: "other-user",
    });

    await expect(getLessonById("1", "user-1")).rejects.toThrow(
      "Lesson not found",
    );
  });
});
