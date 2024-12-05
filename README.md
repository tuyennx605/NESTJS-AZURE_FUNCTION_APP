```

# NESTJS-AZURE_FUNCTION_APP
NESTJS-AZURE_FUNCTION_APP

11111111111111111111111111111111111111111111

npm i @azure/functions@3.5.1 
xxxxxxxxxxxxx  func init . --worker-runtime typescript --model V3
func new --template "Http Trigger" --name http-trigger

npm i @nestjs/platform-express  // làm adapter
npm i azure-function-express

-> sửa trong host.json
"extensions": {
    "http": {
      "routePrefix": ""
    }
  }

-> trong function.json
{
      "authLevel": "anonymous",
      "type": "httpTrigger",
      "direction": "in",
      "name": "req",
      "methods": ["get", "post", "put", "delete", "patch"],
      "route": "{*any}"
    }

-> thêm package.json
"start:azure": "npm run build && func host start"
-> them module de test
nest g res modules/example





222222222222222222222222222222222222222222

xoa reflect-metadata
npm install --save @nestjs/azure-func-http@latest
npm install @azure/functions@1.0.3
npm install @schematics/angular
nest add @nestjs/azure-func-htt

trong main/index
sửa:
// fix Azure Function v4 does not set response headers
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

nest g res modules/example tao module khac

=> deploy


```

