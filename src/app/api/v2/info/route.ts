import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request, res: Response) {
  const [
    npmVersion,
    staticfileCDN,
    bootCDN,
    zstaticCDN,
    sustechCDN,
    cdnjsCDN,
    npmMirrorCDN,
  ] = await Promise.all([
    kv.get("npmVersion"),
    kv.get("staticfileCDN"),
    kv.get("bootCDN"),
    kv.get("zstaticCDN"),
    kv.get("sustechCDN"),
    kv.get("cdnjsCDN"),
    kv.get("npmMirrorCDN"),
  ]);

  return NextResponse.json({
    status: "success",
    data: {
      npmVersion,
      staticfileCDN,
      bootCDN,
      zstaticCDN,
      sustechCDN,
      cdnjsCDN,
      npmMirrorCDN,
    },
    message: "Successfully fetched redefine version info.",
  });
}
