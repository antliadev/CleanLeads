import { Controller, Get, Body, Post, UseGuards, Param } from '@nestjs/common';
import { FollowUpsService } from './services/follow-ups.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('follow-ups')
@UseGuards(JwtAuthGuard)
export class FollowUpsController {
  constructor(private readonly followUpsService: FollowUpsService) {}

  @Get('tasks')
  async getTasks() {
    return this.followUpsService.getPendingTasks();
  }

  @Get('stats')
  async getStats() {
    return this.followUpsService.getStats();
  }

  @Post(':leadId/history')
  async createHistory(@Param('leadId') leadId: string, @Body() data: any) {
    return this.followUpsService.createHistory(leadId, data);
  }
}
