import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TemplateChannel } from '@prisma/client';

@Controller('templates')
@UseGuards(JwtAuthGuard)
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Get()
  async findAll() {
    return this.templatesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.templatesService.findOne(id);
  }

  @Post()
  async create(@Body() data: { name: string; channel: TemplateChannel; templateType: string; subjectTemplate?: string; bodyTemplate: string }) {
    return this.templatesService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.templatesService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.templatesService.remove(id);
  }

  @Post('magic-fix')
  async magicFix(@Body() data: { text: string }) {
    const fixed = await this.templatesService.magicFix(data.text);
    return { fixed };
  }
}
