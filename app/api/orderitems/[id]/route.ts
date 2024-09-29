
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { NextResponse } from "next/server";

export async function DELETE(req: Request, {params} : {params : {id : string}}){
    const id =params.id;
    try {
        await prisma.orderItem.delete({
            where: {id}
        })

        return NextResponse.json({message:"Delete Success!",status: 200})
    } catch (error) {
        return NextResponse.json({message:"failed to delete orderItem",error: error})
    }
}

export async function PUT(req: Request, {params} : {params : {id : string}}){
    const id =params.id;
    const body = await req.json()
    const data =body
    try {
        await prisma.orderItem.update({
            where: {id},
            data
        })

        return NextResponse.json({message:"Update Success!",status: 200})
    } catch (error) {
        return NextResponse.json({message:"failed to update orderItem",error: error})
    }
}