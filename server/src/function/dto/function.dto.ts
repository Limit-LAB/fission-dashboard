import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FunctionDto {
  @ApiProperty({
    description: 'The name of the function',
    example: 'hello',
  })
  name: string;

  @ApiProperty({
    description: 'The runtime environment of the function',
    example: 'nodejs',
  })
  env: string;

  @ApiProperty({
    description: 'The package of the function',
    example: 'express-sda',
  })
  pkg: string;

  @ApiPropertyOptional({
    description: 'The entrypoint of the function',
  })
  entry?: string;
}
