import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { FunctionService } from './function.service';
import { CreateFunctionDto } from './dto/create-function.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FunctionDto } from './dto/function.dto';

@ApiTags('function')
@Controller('function')
export class FunctionController {
  constructor(private readonly functionService: FunctionService) {}

  @ApiResponse({
    status: 201,
    description: 'The function has been successfully created.',
  })
  @Post()
  async create(@Body() createFunctionDto: CreateFunctionDto) {
    return await this.functionService.create(createFunctionDto);
  }

  @ApiResponse({
    status: 200,
    description: 'The list of all functions.',
    type: [FunctionDto],
  })
  @Get()
  findAll() {
    return this.functionService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'The function with the specified name.',
    type: FunctionDto,
  })
  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.functionService.findOne(name);
  }

  @ApiResponse({
    status: 200,
    description: 'The function has been successfully removed.',
  })
  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.functionService.remove(name);
  }
}
