"use client"
import styles from './Info.module.scss'
import { ImageSlider } from '@/screens/product';
import { TypeProductItem } from '@/shared/types';



interface IInfoProps {
  data: TypeProductItem
}
export const Info = ({data}:IInfoProps) => {


  return <div className={styles.wrapper}>
    <ImageSlider images={data.info[0].images} />
    <div></div>
  </div>
}