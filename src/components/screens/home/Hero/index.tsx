"use client"
import { LinkWithCircle } from "@/components/common"
import { Routes } from "@/shared/constants"
import { MoveRight } from "lucide-react"
import styles from './Hero.module.scss'
import { ImageSlider } from "./components"
import { useTranslations } from "next-intl"


export const Hero = () => {
	const t = useTranslations('Home.Hero')

	return <section className={styles.hero}>
		<div className={styles['left-side']}>
			<h1 className={styles.title}>
				<span>{t('Title.1')} <span>{t('Title.2')}</span> </span>
				<span>{t('Title.3')}</span>
			</h1>
			<p className={styles.text}>{t('Text')}</p>
			<LinkWithCircle href={Routes.CATEGORIES} className={styles.button} innerClassName={styles.button__inner}>
				{t('Button')}
				<MoveRight width={42} height={42} strokeWidth={1.5} />
			</LinkWithCircle>
		</div>
		<div className={styles['right-side']}>
			<ImageSlider />
		</div>
	</section>;
};
