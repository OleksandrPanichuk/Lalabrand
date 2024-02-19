import { Breadcrumbs } from '@/components/common';
import { Routes } from '@/shared/constants';

const Page = () => {
  return (
    <div className="page__container">
      <Breadcrumbs>
        <Breadcrumbs.Item href={Routes.ROOT}>lalabrand</Breadcrumbs.Item>
        <Breadcrumbs.Item href={Routes.SHOP}>shop</Breadcrumbs.Item>
      </Breadcrumbs>
    </div>
  );
};

export default Page;
