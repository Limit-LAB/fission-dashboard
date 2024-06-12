import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { EnvironmentService } from './environment.service';
import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { EnvironmentDto } from './dto/environment.dto';

@ApiTags('environment')
@Controller('environment')
export class EnvironmentController {
  constructor(private readonly environmentService: EnvironmentService) {}

  @ApiResponse({
    status: 201,
    description: 'The environment has been successfully created.',
  })
  @Post()
  create(@Body() createEnvironmentDto: CreateEnvironmentDto) {
    return this.environmentService.create(createEnvironmentDto);
  }

  @ApiResponse({
    status: 200,
    description: 'The list of all environments.',
    type: [EnvironmentDto],
  })
  @Get()
  findAll() {
    return this.environmentService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'The environment with the specified name.',
    type: EnvironmentDto,
  })
  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.environmentService.findOne(name);
  }

  @ApiResponse({
    status: 200,
    description: 'The environment has been successfully removed.',
  })
  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.environmentService.remove(name);
  }
}
