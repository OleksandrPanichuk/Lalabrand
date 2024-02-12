import { SvgIcon, Title } from '@/components/common';
import { Card } from '@/components/screens/home/card';
import { Link } from '@/shared/navigation';
import css from './page.module.scss';

const bestsellersFromBackend = [
  {
    id: 1,
    name: 'Patterned Bandeau Dress',
    path: '/imgDelete/bestseller-1.jpg',
    colors: ['black', 'blue', 'white'],
    price: 74.99,
  },
  {
    id: 2,
    name: 'Twill Trench Coat',
    path: '/imgDelete/bestseller-2.jpg',
    colors: ['brown', 'white'],
    price: 59.99,
  },
  {
    id: 3,
    name: 'Chunky Sneakers',
    path: '/imgDelete/bestseller-3.jpg',
    colors: ['grey', 'white'],
    price: 67.99,
  },
  {
    id: 4,
    name: 'Regular Fit Shirt',
    path: '/imgDelete/bestseller-4.jpg',
    colors: ['beige', 'white'],
    price: 23.99,
  },
];

const Page = () => {
  return (
    <div className={css.wrapper}>
      {/* second section */}
      <section className={css.bestsellers}>
        <Title name="bestsellers" />
        <div>
          <ul>
            {bestsellersFromBackend.map((el) => (
              <li key={el.id}>
                <Card item={el} />
              </li>
            ))}
          </ul>
          <Link href={'/shop'}>
            view more
            <SvgIcon name="arrow" width={42} height={16} fill={'#222'} />
          </Link>
        </div>
      </section>
      {/* end of second section */}
    </div>
  );
};

export default Page;
