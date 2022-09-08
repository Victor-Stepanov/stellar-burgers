import React, { useEffect, useMemo, useState } from "react";
import styles from './feed.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { wsConnectionOpen, wsConnectionClosed } from '../../services/action-types'
import { Link, useLocation } from "react-router-dom";
import { convertedDate, checkedOrderStatus } from "../../utils/utils";




export const FeedPage = () => {

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(wsConnectionOpen())
		return () => {
			dispatch(wsConnectionClosed())
		}
	}, [dispatch])

	return (
		<>
			<section className={styles.section}>
				<h2 className={`text text_type_main-large pt-10 pb-5 `}>Лента заказов</h2>
				<div className={styles.container}>
					<Orders />
					<OrdersStats />
				</div>
			</section >
		</>
	)
}


export const Orders = () => {
	const location = useLocation();
	const orders = useSelector(store => store.ws.orders);

	return (
		<ul className={styles.listOrders}>
			{orders && orders.map((order, index) => (
				<Link className={styles.link}
					to={{
						pathname: `/feed/${order._id}`,
						state: { background: location }
					}}>
					<OrderItem key={index} order={order} />
				</Link>
			))}
		</ul>
	)
}

export const OrderItem = ({ order }) => {
	const { ingredients } = useSelector(state => state.ingredientsData);
	const all = order.ingredients; //массив ингредиентов заказа


	const filterArr = useMemo(
		() => all.map((orderIngredient) => ingredients.find((item) => item._id === orderIngredient)
		), [ingredients, all])

	//Сделать подсчет суммы
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
			<div className={`${styles.boxImagePrice}`}>
				<div className={styles.fixBox}>
					{filterArr && filterArr.length <= 5 && [...new Set(filterArr)].map((item, index) =>

						<div className={styles.itemIamge}>
							<img className={styles.image} src={item.image} alt={item.name} />
						</div>

					)}
					{filterArr && filterArr.length > 6 && [...new Set(filterArr)].map((item, index) =>

						<div className={styles.itemIamge}>
							<img className={styles.image} src={item.image} alt={item.name} />
						</div>

					)}
				</div>
				<div className={`${styles.price}`}>
					<p className={`text text_type_digits-default pr-2 ${styles}`}>370</p>
					<CurrencyIcon type="primary" />
				</div>
			</div>
		</li >

	)

}




const OrdersStats = () => {
	//Все заказы
	const orders = useSelector(store => store.ws.orders);
	//Готовые:
	const doneStatus = orders.filter((order) => order.status === 'done').filter((order, index) => index < 10);
	//В работе
	const inWorkStatus = orders.filter((order) => order.status !== 'done').filter((order, index) => index < 10);
	//Total && totalToday
	const { total, totalToday } = useSelector(store => store.ws);
	return (
		<div className={styles.OrdersStats}>
			<ul className={`${styles.OrdersBoard}`}>
				<li className={`${styles.Order}`}>
					<h3 className={`pb-6 text text_type_main-medium ${styles.OrderTitle}`}>Готовы:</h3>
					{doneStatus.length > 0 && doneStatus.map((item, index) =>
						<p key={index} className={`pb-2 text text_type_digits-default ${styles.OrderDoneNumber}`}>{item.number}</p>
					)}
				</li>
				<li className={`${styles.Order}`}>
					<h3 className={`pb-6 text text_type_main-medium ${styles.OrderTitle}`}>В работе:</h3>
					{inWorkStatus && inWorkStatus.map((item, index) => (
						<p key={index} className={`pb-2 text text_type_digits-default `}>{item.number}</p>
					))}
				</li>
			</ul>
			<div className={`pt-15 pb-15`}>
				<h3 className={`text text_type_main-medium`}>Выполнено за все время:</h3>
				{total &&
					<p className={`text text_type_digits-large ${styles.TotalNumber}`}>{total}</p>}
			</div>
			<div>
				<h3 className={`text text_type_main-medium`}>Выполнено за сегодня:</h3>
				{totalToday &&
					<p className={`text text_type_digits-large ${styles.TotalNumber}`}>{totalToday}</p>
				}
			</div>
		</div>
	)

}