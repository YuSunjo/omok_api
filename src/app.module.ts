import {Module} from '@nestjs/common';
import {MemberModule} from './member/member.module';
import {PingModule} from './ping/ping.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeormConfig} from "../configs/typeorm.config";
import {AuthModule} from './auth/auth.module';
import {HttpExceptionFilter} from "../exception/http.exception.filter";
import { EventModule } from './event/event.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeormConfig),
        MemberModule,
        PingModule,
        AuthModule,
        EventModule,
        MongooseModule.forRoot("mongodb+srv://tnswh2023:1234@blog-mongo.tjhpryp.mongodb.net/blog_mongo")
    ],
    providers: [{
        provide: 'APP_FILTER',
        useClass: HttpExceptionFilter
    }],
})
export class AppModule {
}
