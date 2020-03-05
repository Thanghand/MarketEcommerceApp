

import { Injectable, Inject } from '@nestjs/common';
import {
    CompanyType,
    Role,
    SupplierEntity,
    ApplicationEnvironment,
    Unit,
    TokenUserPayload,
    CreatingRestaurantDto,
    CreatingUserDto,
    CreatingSupplierDto,
    RestaurantEntity,
    CreatingUsersDto,
    UserResponse,
    CreatingCategoryDto,
    CategoryDetailResponse,
    ProductEntity,
    CreatingUserParam,
    CreatingProductDto,
    CreatingProductParam
} from '@models';

import { NatsClientService } from '@libs/nats/nats-client.service';
import { ICompanyRepository, CompanyRepository } from '../../../libs/repositories';
import { Configuration } from '@shared.all/config/apps.configuration';
import { MessageEventName } from '@shared.all/constants/messages-event-name';


@Injectable()
export class CreatePreparingDataUseCase {

    constructor(
        private readonly natclientService: NatsClientService,
        @Inject(CompanyRepository) private readonly companyRepository: ICompanyRepository) {
    }

    public async buildData() {
        if (Configuration.getConfig().appEnv === ApplicationEnvironment.Dev
            || Configuration.getConfig().appEnv === ApplicationEnvironment.Staging) {
            this.prepareRestaurantData();
            const supplier = await this.prepareSupplierData();
            this.prepareCategoriesData(supplier);
        }
    }

    async prepareRestaurantData() {

        console.log('Prepraing Rest daadata ne ma may');

        const input: CreatingRestaurantDto = {
            name: 'Pasta Fresca',
            email: 'thang1164113@gmail.com',
            phoneNumber: '0933840682',
            location: {
                address: '123 Phan Xich Long - Phuong 7 - Quan Phu Nhuan',
                lat: 0,
                long: 0
            },
            description: 'This is my company',
        };

        const restaurant = await this.natclientService.sendMessage<RestaurantEntity>(MessageEventName.RESTAURANTS_CREATE, input);

        console.log('Create restaurant: ', restaurant);

        const user: CreatingUserDto = {
            firstName: 'Thang',
            lastName: 'Cao',
            email: 'thangcao.pasta@gmail.com',
            password: '1234',
            phoneNumber: '0933840682',
            role: Role.Director,
            location: {
                address: '77 Tran Ke Xuong - Phuong 7 - Quan Phu Nhuan',
                lat: 0,
                long: 0,
            }
        };



        const dto: CreatingUsersDto = {
            companyTypeTarget: CompanyType.Restaurants,
            companyId: restaurant._id,
            users: [user]
        };

        const param: CreatingUserParam = {
            companyType: CompanyType.Restaurants,
            dto: dto
        };

        const results = await this.natclientService.sendMessage<UserResponse[]>(MessageEventName.AUTH_CREATE_USERS, param);
        console.log('Create user: ', results);

    }

    async prepareSupplierData(): Promise<SupplierEntity> {
        const input: CreatingSupplierDto = {
            name: '3Sach',
            email: 'admin.3sach@gmail.com',
            phoneNumber: '0933840682',
            location: {
                address: '143 Phan Xich Long - Phuong 7 - Quan Phu Nhuan',
                lat: 0,
                long: 0
            },
            description: 'This is my company',
            deliveryOption: {
                shippingFee: 30000,
                minFreeShipping: 100000,
                active: true
            },
            workingDayHour: {
                startTime: 8,
                endTime: 18
            }
        };

        const suppliers = await this.natclientService.sendMessage<SupplierEntity>(MessageEventName.SUPPLIERS_CREATE, input);

        console.log('Create suppliers: ', suppliers);


        const user: CreatingUserDto = {
            firstName: 'Thang',
            lastName: 'Nguyen',
            email: 'thangnguyen.3sach@gmail.com',
            password: '1234',
            phoneNumber: '0933840684',
            role: Role.Director,
            location: {
                address: '123 Phan Dang Luu - Phuong 7 - Quan Phu Nhuan',
                lat: 0,
                long: 0,
            }
        };

        const dto: CreatingUsersDto = {
            companyTypeTarget: CompanyType.Suppliers,
            companyId: suppliers._id,
            users: [user]
        };

        const param: CreatingUserParam = {
            companyType: CompanyType.Suppliers,
            dto: dto
        };

        const results = await this.natclientService.sendMessage<UserResponse[]>(MessageEventName.AUTH_CREATE_USERS, param);
        console.log('Create user: ', results);

        return suppliers;
    }

    async prepareCategoriesData(supplier: SupplierEntity) {
        /*const input: CreatingCategoryDto[] = [{
            name: 'Meat & Seafood',
            description: 'This is Meat & Seafood',
            parentId: 'https://sg-live-01.slatic.net/p/308ed863a4d3d0821aa7c94e05bf354d.jpg',
            image: ''
        }, {
            name: 'Fruit & Vegetables',
            description: 'This is Fruit & Vegetables',
            parentId: null,
            image: 'https://sg-live-01.slatic.net/p/1b2f08dc921e3318fc5d1f335c043fa6.jpg'
        }];

        const categories = input.map(async item => {
            return await this.createCategoryUseCase.execute(item);
        });*/

        const inputFirst: CreatingCategoryDto = {
            name: 'Meat & Seafood',
            description: 'This is Meat & Seafood',
            image: 'https://sg-live-01.slatic.net/p/308ed863a4d3d0821aa7c94e05bf354d.jpg'
        };

        const inputSecond: CreatingCategoryDto = {
            name: 'Fruit & Vegetables',
            description: 'This is Fruit & Vegetables',
            image: 'https://sg-live-01.slatic.net/p/1b2f08dc921e3318fc5d1f335c043fa6.jpg'
        };
        const cate1 = await this.natclientService.sendMessage<CategoryDetailResponse>(MessageEventName.CATEGORY_CREATE, inputFirst);
        const cate2 = await this.natclientService.sendMessage<CategoryDetailResponse>(MessageEventName.CATEGORY_CREATE, inputSecond);

        console.log('Create category: ', cate1._id);
        console.log('Create category: ', cate2._id);

        const product1: CreatingProductDto = {
            name: 'GIVVO Australia Green Kale',
            images: ['https://laz-img-sg.alicdn.com/p/8021a4a0af2dffe9daf0d525cefac355.jpg_340x340q80.jpg_.webp'],
            description: 'Pre-washed and Cut. They have green leaves, in which the central leaves do not form a head.',
            originalPrice: 10000,
            discount: 15,

            categoriesId: [cate2._id.toString()],
            numberOfPackage: 1,
            packing: {
                quantity: 125,
                unit: Unit.gram
            },
            active: true,
        };

        const product2: CreatingProductDto = {
            name: 'RedMart Australian Carrots',
            images: ['https://laz-img-sg.alicdn.com/p/363db621bd33dd86018d91e134784827.jpg_340x340q80.jpg_.webp'],
            description: 'At RedMart, quality of our fresh produce is paramount. For our RedMart label we have collaborated with packers and growers in Australia who share our values to ensure we provide you with great quality product.',
            originalPrice: 10000,
            discount: 15,
            categoriesId: [cate2._id.toString()],
            numberOfPackage: 1,
            packing: {
                quantity: 500,
                unit: Unit.gram,
            },
            active: true,
        };

        const product3: CreatingProductDto = {
            name: 'Kee Song Fresh Farm Whole Chicken',
            images: ['https://laz-img-sg.alicdn.com/p/4c9771102d6dbfd77c428cd982815b6a.jpg_340x340q80.jpg_.webp'],
            description: 'Fresh meat and seafood is delivered daily to RedMart by approved suppliers. We guarantee it will be fit for consumption 2 days after delivery day to you. For the actual expiry date, please refer to the packaging when you receive your products. Our range of fresh meat and sefaood is vacuum sealed for freshness, leak proof for hygiene and convenience, as well as freezer ready since it is fresh and has not been frozen before. A leading poultry producer in Singapore and Malaysia today, Kee Song\'s poultry products are processed locally for optimum freshness. We make it a point to ensure that our consumers receive only the freshest and highest quality products from us that are antibiotics residual free. Premium quality selected chicken which is good with any form of cooking.',
            originalPrice: 10000,
            discount: 15,
            categoriesId: [cate1._id.toString()],
            numberOfPackage: 1,
            packing: {
                quantity: 1.4,
                unit: Unit.kg
            },
            active: true,
        };

        const product4: CreatingProductDto = {
            name: 'Scaled and Gutted',
            images: ['https://laz-img-sg.alicdn.com/p/7a812a89c31de1462285d66ceefd7a85.jpg_340x340q80.jpg_.webp'],
            description: 'Scaled and gutted for your convenience. An affordable option that can be easily found in local eateries, restaurants, hotels, and even banquets. The seabass is a fast-growing fish that can reach 600g in size within a year! Weight indicated is after the fish has been cleaned and gutted.',
            originalPrice: 10000,
            discount: 15,
            categoriesId: [cate1._id.toString()],
            numberOfPackage: 1,
            packing: {
                quantity: 469,
                unit: Unit.gram
            },
            active: true,
        };
        const token: TokenUserPayload = {
            _id: '',
            companyId: supplier._id,
            email: '',
            role: Role.Director,
            companyType: CompanyType.Suppliers,
            userName: '',
        };

        const param1: CreatingProductParam = {
            user: token,
            dto: product1
        };

        const param2: CreatingProductParam = {
            user: token,
            dto: product2
        };

        const param3: CreatingProductParam = {
            user: token,
            dto: product3
        };
        
        const param4: CreatingProductParam = {
            user: token,
            dto: product4
        };

        const pro1 = await this.natclientService.sendMessage<ProductEntity>(MessageEventName.PRODUCTS_CREATE, param1);
        const pro2 = await this.natclientService.sendMessage<ProductEntity>(MessageEventName.PRODUCTS_CREATE, param2);
        const pro3 = await this.natclientService.sendMessage<ProductEntity>(MessageEventName.PRODUCTS_CREATE, param3);
        const pro4 = await this.natclientService.sendMessage<ProductEntity>(MessageEventName.PRODUCTS_CREATE, param4);

        console.log('Create products');
    }
}
