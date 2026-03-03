import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logger } from "@/server/logger";
import { withRequestLogging } from "@/server/requestLogger";

export async function GET(request: Request) {
  return withRequestLogging(request, async () => {
    try {
      await prisma.$queryRaw`SELECT 1`;

      return NextResponse.json({
        status: "ready",
        database: "connected",
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error("Readiness check failed", {
        message: error instanceof Error ? error.message : "Unknown error",
        name: error instanceof Error ? error.name : "Unknown",
      });

      return NextResponse.json(
        {
          status: "not_ready",
          database: "disconnected",
          timestamp: new Date().toISOString(),
        },
        { status: 503 },
      );
    }
  });
}
