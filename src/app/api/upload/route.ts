import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import { Record } from "../../../models/Record";

// ✅ POST: Upload CSV records
export async function POST(req: Request) {
  try {
    await connectDB();
    const records = await req.json();
    
    await Record.insertMany(records);

    return NextResponse.json({ message: "File uploaded and records saved!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error}, { status: 500 });
  }
}
