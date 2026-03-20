import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { title, area, address, date, startTime, endTime, description } = body;

  if (!title || !area || !address || !date || !startTime || !endTime) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const event = await db.stationEvent.create({
    data: {
      title,
      area,
      address,
      date: new Date(date),
      startTime,
      endTime,
      description: description || null,
    },
  });

  return NextResponse.json(event, { status: 201 });
}
