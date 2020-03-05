import { UseCase } from '@shared.core';
import { ProductEntity, CreatingProductDto, CreatingProductParam } from '@models';
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { 
    ProductRepository, 
    IProductRepository, 
   } from '../../repositories';
   
import { MessageConstant } from '@shared.all/constants';
import { ProductDomain } from '../../models/domains/product.domain';
import { ClientSuppliersRepository, IClientSuppliersRepository } from '@libs/repositories';
import { CategoryRepository, ICategoryRepository } from '../../../categories/repositories';

@Injectable()
export class CreateProductUseCase extends UseCase<CreatingProductParam, ProductEntity> {

    constructor(@Inject(ProductRepository) private readonly productRepository: IProductRepository,
                @Inject(CategoryRepository) private readonly categoryRepository: ICategoryRepository,
                @Inject(ClientSuppliersRepository) private readonly supplierRepository: IClientSuppliersRepository) {
        super();
    }

    async buildUseCase(input?: CreatingProductParam): Promise<ProductEntity> {

        const {user, dto} = input;

        if (this.isMissingFields(dto))
            throw new HttpException(MessageConstant.MISSING_FIELDS, HttpStatus.BAD_REQUEST);
        
        const categoryEntities = await this.categoryRepository.findCategoriesWithGroupID(dto.categoriesId);
        const supplier = await this.supplierRepository.getById(user.companyId);
       
        const productDomain = new ProductDomain();
        productDomain.generateProduct(dto, categoryEntities, supplier);
        const result = await this.productRepository.create(productDomain.getEntity());
        return result;
    }

    private isMissingFields(input: CreatingProductDto): boolean {
        return !input
                || !input.name
                || input.categoriesId.length === 0
                || input.numberOfPackage < 0
                || !input.packing;
    }

  
}