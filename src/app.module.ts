import { Module, ValidationPipe } from '@nestjs/common';
import { MemberModule } from './member/member.module';
import { PingModule } from './ping/ping.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpExceptionFilter } from './exception/http.exception.filter';
import { EventModule } from './event/event.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { JwtStrategy } from './configs/jwt/jwt.strategy';
import { RoomModule } from './room/room.module';
import { MatchModule } from './match/match.module';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { APP_PIPE } from '@nestjs/core';

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
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'omok',
          type: 'topic',
        },
      ],
      uri: 'amqp://localhost:5672',
      connectionInitOptions: { wait: false },
    }),
    MemberModule,
    PingModule,
    EventModule,
    MongooseModule.forRoot('mongodb+srv://tnswh2023:1234@blog-mongo.tjhpryp.mongodb.net/blog_mongo'),
    RoomModule,
    MatchModule,
  ],
  providers: [
    {
      provide: 'APP_FILTER',
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
      }),
    },
    JwtStrategy,
  ],
})
export class AppModule {}
