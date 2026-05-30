import { PAST_SETTLEMENT } from "@/lib/data";

export async function GET() {
  return Response.json([PAST_SETTLEMENT]);
}
