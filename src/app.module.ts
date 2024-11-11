import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BedsModule } from './apps/main/beds/beds.module';
import { RolesModule } from './apps/main/roles/roles.module';
import { TitlesModule } from './apps/main/titles/titles.module';
import { UsersModule } from './apps/main/users/users.module';
import { WardsModule } from './apps/main/wards/wards.module';
import { SnacksModule } from './apps/secondary/snacks/snacks.module';
import { DatabaseEnums } from './resources/enums/database.enum';
import { mainDatabaseConfig } from './services/individual/databases/main-database/main-database.config';
import { MainDatabaseModule } from './services/individual/databases/main-database/main-database.module';
import { secondaryDatabaseConfig } from './services/individual/databases/secondary-database/secondary-database.config';
import { SecondaryDatabaseModule } from './services/individual/databases/secondary-database/secondary-database.module';
import { AjvModule } from './services/global/ajv/ajv.module';

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
    BedsModule,
    MainDatabaseModule,
    RolesModule,
    SecondaryDatabaseModule,
    SnacksModule,
    TitlesModule,
    UsersModule,
    WardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
