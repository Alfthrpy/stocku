import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { NextResponse } from "next/server";
import { supplierSchema } from "@/app/lib/definition";
import { z } from "zod";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {name,contact} = supplierSchema.parse(body)
    
        const newStore = await prisma.supplier.create({
            data:{
                name,
                contact
            }
        })
    
        return NextResponse.json(newStore,{status:201})
        
    } catch (error) {
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


export async function GET(){
    try {
        const data = await prisma.supplier.findMany()
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({message : "Failed to fetch suppliers",error: error})
    }
}