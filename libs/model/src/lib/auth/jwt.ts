// import { ApiProperty } from '@nestjs/swagger';
// import { IsString, IsEnum, IsNotEmpty } from 'class-validator';

export enum SignInType {
  LINE = 'LINE',
}

export interface SignInReq {
  // @ApiProperty()
  // @IsString()
  // @IsNotEmpty()
  code: string;

  // @ApiProperty()
  // @IsString()
  // @IsNotEmpty()
  state: string;

  // @ApiProperty({
  //   enum: SignInType,
  //   example: SignInType.LINE,
  // })
  // @IsEnum(SignInType)
  // @IsNotEmpty()
  signInType: SignInType;
}

export interface AuthenticationReq {
  // @ApiProperty()
  // @IsString()
  // @IsNotEmpty()
  token: string;
}
