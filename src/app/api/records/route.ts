import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import { Record } from "../../../models/Record";

// ✅ GET: Fetch all records
export async function GET() {
  try {
    await connectDB();
    const records = await Record.find();
    return NextResponse.json(records, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error}, { status: 500 });
  }
}

// ✅ PUT: Update a record
export async function PUT(req: Request) {
  try {
    await connectDB();
    const updatedRecord = await req.json();
    
    const record = await Record.findByIdAndUpdate(updatedRecord._id, updatedRecord, { new: true });
    if (!record) return NextResponse.json({ error: "Record not found" }, { status: 404 });

    return NextResponse.json({ message: "Record updated successfully", record }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error}, { status: 500 });
  }
}
