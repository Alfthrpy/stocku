import { categorySchema } from "@/app/lib/definition";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { NextResponse } from "next/server";





export async function POST(req : Request){
    const body = await req.json()
    const {name} = categorySchema.parse(body)

    const existingCategory = await prisma.category.findUnique({ where: { name } });
    if (existingCategory) {
      return NextResponse.json({ message: 'Email already in use' }, { status: 400 });
    }
    
    try {
        const newCategory = await prisma.category.create({
            data:{
                name,
            }
        })
    
        return NextResponse.json(newCategory,{status:201})
        
    } catch (error) {
      
        return NextResponse.json({ message: 'Internal server error', error }, { status: 500 });
    }


}

export async function GET(){

    try {
        const data = await prisma.category.findMany()

        return NextResponse.json(data,{status:201})
        
    } catch (error) {
        return NextResponse.json({message : "Failed to fetch category", error: error})
    }

}

