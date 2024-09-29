import { userSchema } from "@/app/lib/definition";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { NextResponse } from "next/server";


export async function DELETE(req: Request, {params} : {params : {id:string}}){
    const id = params.id

    try {
        const response =await prisma.user.delete({
            where : {id},
        })

        return NextResponse.json(response, {status: 200})
    } catch (error) {
        return NextResponse.json({message:"failed to delete user"})
    }
}

export async function PUT(req: Request, {params} : {params : {id:string}}){
    const id = params.id
    try {
        const body = await req.json()
        const data = userSchema.parse(body)
        const response = await prisma.user.update({
            where : {id},
            
            data
        })
        return NextResponse.json(response, {status: 200})
    } catch (error) {
        return NextResponse.json({message:"Failed to update Data",error: error})
    }
}