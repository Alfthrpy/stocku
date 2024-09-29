import { storeSchema } from "@/app/lib/definition";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { NextResponse } from "next/server";

export async function DELETE(req: Request, {params} : {params : {id : string}}){
    const id =params.id;
    try {
        const response = await prisma.store.delete({
            where: {id}
        })

        return NextResponse.json(response,{status: 200})
    } catch (error) {
        return NextResponse.json({message:"failed to delete store",error: error})
    }
}

export async function PUT(req: Request, {params} : {params : {id : string}}){
    const id =params.id;
    const body = await req.json()
    const data = storeSchema.parse(body)
    try {
        const response = await prisma.store.update({
            where: {id},
            data
        })

        return NextResponse.json(response,{status: 200})
    } catch (error) {
        return NextResponse.json({message:"failed to update store",error: error})
    }
}