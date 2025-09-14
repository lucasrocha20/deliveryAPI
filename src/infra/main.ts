import express from 'express';
import { PrismaService } from "./database/prisma/prisma.service"
// import { ZodValidationMiddleware } from "./middlewares/zodValidation.middleware"
import { Router, type Request, type Response } from "express"
import { PrismaClientsRepository } from "./database/prisma/repositories/prismaClientsRepository"
import { BcryptHasher } from "./cryptography/bcryptHasher"
import { CreateAccountController } from "./http/controllers/createClientAccount.controller"
import { RegisterClientUseCase } from "@/domain/delivery/application/useCases/client/registerClient"

const app = express()
app.use(express.json());  
const port = 3000
// const router = Router()

// Instantiate dependencies
const prismaService = new PrismaService();
const clientsRepository = new PrismaClientsRepository(prismaService);
const hashGenerator = new BcryptHasher();
const registerClientUseCase = new RegisterClientUseCase(clientsRepository, hashGenerator);

const createAccountController = new CreateAccountController(registerClientUseCase)
// app.use('/create-account/client', CreateAccountController)
app.post('/create-account/client', (req: Request, res: Response) => {
  createAccountController.handle(req, res)
})

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

// const createClientAccountBodySchema = z.object({
//   name: z.string(),
//   email: z.string().email(),
//   password: z.string(),
//   phone: z.string(),
//   address: z.string(),
// });

// app.use('/client/register', new CreateAccountController(router));
  // app.post('/client/register', 
  //   new ZodValidationMiddleware(createClientAccountBodySchema),
  //   async (req: Request, res: Response) => {
  //     return res.status(201).json({
  //       message: "Usuário criado com sucesso",
  //       user: req.body, // já validado
  //     })
  // })

// async function shutdown() {
//   await PrismaService.onModuleDestroy();
//   process.exit(0);
// }

// process.on('SIGINT', shutdown);
// process.on('SIGTERM', shutdown);
// process.on('beforeExit', shutdown);