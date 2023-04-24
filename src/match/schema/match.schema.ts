import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type MatchDocument = Match & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Match {
  @Prop({
    type: mongoose.Schema.Types.Array,
  })
  queue_list = [];
}

// 위의 작성한 클래스를 바탕으로 Mongoose에서 사용하는 스키마 클래스를 만들어준다.
export const MatchSchema = SchemaFactory.createForClass(Match);
