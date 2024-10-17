import { getColors } from "@/lib/db/queries";
import { NextResponse } from "next/server";

export async function GET() {
  const colors = await getColors();

  return NextResponse.json(colors);
}
