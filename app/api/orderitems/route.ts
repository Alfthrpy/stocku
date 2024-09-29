import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import { NextResponse } from "next/server";
import { z } from "zod";


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderId, productId, quantity } = body;

    const newOrderItem = await prisma.orderItem.create({
      data: {
        orderId,
        productId,
        quantity,
      },
    });

    return NextResponse.json(newOrderItem, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors.map((err) => ({
        field: err.path[0],
        message: err.message,
      }));

      return NextResponse.json({ errors: formattedErrors }, { status: 400 });
    }

    return NextResponse.json({ error: 'Internal server error', ror: error }, { status: 500 });
  }
}

// GET: Mendapatkan semua data dari tabel OrderItem
export async function GET() {
  try {
    const data = await prisma.orderItem.findMany();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch order items", error: error });
  }
}
