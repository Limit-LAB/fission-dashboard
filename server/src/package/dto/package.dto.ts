import { ApiProperty } from '@nestjs/swagger';

export class PackageDto {
  @ApiProperty({
    description: 'The name of the environment',
    example: 'nodejs',
  })
  environment: string;

  @ApiProperty({
    description: 'The name of the package',
    example: 'express',
  })
  name: string;

  @ApiProperty({
    description: 'The URL of the package code (ZIP file)',
    example:
      'https://github.com/Limit-LAB/limit-function/raw/main/server/assets/fission-test.zip',
  })
  codeUrl: string;
}
