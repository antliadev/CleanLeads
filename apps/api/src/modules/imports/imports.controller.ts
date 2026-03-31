import { 
  Controller, 
  Post, 
  UseInterceptors, 
  UploadedFile, 
  UseGuards, 
  Request, 
  Body, 
  Param 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImportsService } from './imports.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('imports')
export class ImportsController {
  constructor(private readonly importsService: ImportsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File, @Request() req) {
    return this.importsService.processUpload(file, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/confirm')
  async confirm(@Param('id') id: string, @Body() mapping: any) {
    return this.importsService.confirmImport(id, mapping);
  }
}
