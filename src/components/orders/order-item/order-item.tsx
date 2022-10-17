import React, { FC, useMemo } from "react";
import { useAppSelector} from "../../../hooks/hooks";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './order-item.module.css';
import { convertedDate, checkedOrderStatus, sumIngredients} from "../../../utils/utils";
import { IOrderItem } from "./order-item.props";
import { ImageContainer } from "./image-container/image-container";


export const OrderItem:FC<IOrderItem> = ({ order }):JSX.Element => {
	const { ingredients } = useAppSelector(state => state.ingredientsData);
	const all = order?.ingredients; //массив ингредиентов заказа


	const filterArr:any = useMemo(() =>
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
