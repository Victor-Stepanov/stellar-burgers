import React, { useEffect } from "react";
import styles from './feed.module.css';
import { useDispatch} from "react-redux";
import { wsConnectionOpen, wsConnectionClosed } from '../../services/slice/wsSlice';
import { Orders } from "../../components/orders/orders";
import { OrdersStats } from "../../components/orders-stats/orders-stats";


export const FeedPage = () => {

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch({type:wsConnectionOpen})
		return () => {
			dispatch({type:wsConnectionClosed})
		}
	}, [dispatch])

	return (
		<section className={styles.section}>
			<h2 className={`text text_type_main-large pt-10 pb-5`}>Лента заказов</h2>
			<div className={styles.container}>
				<Orders />
				<OrdersStats />
			</div>
		</section >
	)
}
