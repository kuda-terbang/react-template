import useSWR from 'swr';
import apiStrapiService from '..';

export const useProductsGet = () => useSWR('/products', apiStrapiService.productsGet);

export const useProductDetailGet = (productId: string) =>
  useSWR(
    {
      productId,
    },
    ({ productId }) => {
      return apiStrapiService.productDetailGet({
        paramsUrl: { id: productId },
      });
    }
  );
