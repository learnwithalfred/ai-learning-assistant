import { describe, it, expect, vi, type Mock } from "vitest";

vi.mock("@/modules/lessons/lesson.repository", () => ({
  findLessonById: vi.fn(),
  deleteLessonById: vi.fn(),
}));

import * as repository from "@/modules/lessons/lesson.repository";
import { deleteLesson } from "@/modules/lessons/lesson.service";

describe("deleteLesson", () => {
  it("deletes lesson if owned by user", async () => {
    (repository.findLessonById as Mock).mockResolvedValue({
      id: "1",
      userId: "user-123",
    });

    await deleteLesson("1", "user-123");

    expect(repository.deleteLessonById).toHaveBeenCalledWith("1");
  });

  it("throws when lesson not found", async () => {
    (repository.findLessonById as Mock).mockResolvedValue(null);

    await expect(deleteLesson("missing", "user-123")).rejects.toThrow(
      "Lesson not found",
    );
  });

  it("throws when lesson belongs to another user", async () => {
    (repository.findLessonById as Mock).mockResolvedValue({
      id: "1",
      userId: "other-user",
    });

    await expect(deleteLesson("1", "user-123")).rejects.toThrow(
      "Lesson not found",
    );
  });
});
