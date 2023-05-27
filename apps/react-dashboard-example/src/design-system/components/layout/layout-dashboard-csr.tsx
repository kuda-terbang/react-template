import { Outlet } from 'react-router-dom';
import { LayoutDashboard, LayoutDashboardProps } from '@kuda-terbang/ui-mui-react-example';

type LayoutDashboardCSRProps = Omit<LayoutDashboardProps, 'children'>;

export default function LayoutDashboardCSR(props: LayoutDashboardCSRProps) {
  return (
    <LayoutDashboard {...props}>
      <Outlet />
    </LayoutDashboard>
  );
}
