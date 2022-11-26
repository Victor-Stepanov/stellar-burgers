import { FC } from "react";
import { checkedArrayLength } from "../../../../utils/utils";
import styles from '../order-item.module.css';
import { IImageContainer } from "./image-container.props";

export const ImageContainer:FC<IImageContainer> = ({ filterArr }) => {

	const uniqIngredients = [...new Set(filterArr)];

	return (
		<>{filterArr &&
			<div className={styles.fixBox}>
				{filterArr.length <= 5 && uniqIngredients.map((item, index) => (
					<div className={styles.itemIamge} key={index}>
						<img className={styles.image} src={item.image_mobile}
							alt={item.name} />
					</div>
				))}
				{filterArr.length >= 6 && uniqIngredients.slice(0, 5).map((item, index) => (
					<div className={styles.itemIamge} key={index}>
						<img className={styles.image} src={item.image_mobile}
							alt={item.name} />
					</div>
				))}
				{filterArr.length > 6 && uniqIngredients.slice(5, 6).map((item, index) => (
					<div className={styles.itemIamge} key={index}>
						<img className={styles.image} src={item.image_mobile}
							alt={item.name} />
						<span className={`text text_type_digits-default ${styles.count}`}>{`+${checkedArrayLength(filterArr)}`}</span>
					</div>
				))}
			</div>
		}
		</>
	)
}
