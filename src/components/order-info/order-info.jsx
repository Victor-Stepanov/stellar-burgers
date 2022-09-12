import React, { useMemo } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-info.module.css';
import { convertedDate, checkedOrderStatus, sumIngredients, countIngredients } from "../../utils/utils";


const OrderInfo = () => {
	const { id } = useParams(); //id заказа
	const orders = useSelector(store => store.ws.orders); // Все заказы
	const order = orders.find((item) => item._id === id); //Кликнутый
	const { ingredients } = useSelector(state => state.ingredientsData); // все ингредиенты


	//const all = order.ingredients; //массив ингредиентов из кликнутого заказа


	const filterArr = useMemo(
		() => order?.ingredients.map((orderIngredient) => ingredients.find((item) => item._id === orderIngredient)
		), [ingredients, order.ingredients])


	return (
		<>
			{orders && (
				<div className={styles.container}>
					<p className={`text text_type_digits-default ${styles.text}`}>#{order.number}</p>
					<div className={`pt-10 pb-15 ${styles.orderInfo}`}>
						<p className={`text text_type_main-medium`}>{order.name}</p>
						<p className={`text text_type_main-small ${styles.status}`}>{checkedOrderStatus(order.status)}</p>
					</div>
					<ul className={styles.list}>
						<p className={`text text_type_main-medium pb-6 ${styles}`}>Состав:</p>
						<div className={styles.scroll}>
							{[...new Set(filterArr)].map((item, index) =>
								<li className={`${styles.item}`} key={index} >
									<div className={styles.itemIamge}>
										<img className={styles.image} src={item.image_mobile}
											alt={item.name} />
									</div>
									<p className={`pl-4 pr-4 text text_type_main-default`}>{item.name}</p>
									<div className={`${styles.price}`}>
										<p className={`text text_type_digits-default pr-2 ${styles}`}>{countIngredients(filterArr, item.name)}x{item.price}</p>
										<CurrencyIcon type="primary" />
									</div>
								</li>
							)}
						</div>
					</ul>
					<div className={`mt-10 ${styles.boxTimePrice}`}>
						<p className={`text text_type_main-default text_color_inactive ${styles.timestemp}`}>{convertedDate(order.createdAt)}</p>
						<div className={`${styles.price}`}>
							<p className={`text text_type_digits-default pr-2 ${styles}`}>{sumIngredients(filterArr)}</p>
							<CurrencyIcon type="primary" />
						</div>
					</div>
				</div>
			)}
		</>
	)
}
export default OrderInfo;