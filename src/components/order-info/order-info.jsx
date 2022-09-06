import React from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-info.module.css';
import { convertedDate } from "../../utils/utils";

const OrderInfo = () => {
	const { id } = useParams(); //id заказа
	const orders = useSelector(store => store.ws.orders); // Все заказы
	const order = orders.find((item) => item._id === id); //Кликнутый
	const { ingredients } = useSelector(state => state.ingredientsData); // все ингредиенты

	//Достать id ingredients из order
	//Найти по этим id полный список элементов из ingredients


	return (
		<>
			{order && (
				<div className={styles.container}>
					<p className={`text text_type_digits-default ${styles.text}`}>#{order.number}</p>
					<div className={`pt-10 pb-15 ${styles.orderInfo}`}>
						<p className={`text text_type_main-medium ${styles}`}>{order.name}</p>
						<p className={`text text_type_main-small ${styles.status}`}></p>
					</div>
					<ul className={styles.list}>
						<p className={`text text_type_main-medium ${styles}`}>Состав:</p>
						<li>
							<img src="" alt="" />
							<p>Флюоресцентная булка R2-D3</p>
							<p className={`text text_type_digits-default pr-2 ${styles}`}>370</p>
							<CurrencyIcon type="primary" />
						</li>
					</ul>
					<div className={`mt-10 ${styles.boxTimePrice}`}>
						<p className={`text text_type_main-default text_color_inactive ${styles.timestemp}`}>{convertedDate(order.createdAt)}</p>
						<div className={`${styles.price}`}>
							<p className={`text text_type_digits-default pr-2 ${styles}`}>370</p>
							<CurrencyIcon type="primary" />
						</div>
					</div>
				</div>
			)}
		</>
	)
}
export default OrderInfo;