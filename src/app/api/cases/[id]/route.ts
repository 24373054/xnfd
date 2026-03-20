import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "未授权" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const updated = await db.serviceCase.update({ where: { id }, data: body });
  return NextResponse.json(updated);
}
