import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "未授权" }, { status: 401 });

  const body = await req.json();
  const { area, subject, type, contact, date, issues, notes, hasIntent } = body;

  if (!area || !subject || !type || !date || !issues) {
    return NextResponse.json({ error: "缺少必填字段" }, { status: 400 });
  }

  const record = await db.researchRecord.create({
    data: { area, subject, type, contact: contact || null, date: new Date(date), issues, notes: notes || null, hasIntent: !!hasIntent },
  });
  return NextResponse.json(record, { status: 201 });
}
