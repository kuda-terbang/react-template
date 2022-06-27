import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';

import {
  useProductsGet,
  useProductDetailGet,
} from '@kudaterbang/data-access-strapi';

import { useAuth } from '../../../../utils/auth-strapi';

const StrapiView = () => {
  const { isAuthenticated } = useAuth();

  const { data: dataProducts } = useProductsGet();
  const { data: dataProductDetail, mutate: mutateProductDetail } =
    useProductDetailGet('1');

  return (
    <div>
      <Typography variant="h2">Strapi</Typography>
      <Button onClick={() => mutateProductDetail()}>Refresh</Button>
      {isAuthenticated && (
        <>
          {dataProducts?.data?.data.map((product) => (
            <div key={product.id}>
              <Typography variant="body2">
                {product.attributes.product_name}
              </Typography>
            </div>
          ))}
          <div>
            <div>Get Detail : </div>
            {JSON.stringify(dataProductDetail?.data)}
          </div>
        </>
      )}
    </div>
  );
};

export default StrapiView;
