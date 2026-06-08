import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { type NextRequest, NextResponse } from "next/server";

import { revalidateModuleContent } from "@/lib/sanity/revalidate-content";

type RevalidatePayload = {
  _type?: string;
  slug?: string | null;
};

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json(
      { message: "Missing SANITY_REVALIDATE_SECRET" },
      { status: 500 },
    );
  }

  try {
    const signature = request.headers.get(SIGNATURE_HEADER_NAME);
    const body = await request.text();

    if (!signature || !(await isValidSignature(body, signature, secret))) {
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 401 },
      );
    }

    const payload = JSON.parse(body) as RevalidatePayload;

    if (payload._type !== "module") {
      return NextResponse.json({ revalidated: false, message: "Ignored type" });
    }

    const paths = revalidateModuleContent(payload);

    return NextResponse.json({
      revalidated: true,
      paths,
      now: Date.now(),
    });
  } catch (error) {
    console.error("Sanity revalidation failed:", error);
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 },
    );
  }
}
