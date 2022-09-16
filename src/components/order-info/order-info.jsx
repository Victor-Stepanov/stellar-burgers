import React, { useEffect, useMemo } from "react";
import { useParams, useRouteMatch } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-info.module.css';
import { convertedDate, checkedOrderStatus, sumIngredients, countIngredients, getCookie } from "../../utils/utils";
import Loader from "../loader/loader";
import { wsAuthConnectionClosed, wsAuthConnectionOpen, wsConnectionClosed, wsConnectionOpen } from "../../services/action-types";





const OrderInfo = () => {
	const { id } = useParams(); //id заказа
	const { path } = useRouteMatch(); //получаем текущий путь
	const dispatch = useDispatch();

	const allOrders = useSelector(store => store.ws.orders); // Все заказы
	const { ingredients } = useSelector(store => store?.ingredientsData); // все ингредиенты
	const { userOrders } = useSelector(store => store.ws);//Заказы пользователя

	const orders = path.includes('feed') ? allOrders : userOrders; //в зависимости от пути, присваиваем нужный стор
	const order = orders.find((item) => item._id === id); //Кликнутый

	const filterArr = useMemo(
		() => order?.ingredients.map((orderIngredient) => ingredients.find((item) => item._id === orderIngredient)
		), [ingredients, order?.ingredients])

	useEffect(() => {
		if (!order) {
			if (path.includes('feed')) {
				dispatch(wsConnectionOpen())
			}
			if (path.includes('profile')) {
				dispatch(wsAuthConnectionOpen())
			}
			return (() => {
				if (path.includes('feed')) {
					dispatch(wsConnectionClosed())
				}
				if (path.includes('profile')) {
					dispatch(wsAuthConnectionClosed())
				}
			})
		}
	}, [dispatch, order, path])

	return (
		<>
			{order && filterArr && (
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
										<p className={`text text_type_digits-default pr-2`}>{countIngredients(filterArr, item.name)}x{item.price}</p>
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