import { NextRequest, NextResponse } from "next/server";
import { func } from "../../../../test";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  try {
    const data = await func(name);

    return NextResponse.json({ message: "Data retrieved", data });
  } catch (error) {
    console.error("Error processing request:", error);

    return NextResponse.json(
      { error: "Failed to retrieve data", details: error },
      { status: 500 }
    );
  }
}
