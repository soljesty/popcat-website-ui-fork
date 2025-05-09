import { NextResponse } from "next/server";
import dbConnect from "@lib/mongoose";
import TokenInfo from "@models/TokenInfo";

// Get all users
export async function GET() {
  await dbConnect();

  const tokenInfos = await TokenInfo.find({}).sort({ count: -1 });

  return NextResponse.json(tokenInfos);
}

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();
  const { code, country, count } = body;

  try {
    let tokenInfo = await TokenInfo.findOne({ code });

    if (!tokenInfo) {
      tokenInfo = new TokenInfo({ code, country, count });
      await tokenInfo.save();
      console.log("New token info created:", tokenInfo);
    } else {
      tokenInfo.country = country;
      tokenInfo.count += 1;
      await tokenInfo.save();
      console.log("Token info updated:", tokenInfo);
    }

    return NextResponse.json(tokenInfo);
  } catch (error) {
    console.error("Error handling token info:", error);
    return NextResponse.json(
      { error: "Error handling token info" },
      { status: 500 }
    );
  }
}

// Update a user
export async function PUT(request: Request) {
  await dbConnect();
  const body = await request.json();
  console.log("body", body);
  const { id, ...updateData } = body;
  const updatedTokenInfo = await TokenInfo.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return NextResponse.json(updatedTokenInfo);
}

// Delete a user
export async function DELETE(request: Request) {
  await dbConnect();
  const body = await request.json();
  const { id } = body;
  await TokenInfo.findByIdAndDelete(id);
  return NextResponse.json({ message: "Tokeninfo deleted successfully" });
}
