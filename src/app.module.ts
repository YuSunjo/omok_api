import { Module } from '@nestjs/common';
import { MemberModule } from './member/member.module';
import { PingModule } from './ping/ping.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { HttpExceptionFilter } from './exception/http.exception.filter';
import { EventModule } from './event/event.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { JwtStrategy } from './configs/jwt/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mariadb',
        host: process.env.DB_HOST,
        port: 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [__dirname + '/**/**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: true,
      }),
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    MemberModule,
    PingModule,
    AuthModule,
    EventModule,
    MongooseModule.forRoot('mongodb+srv://tnswh2023:1234@blog-mongo.tjhpryp.mongodb.net/blog_mongo'),
  ],
  providers: [
    {
      provide: 'APP_FILTER',
      useClass: HttpExceptionFilter,
    },
    JwtStrategy,
  ],
})
export class AppModule {}
