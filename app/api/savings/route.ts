import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "../../../lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { amount, note } = await req.json();

  try {
    const newSaving = await prisma.saving.create({
      data: {
        amount: parseFloat(amount),
        note: note || "บันทึกเงินออม",
        user: { connect: { email: session.user.email } }
      },
    });
    return NextResponse.json(newSaving);
  } catch (error) {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}