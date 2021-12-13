interface IFindOrderDTO {
  product_id?: string;
  up_price?: number;
  below_price?: number;
  date?: Date;
  page?: number;
}

export { IFindOrderDTO };
