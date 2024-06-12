import { ApiProperty } from "@nestjs/swagger";

export class EnvironmentDto {
    @ApiProperty({
        description: 'The name of the environment',
        example: 'nodejs',
    })
    name: string;
    @ApiProperty({
        description: 'The image of the environment',
        example: 'fission/node-env',
    })
    image: string;
    @ApiProperty({
        description: 'The builder of the environment',
        example: 'fission/node-builder',
    })
    builder: string;   
}
