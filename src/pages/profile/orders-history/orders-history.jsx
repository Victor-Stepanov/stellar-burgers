import React, { useEffect } from "react";
import styles from './orders-history.module.css';
import { useDispatch, useSelector } from "react-redux";
import { wsAuthConnectionOpen, wsAuthConnectionClosed } from '../../../services/action-types';
import {useLocation } from "react-router";
import { Link } from "react-router-dom";
import { OrderItem } from "../../../components/orders/order-item/order-item";
import ProfileMenu from "../profile-menu/profile-menu";
import Loader from "../../../components/loader/loader";




const OrdersHistory = () => {
	const orders = useSelector(store => store.ws.userOrders);
	const dispatch = useDispatch();
	const location = useLocation();

	useEffect(() => {
		dispatch(wsAuthConnectionOpen())
		return () => {
			dispatch(wsAuthConnectionClosed())
		}
	}, [dispatch])



	return (
		<div className={styles.container}>
			<ProfileMenu/>
			<ul className={styles.listOrders}>
				<div className={styles.scroll}>
					{orders && orders.map((order, index) => (
						<Link key={index} className={styles.orderLink}
							to={{
								pathname: `/profile/orders/${order._id}`,
								state: { background: location }
							}}>
							<OrderItem order={order} key={Math.random().toString(36).slice(2)}/>
						</Link>
					))}
				</div>
			</ul>
		</div>
	)
}

export default OrdersHistory;