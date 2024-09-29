import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from 'bcryptjs';
import { userSchema } from "@/app/lib/definition";




export async function POST(req: Request) {
  try {
    const body= await req.json();
    const { name,role,email,password} = userSchema.parse(body);
    const hashedPassword = await bcrypt.hash(password,10)

    // Cek apakah email sudah ada
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
    }

    // Simpan pengguna baru ke database
    const newUser = await prisma.user.create({
      data: {
        name,
        role,
        email,
        password:hashedPassword,
      },
    });

    return NextResponse.json(newUser, { status: 201 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors.map(err => ({
        field: err.path[0],
        message: err.message,
      }));

      return NextResponse.json({ errors: formattedErrors }, { status: 400 });
    }

    return NextResponse.json({ error: 'Internal server error', ror:error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const data = await prisma.user.findMany();
    return NextResponse.json(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({
      message: "failed to fetch Data",
      status: error.status,
    });
  }
}
