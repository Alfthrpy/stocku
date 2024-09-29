import { customerSchema } from "@/app/lib/definition";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { NextResponse } from "next/server";

export async function DELETE(req: Request, {params} : {params : {id : string}}){
    const id =params.id;
    try {
        await prisma.customer.delete({
            where: {id}
        })

        return NextResponse.json({message:"Delete Success!",status: 200})
    } catch (error) {
        return NextResponse.json({message:"failed to delete customer",error: error})
    }
}

export async function PUT(req: Request, {params} : {params : {id : string}}){
    const id =params.id;
    const body = await req.json()
    const data =customerSchema.parse(body)
    try {
        await prisma.customer.update({
            where: {id},
            data
        })

        return NextResponse.json({message:"Update Success!",status: 200})
    } catch (error) {
        return NextResponse.json({message:"failed to update customer",error: error})
    }
}