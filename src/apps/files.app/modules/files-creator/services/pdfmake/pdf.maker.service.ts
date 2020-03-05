import { Injectable } from "@nestjs/common";

@Injectable()
export class PdfMakerService {

  private readonly pdfMake;
  constructor() {
    const pdfmake = require('pdfmake/build/pdfmake');
    const vfsFonts = require('pdfmake/build/vfs_fonts');
    pdfmake.vfs = vfsFonts.pdfMake.vfs;
    this.pdfMake = pdfmake;
  }

  public generatePdfFile(res, dd: any): void {
    const pdfDoc = this.pdfMake.createPdf(dd);
    pdfDoc.getBase64(data => {
      const download = Buffer.from(data.toString('utf-8'), 'base64');
      res.end(download);
    });
  }

  public generateFile(res): void {
    var dd = {
      content: [
        { text: 'Invoice', style: 'header' },
        { text: '3 Sach company', style: ['header', 'anotherStyle'] },
        { text: 'Customer ahihihi Pasta Freshca', style: { fontSize: 15, bold: true, margin: [5, 30, 10, 20] } },
      ],

      styles: {
        header: {
          fontSize: 30,
          bold: true
        },
        anotherStyle: {
          italics: true,
          alignment: 'right'
        }
      }
    };
    const pdfDoc = this.pdfMake.createPdf(dd);
    pdfDoc.getBase64(data => {
      const download = Buffer.from(data, 'binary').toString('base64');
      res.send(download);
    });
  }

}