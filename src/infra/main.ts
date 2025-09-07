import { CreateClientSessionUseCase } from "@/domain/delivery/application/useCases/session/createClientSession"
import { PrismaService } from "./database/prisma/prisma.service"
import { CreateAccountController } from "./http/controllers/createClientAccount.controller"
import { ZodValidationMiddleware } from "./middlewares/zodValidation.middleware"
import { Router, type Request, type Response } from "express"
import z from "zod"

const express = require('express')
const app = express()
const port = 3000
const router = Router()

app.get('/', (req, res) => {
  res.send('Hello World!')
})


async function start() {
  await PrismaService.onModuleInit();
}

start();

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`)
})

const createClientAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  phone: z.string(),
  address: z.string(),
});

// app.use('/client/register', new CreateAccountController(router));
  app.post('/client/register', 
    new ZodValidationMiddleware(createClientAccountBodySchema),
    async (req: Request, res: Response) => {
      return res.status(201).json({
        message: "Usuário criado com sucesso",
        user: req.body, // já validado
      })
  })

async function shutdown() {
  await PrismaService.onModuleDestroy();
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('beforeExit', shutdown);