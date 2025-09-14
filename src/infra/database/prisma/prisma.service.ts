import { PrismaClient } from '@prisma/client';

export class PrismaService
  extends PrismaClient
{
  private static instance: PrismaClient

  constructor() {
    super({
      log: ['warn', 'error', 'query'],
    });
  }

 public static getInstance(): PrismaClient {
    if (!PrismaService.instance) {
      PrismaService.instance = new PrismaClient()
    }
    return PrismaService.instance
  }

  public static async onModuleInit() {
    await PrismaService.getInstance().$connect()
    console.log("✅ Prisma conectado (onModuleInit)")
  }

  public static async onModuleDestroy() {
    await PrismaService.getInstance().$disconnect()
    console.log("🔌 Prisma desconectado (onModuleDestroy)")
  }
}
