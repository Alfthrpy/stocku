import { supplierSchema } from "@/app/lib/definition";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { NextResponse } from "next/server";

export async function DELETE(req: Request, {params} : {params : {id : string}}){
    const id =params.id;
    try {
        await prisma.supplier.delete({
            where: {id}
        })

        return NextResponse.json({message:"Delete Success!",status: 200})
    } catch (error) {
        return NextResponse.json({message:"failed to delete supplier",error: error})
    }
}

export async function PUT(req: Request, {params} : {params : {id : string}}){
    const id =params.id;
    const body = await req.json()
    const data =supplierSchema.parse(body)
    try {
        await prisma.supplier.update({
            where: {id},
            data
        })

        return NextResponse.json({message:"Update Success!",status: 200})
    } catch (error) {
        return NextResponse.json({message:"failed to update supplier",error: error})
    }
}