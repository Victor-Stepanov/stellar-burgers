import React, { useEffect } from "react";
import styles from './orders-history.module.css';
import { useSelector, useDispatch } from "../../../hooks/hooks";
import { wsAuthConnectionOpen, wsAuthConnectionClosed } from '../../../services/action-types';
import { useLocation } from "react-router";
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
		<>
			{!orders && <Loader />}
			<div className={styles.container}>
				<ProfileMenu />
				<ul className={styles.listOrders}>
					<div className={styles.scroll}>
						{orders && orders.map((order, index) => (
							<Link key={order._id} className={styles.orderLink}
								to={{
									pathname: `/profile/orders/${order._id}`,
									state: { background: location }
								}}>
								<OrderItem order={order} />
							</Link>
						))}
					</div>
				</ul>
			</div>
		</>
	)
}

export default OrdersHistory;