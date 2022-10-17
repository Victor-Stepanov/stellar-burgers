import React, { useEffect, useMemo } from "react";
import { useParams, useRouteMatch } from "react-router";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-info.module.css';
import { convertedDate, checkedOrderStatus, sumIngredients, countIngredients } from "../../utils/utils";
import { wsAuthConnectionClosed, wsAuthConnectionOpen, wsConnectionClosed, wsConnectionOpen } from "../../services/actions";





const OrderInfo = () => {
	const { id } = useParams<{id: string}>(); //id заказа
	const { path } = useRouteMatch<{path:string}>(); //получаем текущий путь
	const dispatch = useAppDispatch();

	const allOrders = useAppSelector(store => store.ws.orders); // Все заказы
	const { ingredients } = useAppSelector(store => store?.ingredientsData); // все ингредиенты
	const { userOrders } = useAppSelector(store => store.ws);//Заказы пользователя

	const orders = path.includes('feed') ? allOrders : userOrders; //в зависимости от пути, присваиваем нужный стор
	const order = orders.find((item) => item._id === id); //Кликнутый

	//any((
	const filterArr:any = useMemo(
		() => order?.ingredients.map((orderIngredient) => ingredients.find((item) => item._id === orderIngredient)
		), [ingredients, order?.ingredients])


	const uniqIngredients = [...new Set(filterArr)]; //массив уникальных ингредиентов

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
						<p className={`text text_type_main-medium pb-6`}>Состав:</p>
						<div className={styles.scroll}>
							{uniqIngredients.map((item:any, index:number) =>
								<li className={styles.item} key={index} >
									<div className={styles.fix}>
										<div className={styles.itemIamge}>
											<img className={styles.image} src={item.image_mobile}
												alt={item.name} />
										</div>
										<p className={`pl-4 pr-4 text text_type_main-default`}>{item.name}</p>
									</div>
									<div className={styles.price}>
										<p className={`text text_type_digits-default pr-2`}>{countIngredients(filterArr, item.name)}x{item.price}</p>
										<CurrencyIcon type="primary" />
									</div>
								</li>
							)}
						</div>
					</ul>
					<div className={`mt-10 ${styles.boxTimePrice}`}>
						<p className={`text text_type_main-default text_color_inactive ${styles.timestemp}`}>{convertedDate(order.createdAt)}</p>
						<div className={styles.price}>
							<p className={`text text_type_digits-default pr-2`}>{sumIngredients(filterArr)}</p>
							<CurrencyIcon type="primary" />
						</div>
					</div>
				</div>
			)}
		</>
	)
}
export default OrderInfo;