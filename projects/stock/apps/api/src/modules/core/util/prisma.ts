import { PrismaClient } from '@prisma/client';

export const prisma: PrismaClient = new PrismaClient({});

export const getPrismaClient = (): PrismaClient => prisma;
