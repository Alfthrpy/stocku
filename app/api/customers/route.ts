import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { NextResponse } from "next/server";
import { customerSchema } from "@/app/lib/definition";
import { z } from "zod";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {name,contact} = customerSchema.parse(body)
    
        const newStore = await prisma.customer.create({
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
        const data = await prisma.customer.findMany()
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({message : "Failed to fetch customers",error: error})
    }
}