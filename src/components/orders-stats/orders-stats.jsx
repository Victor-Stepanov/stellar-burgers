import React from "react";
import { useSelector} from "../../hooks/hooks";
import styles from './orders-stats.module.css';


export const OrdersStats = () => {
	//Все заказы
	const { orders } = useSelector(store => store.ws);
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