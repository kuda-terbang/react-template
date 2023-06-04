import { dataAccessStrapi } from './data-access-strapi';

describe('dataAccessStrapi', () => {
  it('should work', () => {
    expect(dataAccessStrapi()).toEqual('data-access-strapi');
  });
});
