import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({});

export const getPrismaClient = () => prisma;
