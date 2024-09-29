import { z } from "zod";

export const productSchema = z.object({
    name : z.string(),
    price : z.number(),
    quantityInStock : z.number(),
    storeId : z.string(),
    categoryId : z.string().optional(),
})

export const userSchema = z.object({
    name:z.string().min(3,"Name must be at least 3 characters long"),
    role:z.string().optional(),
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
  });

export const storeSchema = z.object({
    name : z.string().min(3,"Name must be at least 3 characters"),
    managerId: z.string(),
})

export const customerSchema = z.object({
    name : z.string().min(3,"Customer must be at least 3 characters"),
    contact : z.string()
})

export const supplierSchema = z.object({
    name : z.string().min(3,"Supplier must be at least 3"),
    contact : z.string()
})

export const categorySchema = z.object({
    name : z.string().min(3,"Category must be at least 3")
})



