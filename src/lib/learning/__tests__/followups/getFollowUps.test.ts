import { describe, expect, it, Mock, vi } from "vitest";


vi.mock("@/lib/prisma", () => ({
  prisma: {
    followUp: {
      findMany: vi.fn(),
    },
  },
}));

import { prisma } from "@/lib/prisma";
import { getFollowUps } from "@/lib/learning/followups/queries";


describe("getFollowUps", () => {
  it("returns followups for lesson and user", async () => {
    const fake = [{ id: "1", question: "Q", answer: "A" }];

    (prisma.followUp.findMany as Mock).mockResolvedValue(fake);

    const result = await getFollowUps("1", "user-1");

    expect(prisma.followUp.findMany).toHaveBeenCalledWith({
      where: {
        lessonId: "1",
        userId: "user-1",
      },
      orderBy: { createdAt: "asc" },
    });

    expect(result).toEqual(fake);
  });
});