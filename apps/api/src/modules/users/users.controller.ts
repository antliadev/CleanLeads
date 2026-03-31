import { Controller, Get, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getProfile(@Request() req: any) {
    const user = await this.usersService.findById(req.user.userId);
    // Remover senha por segurança antes de retornar
    if (user) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  @Patch('settings')
  async updateSettings(@Request() req: any, @Body() settingsDto: any) {
    return this.usersService.updateSettings(req.user.userId, {
      sendgridApiKey: settingsDto.sendgridApiKey,
      linkedinConnected: settingsDto.linkedinConnected,
      linkedinAccessToken: settingsDto.linkedinAccessToken,
    });
  }
}
