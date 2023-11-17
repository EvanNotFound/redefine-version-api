import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  const npmVersion = await kv.get("npmVersion");
  const staticfileCDN = await kv.get("staticfileCDN");
  const bootCDN = await kv.get("bootCDN");

  return NextResponse.json({
    npmVersion,
    staticfileCDN,
    bootCDN,
  });
}
