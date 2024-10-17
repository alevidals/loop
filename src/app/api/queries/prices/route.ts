import { getLowerAndUpperPrices } from "@/lib/db/queries";
import { NextResponse } from "next/server";

export async function GET() {
  const minMaxPrices = await getLowerAndUpperPrices();

  return NextResponse.json(minMaxPrices);
}
