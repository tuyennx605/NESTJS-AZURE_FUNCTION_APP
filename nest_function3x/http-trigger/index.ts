import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import * as express from 'express';
import { AppModule } from "src/app.module";
import * as azureFunctionExpress from 'azure-function-express';

// Tạo ứng dụng Express
const server = express();

// Tạo ứng dụng NestJS với Express Adapter
const createNestServer = async () => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  await app.init();
};
createNestServer();

// Export handler cho Azure Function
const handler: AzureFunction = azureFunctionExpress.createHandler(server);

export default handler;