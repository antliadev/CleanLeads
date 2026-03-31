import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { AutomationService } from './automation.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { InteractionActionType } from '@prisma/client';

@Controller('automation')
export class AutomationController {
  constructor(private readonly automationService: AutomationService) {}

  @UseGuards(JwtAuthGuard)
  @Post('linkedin')
  async scheduleLinkedin(
    @Body('leadId') leadId: string,
    @Body('actionType') actionType: InteractionActionType,
    @Body('templateId') templateId?: string,
    @Body('message') message?: string,
  ) {
    return this.automationService.scheduleLinkedInAction(
      leadId,
      actionType,
      templateId,
      message,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('start-all')
  async startAll() {
    return this.automationService.startGlobalAutomation();
  }

  @UseGuards(JwtAuthGuard)
  @Get('leads/:id/jobs')
  async getJobs(@Param('id') id: string) {
    return this.automationService.getJobsByLead(id);
  }
}
