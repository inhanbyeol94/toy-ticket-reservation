import { IsEmail, IsNotEmpty, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

/**
@IsString() 문자열인지 검증
@IsInt() Int값인지에 대한 검증
@IsBoolean() Boolean값인지에 대한 검증
@IsEmail() 이메일 형식인지에 대한 검증
@IsArray() 배열 값인지에 대한 검증
@IsEnum() Enum값인지에 대한 검증
@IsNumber() 숫자값인지에 대한 검증(소숫점도 검증 가능)
@IsDate() 날짜값인지에 대한 검증
@IsBase64() Base64 값인지에 대한 검증(토큰 처리를 Base64로 했을시 사용)
@IsOptional() 값이 들어오지 않으면 검증을 안해도 된다는 데코레이터
@MaxLength() 최대 길이 제한
@MinLength() 최소 길이 제한
@Length() 길이 제한
@Matches(RegExp('^[가-힣a-zA-Z0-9]*$'), {message : "입력 값을 다시 확인하세요"}) 정규표현식 입력 값을 검증할 떄 사용 
@Min() 최솟값
@Max() 최댓값
@IsNotEmpty() 값이 비어있는지 검증
 */

class CreateMemberDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  @MaxLength(10)
  name: string;

  @IsString()
  @MinLength(8)
  @MaxLength(25)
  password: string;

  @IsString()
  @MinLength(8)
  @MaxLength(25)
  confirmPassword: string;
}

export { CreateMemberDto };
