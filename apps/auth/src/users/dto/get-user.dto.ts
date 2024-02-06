import { IsNotEmpty, IsString } from 'class-validator';

export class getuserDto {
  //     readonly
  @IsString()
  @IsNotEmpty()
  _id: string;
}
