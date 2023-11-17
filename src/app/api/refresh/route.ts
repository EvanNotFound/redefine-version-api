import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const npmVersion = await fetchNPMVersion();

    const [staticfileCDNResult, bootCDNResult] = await Promise.all([
      testCDN("https://cdn.staticfile.org/hexo-theme-redefine", npmVersion),
      testCDN(
        "https://cdn.bootcdn.net/ajax/libs/hexo-theme-redefine",
        npmVersion,
      ),
    ]);

    await Promise.all([
      kv.set("npmVersion", npmVersion),
      kv.set("staticfileCDN", staticfileCDNResult),
      kv.set("bootCDN", bootCDNResult),
    ]);

    return NextResponse.json({
      npmVersion,
      staticfileCDN: staticfileCDNResult,
      bootCDN: bootCDNResult,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

const fetchNPMVersion = async () => {
  const response = await fetch(
    "https://registry.npmjs.org/hexo-theme-redefine",
  );
  const data = await response.json();
  return data["dist-tags"].latest;
};

const testCDN = async (baseUrl: string, version: string) => {
  const url = `${baseUrl}/${version}/js/main.js`;
  const response = await fetch(url, { method: "HEAD" });
  return response.ok;
};

export async function GET(req: NextRequest) {
  return new NextResponse(JSON.stringify({ message: "Method Not Allowed" }), {
    status: 405,
  });
}
