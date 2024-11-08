import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TitlesModule } from './apps/main/titles/titles.module';
import { UsersModule } from './apps/main/users/users.module';
import { DatabaseEnums } from './resources/enums/database.enum';
import { mainDatabaseConfig } from './services/databases/main-database/main-database.config';
import { MainDatabaseModule } from './services/databases/main-database/main-database.module';
import { secondaryDatabaseConfig } from './services/databases/secondary-database/secondary-database.config';
import { SecondaryDatabaseModule } from './services/databases/secondary-database/secondary-database.module';
import { SnacksModule } from './apps/secondary/snacks/snacks.module';
import { RolesModule } from './apps/main/roles/roles.module';

@Module({
  imports: [
    // TypeOrmModule
    TypeOrmModule.forRoot(mainDatabaseConfig),
    TypeOrmModule.forRootAsync({
      name: DatabaseEnums.SECONDARY,
      useFactory: () => secondaryDatabaseConfig,
    }),

    // App Modules
    MainDatabaseModule,

    UsersModule,

    TitlesModule,

    SecondaryDatabaseModule,

    SnacksModule,

    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
