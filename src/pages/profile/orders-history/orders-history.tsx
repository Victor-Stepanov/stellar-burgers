import React, { FC, useEffect } from "react";
import styles from "./orders-history.module.css";
import { useAppSelector, useAppDispatch } from "../../../hooks/hooks";
import {
	wsAuthConnectionOpen,
	wsAuthConnectionClosed,
} from "../../../services/actions";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { OrderItem } from "../../../components/orders/order-item/order-item";
import ProfileMenu from "../profile-menu/profile-menu";
import Loader from "../../../components/loader/loader";
import {Location} from 'history';

const OrdersHistory: FC = () => {
	const orders = useAppSelector((store) => store.ws.userOrders);
	const dispatch = useAppDispatch();
	const location = useLocation<Location>();

	useEffect(() => {
		dispatch(wsAuthConnectionOpen());
		return () => {
			dispatch(wsAuthConnectionClosed());
		};
	}, [dispatch]);

	return (
		<>
			{!orders && <Loader />}
			<div className={styles.container}>
				<ProfileMenu />
				<ul className={styles.listOrders}>
					<div className={styles.scroll}>
						{orders &&
							orders.map((order) => (
								<Link
									key={order._id}
									className={styles.orderLink}
									to={{
										pathname: `/profile/orders/${order._id}`,
										state: { background: location },
									}}
								>
									<OrderItem order={order} />
								</Link>
							))}
					</div>
				</ul>
			</div>
		</>
	);
};

export default OrdersHistory;
