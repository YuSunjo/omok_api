import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';

export type MatchDocument = Match & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Match {
  @Prop()
  id: string;

  @Prop()
  userId: number;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;

  constructor(id: string, userId: number) {
    this.id = id;
    this.userId = userId;
  }

  static insertQueue(id, user_id: number) {
    return new Match(id, user_id);
  }
}

// 위의 작성한 클래스를 바탕으로 Mongoose에서 사용하는 스키마 클래스를 만들어준다.
export const MatchSchema = SchemaFactory.createForClass(Match);
