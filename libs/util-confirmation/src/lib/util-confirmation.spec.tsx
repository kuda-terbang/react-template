import { render } from '@testing-library/react';

import UtilConfirmation from './util-confirmation';

describe('UtilConfirmation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UtilConfirmation />);
    expect(baseElement).toBeTruthy();
  });
});
