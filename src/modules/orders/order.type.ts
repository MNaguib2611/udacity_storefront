export type Order = {
  id?: number;
  user_id?: number;
  status: string;
  products: Product[];
};

export type Product = {
  id: Number;
  quantity: Number;
};

export type Filter = {
  user_id: Number;
  status?: string;
};
