import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './order-item.module.css';
import { convertedDate, checkedOrderStatus, sumIngredients, checkedArrayLength } from "../../../utils/utils";


export const OrderItem = ({ order }) => {
	const { ingredients } = useSelector(state => state?.ingredientsData);
	const all = order?.ingredients; //массив ингредиентов заказа


	const filterArr = useMemo(() =>
		all.map((orderIngredient) => ingredients.find((item) => item._id === orderIngredient)),
		[ingredients, all])


	return (
		<li className={styles.item}>
			<div className={`mb-6 ${styles.itemID}`}>
				<p className="text text_type_digits-default">#{order.number}</p>
				<p className={`text text_type_main-default text_color_inactive ${styles.timestemp}`}>{convertedDate(order.createdAt)}</p>
			</div>
			<div className={`mb-6 ${styles.itemInfo}`}>
				<p className={`text text_type_main-medium ${styles.name}`}>{order.name}</p>
				<p className={`text text_type_main-small ${styles.status}`}>{checkedOrderStatus(order.status)}</p>
			</div>
			<div className={styles.boxImagePrice}>
				<ImageContainer filterArr={filterArr} />
				<div className={`${styles.price}`}>
					<p className={`text text_type_digits-default pr-2`}>{sumIngredients(filterArr)}</p>
					<CurrencyIcon type="primary" />
				</div>
			</div>
		</li >

	)

}


const ImageContainer = ({ filterArr }) => {

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
