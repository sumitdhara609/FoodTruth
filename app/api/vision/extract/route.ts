import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      message: "Vision provider has not been configured yet.",
    },
    {
      status: 501,
    }
  );
}