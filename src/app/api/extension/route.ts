import { NextResponse } from "next/server";

export async function GET() {
  // Fetch the version from an environment variable
  const latestVersion = process.env.LATEST_EXTENSION_VERSION;

  // Validate that the version is set in the environment
  if (!latestVersion) {
    return NextResponse.json(
      { error: "LATEST_EXTENSION_VERSION is not set in the environment variables." },
      { status: 500 }
    );
  }

  // Return the latest version as a JSON response
  return NextResponse.json({ latestVersion });
}
