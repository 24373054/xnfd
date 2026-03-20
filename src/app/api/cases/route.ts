import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "未授权" }, { status: 401 });
  const { title, type, area, description, result, isPublic } = await req.json();
  if (!title || !type || !area || !description) return NextResponse.json({ error: "缺少必填字段" }, { status: 400 });
  const c = await db.serviceCase.create({ data: { title, type, area, description, result: result || null, isPublic: !!isPublic } });
  return NextResponse.json(c, { status: 201 });
}
