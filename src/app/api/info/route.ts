import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// DEPRECATED
export async function GET(req: Request, res: Response) {
  const [npmVersion, staticfileCDN, bootCDN] = await Promise.all([
    kv.get("npmVersion"),
    kv.get("staticfileCDN"),
    kv.get("bootCDN"),
  ]);

  return NextResponse.json({
    //legacy
    npmVersion,
    staticfileCDN,
    bootCDN,
  });
}
