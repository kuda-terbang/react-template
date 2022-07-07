import type { StrapiObject, StrapiObjectDetail } from '~/utils/util-api';
/**
 * Type declaration
 */

export interface Product {
  description: string;
  product_name: string;
  stock: number;
  image: string;
  createdAt: string;
  updatedAt: string;
  price: number;
  // additional type
  id_name: string;
}
export type ProductDetailResponse = StrapiObjectDetail<StrapiObject<Product>>;

/**
 * Initial Declaration
 */
export const initialProductDetail = {
  data: {
    attributes: {
      description: '',
      product_name: '',
      stock: 0,
      image: '',
      id_name: '',
      createdAt: '',
      updatedAt: '',
      price: 0,
    },
    id: 0,
  },
  meta: {},
};
