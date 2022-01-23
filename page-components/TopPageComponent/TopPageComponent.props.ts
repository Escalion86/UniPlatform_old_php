import { ProductModel } from "../../interfaces/product.interface";
import { TopLevelCategory, TopPageModel } from "../../interfaces/page.interface";

export interface TopPageComponentProps {
  firstCategory: TopLevelCategory
  page: TopPageModel
  products: ProductModel[]
}