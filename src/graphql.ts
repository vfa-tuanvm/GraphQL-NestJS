
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class ChangePassDTO {
    oldPass: string;
    newPass: string;
}

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
}

export class UpdateProductDTO {
    name?: Nullable<string>;
    quantity?: Nullable<number>;
    description?: Nullable<string>;
    categoryId?: Nullable<string>;
}

export class PageInfo {
    totalCount: number;
    currentPage: number;
}

export abstract class IMutation {
    abstract changePass(dto?: Nullable<ChangePassDTO>): Nullable<string> | Promise<Nullable<string>>;

    abstract signin(dto: SignInDTO): AuthResponse | Promise<AuthResponse>;

    abstract signup(dto: SignupDTO): string | Promise<string>;

    abstract createCategory(dto: CreateCategoryDTO): Category | Promise<Category>;

    abstract updateCategory(id: string, dto: UpdateCategoryDTO): Category | Promise<Category>;

    abstract deleteCategory(id: string): string | Promise<string>;

    abstract createProduct(dto: CreateProductDTO): Product | Promise<Product>;

    abstract updateProduct(id: string, dto: UpdateProductDTO): Product | Promise<Product>;

    abstract deleteProduct(id: string): string | Promise<string>;
}

export abstract class IQuery {
    abstract refreshToken(): Nullable<AuthResponse> | Promise<Nullable<AuthResponse>>;

    abstract getCategories(dto?: Nullable<PageDTO>): Nullable<CategoriesResponse> | Promise<Nullable<CategoriesResponse>>;

    abstract getAllCategories(): Nullable<Category[]> | Promise<Nullable<Category[]>>;

    abstract getCategoryById(id?: Nullable<string>): Nullable<Category> | Promise<Nullable<Category>>;

    abstract getProductById(id: string): Product | Promise<Product>;

    abstract getProducts(dto: PageDTO): ProductsResponse | Promise<ProductsResponse>;
}

export class AuthResponse {
    accessToken: string;
    refreshToken: string;
}

export class Category {
    id: string;
    name: string;
    products: Product[];
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
    category: Category;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
}

export class ProductsResponse {
    data?: Nullable<Nullable<Product>[]>;
    pageInfo?: Nullable<PageInfo>;
}

type Nullable<T> = T | null;
