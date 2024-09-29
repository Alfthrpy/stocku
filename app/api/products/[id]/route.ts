
import { productSchema } from "@/app/lib/definition";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { NextResponse } from "next/server";


export async function PUT(req : Request,{params} : {params : {id : string}}){
    const id = params.id
    const body = await req.body
    const {name,price,quantityInStock,storeId,categoryId} = productSchema.parse(body)
    try {

        const updatedProduct = await prisma.product.update({
            where : {
                id : id
            },
            data : {
                name,
                price,
                quantityInStock,
                storeId,
                categoryId
            }
        })

        return NextResponse.json(updatedProduct, { status:201})

    } catch (error) {
        return NextResponse.json({message:"failed to update product",error:error})
    }
}

export async function DELETE(req : Request, {params} : {params : {id : string}}) {
    const id = params.id
    console.log(id)
    try {
        const response = await prisma.product.delete({
            where: {
                id
            },
        });

        return NextResponse.json(response, { status: 200 }); 
    } catch (error) {
        return NextResponse.json({ message: "Failed to delete", error ,id}); 
    }
}