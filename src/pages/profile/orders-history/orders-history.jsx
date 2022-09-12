import React, { useEffect } from "react";
import styles from './orders-history.module.css';
import { useDispatch, useSelector } from "react-redux";
import { wsAuthConnectionOpen, wsAuthConnectionClosed } from '../../../services/action-types';
import { useHistory, useLocation } from "react-router";
import { Link, NavLink } from "react-router-dom";
import { OrderItem } from "../../../components/order-item/order-item";




const OrdersHistory = () => {
	const orders = useSelector(store => store.ws.userOrders);
	const dispatch = useDispatch();
	console.log(orders)
	const location = useLocation();

	useEffect(() => {
		dispatch(wsAuthConnectionOpen())
		return () => {
			dispatch(wsAuthConnectionClosed())
		}
	}, [dispatch])



	return (
		<div className={styles.container}>
			<ul className={`mr-15 ${styles.list}`}>
				<li>
					<NavLink
						exact
						className={styles.link}
						activeClassName={styles.linkActive}
						to={{
							pathname: "/profile",
						}}
					>
						<span className="text text_type_main-medium">Профиль</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						exact
						className={styles.link}
						activeClassName={styles.linkActive}
						to={{
							pathname: "/profile/orders",
						}}
					>
						<span className="text text_type_main-medium">История заказов</span>
					</NavLink>
				</li>
				<li>
					<button className={`text text_type_main-medium ${styles.button}`}>Выход</button>
				</li>
				<p
					className={`mt-20 text text_type_main-default text_color_inactive ${styles.text}`}
				>
					В этом разделе вы можете изменить свои персональные данные
				</p>
			</ul>
			<ul className={styles.listOrders}>
				<div className={styles.scroll}>
					{orders && orders.map((order, index) => (
						<Link key={index} className={styles.link}
							to={{
								pathname: `/feed/${order._id}`,
								state: { background: location }
							}}>
							<OrderItem order={order} />
						</Link>
					))}
				</div>
			</ul>
		</div>
	)
}

export default OrdersHistory;