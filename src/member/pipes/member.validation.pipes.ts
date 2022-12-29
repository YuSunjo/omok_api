import {ArgumentMetadata, PipeTransform} from "@nestjs/common";
import {BusinessException} from "../../../exception/business.exception";

export class MemberValidationPipes implements PipeTransform {
    constructor(private readonly schema: any) {
    }

    transform(value: any, metadata: ArgumentMetadata) {
        console.log(value);
        console.log(metadata);

        return value;
    }
}