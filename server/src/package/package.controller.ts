import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PackageDto } from './dto/package.dto';

@ApiTags('package')
@Controller('package')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @ApiResponse({
    status: 201,
    description: 'The package has been successfully created.',
  })
  @Post()
  create(@Body() createPackageDto: CreatePackageDto) {
    return this.packageService.create(createPackageDto);
  }

  @ApiResponse({
    status: 200,
    description: 'The list of all packages.',
    type: [PackageDto],
  })
  @Get()
  findAll() {
    return this.packageService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'The package with the specified name.',
    type: PackageDto,
  })
  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.packageService.findOne(name);
  }

  @ApiResponse({
    status: 200,
    description: 'The package has been successfully removed.',
  })
  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.packageService.remove(name);
  }
}
