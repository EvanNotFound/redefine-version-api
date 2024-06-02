import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request, res: Response) {
  const [
    npmVersion,
    staticfileCDN,
    bootCDN,
    zstaticsCDN,
    sustechCDN,
    cdnjsCDN,
  ] = await Promise.all([
    kv.get("npmVersion"),
    kv.get("staticfileCDN"),
    kv.get("bootCDN"),
    kv.get("zstaticsCDN"),
    kv.get("sustechCDN"),
    kv.get("cdnjsCDN"),
  ]);

  return NextResponse.json({
    status: "success",
    data: {
      npmVersion,
      staticfileCDN,
      bootCDN,
      zstaticsCDN,
      sustechCDN,
      cdnjsCDN,
    },
    message: "Successfully fetched redefine version info.",
  });
}
