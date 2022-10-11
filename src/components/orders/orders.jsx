import React from "react";
import { useSelector} from "../../hooks/hooks";
import { Link, useLocation } from "react-router-dom";
import styles from './orders.module.css';
import { OrderItem } from "./order-item/order-item";

export const Orders = () => {
	const location = useLocation();
	const orders = useSelector(store => store.ws.orders);

	return (
		<ul className={styles.listOrders}>
			<div className={styles.scroll}>
				{orders && orders.map((order) => (
					<Link key={order._id} className={styles.link}
						to={{
							pathname: `/feed/${order._id}`,
							state: { background: location }
						}}>
						<OrderItem order={order} />
					</Link>
				))}
			</div>
		</ul>
	)
}