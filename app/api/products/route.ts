import { productSchema } from "@/app/lib/definition";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { NextResponse } from "next/server";





export async function POST(req : Request){
    const body = await req.json()
    const {name,price,quantityInStock,storeId} = productSchema.parse(body)
    
    const newProduct = await prisma.product.create({
        data:{
            name,
            price,
            quantityInStock,
            storeId
        }
    })

    return NextResponse.json(newProduct,{status:201})

}

export async function GET(){

    try {
        const data = await prisma.product.findMany({
            include:{
                category:true
            }
        })

        return NextResponse.json(data,{status:201})
        
    } catch (error) {
        return NextResponse.json({message : "Failed to fetch product", error: error})
    }

}

