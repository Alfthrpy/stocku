import { categorySchema } from "@/app/lib/definition";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { NextResponse } from "next/server";


export async function DELETE(req: Request, {params} : {params : {id:string}}){
    const id = params.id
    try {
        await prisma.category.delete({
            where : {id},
        })

        return NextResponse.json({message:"Delete Success!",status: 200})
    } catch (error) {
        return NextResponse.json({message:"failed to delete category"})
    }
}

export async function PUT(req: Request, {params} : {params : {id:string}}){
    const id = params.id
    try {
        const body = await req.json()
        const data = categorySchema.parse(body)
        const response = await prisma.category.update({
            where : {id},
            
            data
        })
        return NextResponse.json(response, {status: 200})
    } catch (error) {
        return NextResponse.json({message:"Failed to update Data",error: error})
    }
}