import { NextResponse } from "next/server";
import { matchUserQuery } from "@/lib/nlp";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query, threshold } = body;

    if (typeof query !== "string") {
      return NextResponse.json(
        { error: "Query string is required" },
        { status: 400 }
      );
    }

    const matchResult = matchUserQuery(query, threshold);
    return NextResponse.json(matchResult);
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal processing error occurred" },
      { status: 500 }
    );
  }
}
