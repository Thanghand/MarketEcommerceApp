import { Configuration } from '@shared.all/config';

export class ImageUtil {
    
    public static getIdFromUrlImage(link: string): string {
        const result = link.search(Configuration.getConfig().sourceCDN) === -1
                   ? link : link.substr(Configuration.getConfig().sourceCDN.length, link.length).trim();
        return result;
    }
    public static getIdsFromImages(images: string[]): string[] {
        return images.map(i => ImageUtil.getIdFromUrlImage(i));
    }

    public static mergeSourceCDNToId(image: string): string {
        const result = image.search('http') === -1 || image.search('https') === -1
                    ? Configuration.getConfig().sourceCDN.concat(image) : image;
        return result;
    }
}