import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, {Document} from 'mongoose';
import {v4 as uuidv4} from 'uuid';

export type RoomDocument = Room & Document;

@Schema({timestamps: {createdAt: "createdAt", updatedAt: "updatedAt"}})
export class Room {

    @Prop({
        default: uuidv4(),
        required: true
    })
    roomId: string

    @Prop({
        type: mongoose.Schema.Types.Array
    })
    board

}

// 위의 작성한 클래스를 바탕으로 Mongoose에서 사용하는 스키마 클래스를 만들어준다.
export const RoomSchema = SchemaFactory.createForClass(Room);