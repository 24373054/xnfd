import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, area, type, description, evidence } = body;

    if (!name || !phone || !area || !type || !description) {
      return NextResponse.json({ error: "缺少必填字段" }, { status: 400 });
    }

    const record = await db.rightsApplication.create({
      data: { name, phone, area, type, description, evidence: evidence || null },
    });

    return NextResponse.json({ id: record.id }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "服务器错误" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const records = await db.rightsApplication.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(records);
  } catch {
    return NextResponse.json({ error: "服务器错误" }, { status: 500 });
  }
}
