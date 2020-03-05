import { Post, UseInterceptors, UploadedFile, Param, Get, Res, Controller } from '@nestjs/common';
import { ApiConsumes, ApiImplicitFile, ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ResponseBuilder, BodyResponse, TokenUserPayload } from '@models';
import { CurrentUser } from '@shared.all/decorators/user.decorator';
import { Configuration } from '@shared.all/config';

@ApiUseTags('images')
@Controller('manager/images')
export class FileSourceManagerController {
    
    constructor() {}

    @ApiConsumes('multipart/form-data')
    @ApiImplicitFile({ name: 'file', required: true, description: 'Infographic file' })
    @ApiResponse({
      status: 201,
      description: 'Upload image successfully'
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @UseInterceptors(FileInterceptor('file', 
    {
      storage: diskStorage({
        destination: './uploads', 
        filename: (req: any, file: any, cb: any) => {
            console.log('File: ', file);
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
            return cb(null, `${randomName}-${file.originalname}`);
        }
      })
    }))
    @Post()
    async uploadFile(@UploadedFile() file, @CurrentUser() user: TokenUserPayload): Promise<BodyResponse<string>> {
      console.log('File Response', file);
      return new ResponseBuilder<string>()
              .message('Upload image successfully')
              .data(`${Configuration.getConfig().sourceCDN}${file.filename}`)
              .build();
    }

    @ApiOperation({ title: 'Get image category' })
    @ApiResponse({
      status: 201,
      description: 'Get image category successfully'
    })
    @Get(':path')
    getFile(@Param('path') imagePath: string, @Res() res) {
        return res.sendFile( imagePath, {root: 'uploads/'});
    }
}