import { Hero } from '@/components/screens/home'
import styles from './page.module.scss'


const Page = () => {
  return <div className={styles.wrapper}>
    <Hero />
  </div>;
};

export default Page;
