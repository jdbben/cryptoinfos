import { Binancedatafetch } from "@/utils/test";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  const interval = searchParams.get("interval");

  if (!interval)
    return NextResponse.json({ error: "interval not found" }, { status: 400 });

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  try {
    const data = await Binancedatafetch(name, interval);

    return NextResponse.json({ message: "Data retrieved", data });
  } catch (error) {
    console.error("Error processing request:", error);

    return NextResponse.json(
      { error: "Failed to retrieve data", details: error },
      { status: 500 }
    );
  }
}
