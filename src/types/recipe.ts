export interface Ingredient {
  supplyId: string;
  quantity: number;
}

export interface Recipe {
  id: string;
  name: string;
  ingredients: Ingredient[];
  cost: number;
  profit: number;
  portions: number;
  portion_cost: number;
  portion_profit: number;
  portion_price: number;
  sale_price: number;
  picture: string;
}
