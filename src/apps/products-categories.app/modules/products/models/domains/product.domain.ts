import { ProductEntity, Brand, ProductSupplier, ProductCatalog, PackingEntity, ReviewEntity, RecordProductChanged, CategoryEntity, SupplierEntity, BaseDomain, CreatingProductDto, UpdatingProductInformationDto } from '@models';
import { ImageUtil } from '@shared.all/utils';

export class ProductDomain extends BaseDomain<ProductEntity> {

    generateProduct(input: CreatingProductDto, categoryEntities: CategoryEntity[], supplier: SupplierEntity): void {
        const productCatalogs: ProductCatalog[] = [];
        input.categoriesId.forEach(id => {
            const category = categoryEntities.find(c => c._id.toString() === id);
            if (category) {
                const productCatalog: ProductCatalog = {
                    _id: category._id,
                    name: category.name,
                    treeCategories: category.treeCategories
                };
                productCatalogs.push(productCatalog);
            }
        });

        const brand: Brand = {
            _id: supplier._id,
            name: supplier.name
        };

        const productSupplier: ProductSupplier = {
            _id: supplier._id,
            name: supplier.name
        };

        const newRecord: RecordProductChanged = {
            name: input.name,
            updatedAt: new Date(),
            originalPrice: input.originalPrice,
            packing: input.packing,
            discount: input.discount,
            numberOfPackage: input.numberOfPackage,
            categories: productCatalogs
        };

        const entity: ProductEntity = {
            name: input.name,
            description: input.description,
            images: input.images ? ImageUtil.getIdsFromImages(input.images) : [],
            originalPrice: input.originalPrice,
            discount: input.discount,
            brand: brand,
            supplier: productSupplier,
            numberOfPackage: input.numberOfPackage,
            packing: input.packing,
            categories: productCatalogs,
            active: input.active,
            transactions: [newRecord]
        };
        this.entity = entity;
    }

    changeImages(images: string[]): void {
        if (!this.entity)
            return;
        this.entity.images = images.map(i => ImageUtil.getIdFromUrlImage(i));
    }

    changeCategories(categoriesId: string[], categoryEntities: CategoryEntity[]): void {
        if (!this.entity)
            return;

        const categories: ProductCatalog[] = [];
        categoriesId.forEach(id => {
            const category = categoryEntities.find(c => c._id.toString() === id);
            const productCatalog: ProductCatalog = {
                _id: category._id,
                name: category.name,
                treeCategories: category.treeCategories
            };
            categories.push(productCatalog);
        });
        this.entity.categories = categories;
        const newRecord: RecordProductChanged = {
            categories: this.entity.categories,
            updatedAt: new Date(),
        };
        this.entity.updatedAt = new Date();
        this.entity.transactions.push(newRecord);
    }

    updateInformation(dto: UpdatingProductInformationDto): void {

        if (dto.images)
            this.changeImages(dto.images);
        const newRecord: RecordProductChanged = {
            updatedAt: new Date()
        };

        if (this.entity.name !== dto.name) {
            this.entity.name = dto.name;
            newRecord.name = this.entity.name;
        }
        if (this.entity.description !== dto.description)
            this.entity.description = dto.description;

        if (this.entity.originalPrice !== dto.originalPrice) {
            this.entity.originalPrice = dto.originalPrice;
            newRecord.originalPrice = dto.originalPrice;
        }

        if (this.entity.numberOfPackage !== dto.numberOfPackage) {
            this.entity.numberOfPackage = dto.numberOfPackage;
            newRecord.numberOfPackage = dto.numberOfPackage;
        }

        if (this.entity.packing.quantity !== dto.packing.quantity 
            || this.entity.packing.unit !== dto.packing.unit) {
            this.entity.packing = dto.packing;
            newRecord.packing = dto.packing;
        }

        if (this.entity.active !== dto.active) {
            this.entity.active = dto.active;
            newRecord.active = dto.active;
        }

        this.entity.updatedAt = new Date();
        this.entity.transactions.push(newRecord);
    }
}