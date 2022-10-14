import React, { useEffect, FC } from "react";
import styles from './feed.module.css';
import { useAppDispatch } from "../../hooks/hooks";
import { wsConnectionOpen, wsConnectionClosed } from '../../services/actions';
import { Orders } from "../../components/orders/orders";
import { OrdersStats } from "../../components/orders-stats/orders-stats";


export const FeedPage: FC = (): JSX.Element => {

	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(wsConnectionOpen())
		return () => {
			dispatch(wsConnectionClosed())
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
