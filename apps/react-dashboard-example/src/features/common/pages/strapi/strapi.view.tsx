import React from 'react';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import { Table } from '@kudaterbang/ui-mui-react-example';
import { useProductsGet } from '@kudaterbang/data-access-strapi';

const StrapiView = () => {
  const navigate = useNavigate();
  const { data: dataProducts } = useProductsGet();
  return (
    <div>
      <Typography variant="h2">Strapi</Typography>
      <Table
        rows={
          dataProducts?.data?.data.map((item) => ({
            ...item,
            ...item.attributes,
            attributes: undefined,
          })) || []
        }
        rowActionOptions={[
          {
            label: 'To Detail',
            onClick: (labelId) => {
              navigate(`/table-detail/${labelId}`);
            },
          },
        ]}
        rowRenderOption={{
          createdAt: ({ createdAt }) => (
            <>{new Date(createdAt).toLocaleDateString()}</>
          ),
          updatedAt: ({ updatedAt }) => (
            <>{new Date(updatedAt).toLocaleDateString()}</>
          ),
        }}
        columnKey="id"
        tableTitle="Product Table"
        checkboxOptions={{
          bulkOptions: [
            {
              label: 'Export',
              onClick: (selected) => {
                console.log('selected export', selected);
              },
            },
          ],
        }}
        headOptions={[
          {
            id: 'id',
            label: 'Id',
          },
          {
            id: 'description',
            label: 'Description',
          },
          {
            id: 'image',
            label: 'Image',
          },
          {
            id: 'price',
            label: 'Price',
          },
          {
            id: 'createdAt',
            label: 'Created',
          },
          {
            id: 'updatedAt',
            label: 'Updated',
          },
          {
            id: 'product_name',
            label: 'Product Name',
          },
          {
            id: 'stock',
            label: 'Stock',
          },
        ]}
      />
    </div>
  );
};

export default StrapiView;
