import { Context, HttpRequest } from '@azure/functions';
import { AzureHttpAdapter } from '@nestjs/azure-func-http';
import { createApp } from '../src/main.azure';

function createPsuedoApp(createApp: () => Promise<any>): () => Promise<any> { // tạo ứng dụng giả lập từ ứng dụng gốc
  return async (): Promise<any> => {
    const app = await createApp();
    const psuedoApp = {
      getHttpAdapter: () => {
        return {
          getInstance: () => {
            return (req: any, res: any) => {
              const done = req.context.done;
              req.context.done = (err?: string | Error, result?: any) => {
                res.writeHead();
                done(err, result);
              };
              app.getHttpAdapter().getInstance()(req, res);
            };
          },
        };
      },
    };
    return psuedoApp;
  };
}

export default function (context: Context, req: HttpRequest): void {
  AzureHttpAdapter.handle(createPsuedoApp(createApp), context, req);
}
