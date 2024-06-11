import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { PrismaClientExceptionFilter } from "./exceptionFilter/PrismaClientExceptionFilter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>("PORT") || 9005;
  app.useGlobalFilters(new PrismaClientExceptionFilter());
  app.setGlobalPrefix("api");
  await app.listen(port);
}
bootstrap();
