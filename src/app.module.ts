import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './apps/main/auth/auth.module';
import { BedsModule } from './apps/main/beds/beds.module';
import { RolesModule } from './apps/main/roles/roles.module';
import { TitlesModule } from './apps/main/titles/titles.module';
import { User } from './apps/main/users/entities/user.entity';
import { UsersModule } from './apps/main/users/users.module';
import { WardsModule } from './apps/main/wards/wards.module';
import { SnacksModule } from './apps/secondary/snacks/snacks.module';
import { TokenGuard } from './guards/token/token.guard';
import { DatabaseEnums } from './resources/enums/database.enum';
import { AjvModule } from './services/global/ajv/ajv.module';
import { TokenModule } from './services/global/token/token.module';
import { CryptoJsModule } from './services/individual/crypto/crypto-js.module';
import { mainDatabaseConfig } from './services/individual/databases/main-database/main-database.config';
import { MainDatabaseModule } from './services/individual/databases/main-database/main-database.module';
import { secondaryDatabaseConfig } from './services/individual/databases/secondary-database/secondary-database.config';
import { SecondaryDatabaseModule } from './services/individual/databases/secondary-database/secondary-database.module';

declare global {
  namespace Express {
    interface Request {
      user: User | null;
    }
  }
}

@Module({
  imports: [
    // TypeOrmModule
    TypeOrmModule.forRoot(mainDatabaseConfig),
    TypeOrmModule.forRootAsync({
      name: DatabaseEnums.SECONDARY,
      useFactory: () => secondaryDatabaseConfig,
    }),

    // App Modules
    AjvModule,
    AuthModule,
    BedsModule,
    CryptoJsModule,
    MainDatabaseModule,
    RolesModule,
    SecondaryDatabaseModule,
    SnacksModule,
    TitlesModule,
    TokenModule,
    UsersModule,
    WardsModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: TokenGuard }],
})
export class AppModule {}
