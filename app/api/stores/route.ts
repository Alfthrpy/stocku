import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { NextResponse } from "next/server";
// import { z } from "zod";

export async function POST(req: Request) {
    const body = await req.json();
    const {name,managerId} = body

    const newStore = await prisma.store.create({
        data:{
            name,
            managerId
        }
    })

    return NextResponse.json(newStore,{status:201})
}


export async function GET(){
    try {
        const data = await prisma.store.findMany({
            include: {
                manager:true,
                products:true,
                employees:true,
                Orders:true,
            }
        })
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({message : "Failed to fetch stores",error: error})
    }
}