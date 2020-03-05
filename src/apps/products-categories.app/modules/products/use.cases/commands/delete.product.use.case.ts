import { Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ProductRepository, IProductRepository } from '../../repositories';
import { UseCase } from '@shared.core';

export class DeleteProductUseCase extends UseCase<string, boolean> {
    
    constructor(@Inject(ProductRepository) private readonly productRepository: IProductRepository) {
        super();
    }

    async buildUseCase(input?: string): Promise<boolean> {

        const result = await this.productRepository.deleteById(input);
        if (!result)
            throw new HttpException('Cannot delete product', HttpStatus.BAD_REQUEST);
            
        return true;
    }

}