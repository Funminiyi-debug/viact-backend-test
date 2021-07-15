import {
  Controller,
  Get,
  Header,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from '@nestjs/passport';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getUserInfo(@Req() req) {
    console.log('req', req.user);

    const userId = req.user.sub.split('|')[1];
    const token = req.header('Authorization').split(' ')[1];
    return this.userService.getUserInfo(token);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, cb) => {
          const userId = req.user.sub.split('|')[1];
          return cb(null, `${userId}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadImage(@UploadedFile() file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };

    return response;
  }

  @Get('public/images/:userId')
  async serveAvatar(@Param('userId') userId: string, @Res() res): Promise<any> {
    return res.sendFile(userId, { root: 'files' });
  }
}
