import { Module } from "@nestjs/common";
import { DoctorInformationModule } from "./doctor-information/doctor-information.module";
import { PrismaModule } from "./prisma-service/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { CacheModule } from "@nestjs/cache-manager";
import { redisStore } from "cache-manager-redis-yet";
import { AuthModule } from './auth/auth.module';
import { PrismaService } from "./prisma-service/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { HealthServiceTypeModule } from './health-service-type/health-service-type.module';

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
    HealthServiceTypeModule,
  ],
  controllers: [],
  providers: [PrismaService, JwtService],
})
export class AppModule {}
