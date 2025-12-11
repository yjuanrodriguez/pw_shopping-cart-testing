export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

export interface Product {
  name: string;
  description: string;
  price: number;
}

export interface ExpectedProductOrder {
  sort: SortOption;
  expectedFirst: string;
}
