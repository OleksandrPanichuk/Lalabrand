import { Search } from 'lucide-react'
import styles from './SearchBar.module.scss'

export const SearchBar = () => {
	return (
		<label className={styles.wrapper}>
			<input className={styles.input} placeholder='search products' />
			<Search className={styles.icon} />
		</label>
	)
}
