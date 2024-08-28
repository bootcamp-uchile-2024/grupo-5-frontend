interface IListProductResponsetDTO{
    total: number;
    products: ProductsDTO[];
}

interface ProductsDTO{
    id: number;
    name: string;
    price: number;
    
}