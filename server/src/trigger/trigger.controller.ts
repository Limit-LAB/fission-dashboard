import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TriggerService } from './trigger.service';
import { CreateTriggerDto } from './dto/create-trigger.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TriggerDto } from './dto/trigger.dto';

@ApiTags('trigger')
@Controller('trigger')
export class TriggerController {
  constructor(private readonly triggerService: TriggerService) {}

  @ApiResponse({
    status: 201,
    description: 'The trigger has been successfully created.',
  })
  @Post()
  create(@Body() createTriggerDto: CreateTriggerDto) {
    switch (createTriggerDto.type) {
      case 'httptrigger': {
        if (!createTriggerDto.http) {
          throw new Error('httpOption is required for http trigger');
        }
        break;
      }
      case 'timetrigger': {
        if (!createTriggerDto.schedule) {
          throw new Error('Schedule is required for time trigger');
        }
        break;
      }
      case 'messagequeuetrigger': {
        if (!createTriggerDto.mq) {
          throw new Error('Topic is required for message queue trigger');
        }
        break;
      }
    }
    return this.triggerService.create(createTriggerDto);
  }

  @ApiResponse({
    status: 200,
    description: 'The list of all triggers.',
    type: [TriggerDto],
  })
  @Get()
  findAll() {
    return this.triggerService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'The trigger with the specified name.',
    type: TriggerDto,
  })
  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.triggerService.findOne(name);
  }

  @ApiResponse({
    status: 200,
    description: 'The trigger has been successfully removed.',
  })
  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.triggerService.remove(name);
  }
}
