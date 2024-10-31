  
interface Review {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
}

export interface Product {
    productId: never;
    id: number;
    title?: string;
    description?: string;
    category?: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand?: string;
    sku?: string;
    weight: number;
    dimensions?: { width: number; height: number; depth: number };
    warrantyInformation?: string;
    shippingInformation?: string;
    availabilityStatus?: string;
    reviews?: Review[];
    returnPolicy?: string;
    minimumOrderQuantity?: number;
    meta?: { createdAt: string; updatedAt: string; barcode?: string; qrCode?: string };
    thumbnail?: string;
    images: string[];
}

export interface ProductFilter {
    category?: string;
    priceRange?: { min: number; max: number };
    ratingRange?: { min: number; max: number };
    brand?: string;
    tags?: string[];
    availability?: string;
    shippingInformation?: string;
    returnPolicy?: string;
    minimumOrderQuantity?: number;
    createdAtRange?: { start: string; end: string };
    updatedAtRange?: { start: string; end: string };
    keywords?: string;
    sortBy?: string;
    sortOrder?: string;
    skip?: number;
    limit?: number;
}

export interface ProductResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}