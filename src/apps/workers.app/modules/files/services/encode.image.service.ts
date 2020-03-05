import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as jimp from 'jimp';
import Jimp = require('jimp');

@Injectable()
export class EncodeImageService {

    public async makeEncodeBase64(filename: string, note: string) {
        const base64 = await this.encodeImageToBase64(filename);
        this.writeFIle(note, base64);
    }

    private async encodeImageToBase64(fileName: string): Promise<string> {
        // const bitmap = fs.readFileSync();
        // convert binary data to base64 encoded string

        const image = await jimp.read(`./uploads/${fileName}`);
        const base64 = await image.contain(50, 50).background(0xFFFFFFFF)
                        .getBase64Async(Jimp.MIME_JPEG);
                           
        return base64;
    }

    private writeFIle(filename: string, data: any) {
        fs.writeFile(`./logos-base64/${filename}`, data, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log('The file was saved!');
        });
    }
}