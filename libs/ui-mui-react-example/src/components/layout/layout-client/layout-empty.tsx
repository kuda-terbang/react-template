import React from 'react';

type Props = {
  children: React.ReactNode;
};

const LayoutEmptyView = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default LayoutEmptyView;
