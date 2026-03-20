import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const [researchCount, caseCount, intentCount, applicationCount, toolUsage] = await Promise.all([
      db.researchRecord.count(),
      db.serviceCase.count(),
      db.researchRecord.count({ where: { hasIntent: true } }),
      db.rightsApplication.count(),
      db.toolUsage.groupBy({ by: ["tool"], _count: { tool: true }, orderBy: { _count: { tool: "desc" } } }),
    ]);
    return NextResponse.json({ researchCount, caseCount, intentCount, applicationCount, toolUsage });
  } catch {
    return NextResponse.json({ error: "服务器错误" }, { status: 500 });
  }
}
