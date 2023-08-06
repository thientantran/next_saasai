import { PrismaClient } from "@prisma/client";

declare global {
  var prisma:  PrismaClient | undefined
};

const prismadb = globalThis.prisma || new PrismaClient();

// xử dụng vậy để database được đồng bộ và reload lại database, vì đôi khi nhiều người dùng, nên data sẽ bị create lại 

if(process.env.NODE_ENV !== "production") globalThis.prisma = prismadb

export default prismadb