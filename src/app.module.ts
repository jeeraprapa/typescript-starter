import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationModule } from './education/education.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './components/auth/auth.module';
import { CaslModule } from './casl/casl.module';


@Module({
  imports: [
    // เพิ่มไว้สำหรับการอ่าน config ผ่าน .env
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UsersModule,
    EducationModule,
    AuthModule,
    CaslModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
