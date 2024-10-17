import { getMainCategories } from "@/lib/db/queries";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = await getMainCategories();

  return NextResponse.json(categories);
}
