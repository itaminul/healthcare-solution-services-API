import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { DoctorInformationModule } from "./doctor-information/doctor-information.module";
import { PrismaModule } from "./prisma-service/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { CacheModule } from "@nestjs/cache-manager";
import { redisStore } from "cache-manager-redis-yet";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host: "localhost",
            port: 6379,
          },
        }),
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}` || `.env`,
    }),
    DoctorInformationModule,
    PrismaModule,
    AuthModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
