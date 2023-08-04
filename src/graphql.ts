
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class SignInDTO {
    username: string;
    password: string;
}

export class SignupDTO {
    username: string;
    password: string;
}

export class CreateCategoryDTO {
    name: string;
}

export class UpdateCategoryDTO {
    name: string;
}

export class PageDTO {
    limit: number;
    page: number;
}

export class CreateProductDTO {
    name: string;
    quantity: number;
    description: string;
    categoryId: string;
    image: Upload;
}

export class UpdateProductDTO {
    name?: Nullable<string>;
    quantity?: Nullable<number>;
    description?: Nullable<string>;
    categoryId?: Nullable<string>;
    image?: Nullable<Upload>;
}

export class PageInfo {
    totalCount: number;
    currentPage: number;
}

export abstract class IMutation {
    abstract signin(dto: SignInDTO): string | Promise<string>;

    abstract signup(dto: SignupDTO): string | Promise<string>;

    abstract createCategory(dto: CreateCategoryDTO): Category | Promise<Category>;

    abstract updateCategory(id: string, dto: UpdateCategoryDTO): Category | Promise<Category>;

    abstract deleteCategory(id: string): string | Promise<string>;

    abstract createProduct(dto: CreateProductDTO): Product | Promise<Product>;

    abstract updateProduct(id: string, dto: UpdateProductDTO): Product | Promise<Product>;

    abstract deleteProduct(id: string): string | Promise<string>;
}

export class Category {
    id: string;
    name: string;
    products: Product[];
}

export abstract class IQuery {
    abstract getCategories(dto?: Nullable<PageDTO>): Nullable<CategoriesResponse> | Promise<Nullable<CategoriesResponse>>;

    abstract getAllCategories(): Nullable<Category[]> | Promise<Nullable<Category[]>>;

    abstract getProductById(id: string): Product | Promise<Product>;

    abstract getProducts(dto: PageDTO): ProductsResponse | Promise<ProductsResponse>;
}

export class CategoriesResponse {
    data?: Nullable<Nullable<Category>[]>;
    pageInfo?: Nullable<PageInfo>;
}

export class Product {
    id: string;
    name: string;
    quantity: number;
    description: string;
    image: string;
    category: Category;
}

export class ProductsResponse {
    data?: Nullable<Nullable<Product>[]>;
    pageInfo?: Nullable<PageInfo>;
}

export type Upload = any;
type Nullable<T> = T | null;
