import React from "react";
import styles from './feed.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";


export const FeedPage = () => {
	return (
		<section className={styles.section}>
			<h2 className={`text text_type_main-large pt-10 pb-5 `}>Лента заказов</h2>
			<div className={styles.container}>
				<Orders />
				<OrdersStats />
			</div>
		</section>
	)
}


const Orders = () => {

	return (
		<ul className={styles.listOrders}>
			<OrderItem />
			<OrderItem />
			<OrderItem />
		</ul>
	)
}

const OrderItem = () => {
	return (
		<li className={styles.item}>
			<div className={`mb-6 ${styles.itemID}`}>
				<p className="text text_type_digits-default">#034535</p>
				<p className={`text text_type_main-default text_color_inactive ${styles.timestemp}`}>Сегодня, 16:20 i-GMT+3</p>
			</div>
			<div className={`mb-6 ${styles.itemInfo}`}>
				<p className={`text text_type_main-medium ${styles}`}>Death Star Starship Main бургер</p>
				<p className={`text text_type_main-small ${styles.status}`}></p>
			</div>
			<div className={`${styles.boxImagePrice}`}>
				<ImageItem />
				<div className={`${styles.price}`}>
					<p className={`text text_type_digits-default pr-2 ${styles}`}>370</p>
					<CurrencyIcon type="primary" />
				</div>
			</div>
		</li>

	)

}

const ImageItem = () => {
	return (
		<div className={styles.boxImage}>

		</div>
	)
}

const OrdersStats = () => {
	return (
		<div className={styles.OrdersStats}>
			<ul className={`${styles.OrdersBoard}`}>
				<li className={`${styles.Order}`}>
					<h3 className={`pb-6 text text_type_main-medium ${styles.OrderTitle}`}>Готовы:</h3>
					<p className={`pb-2 text text_type_digits-default ${styles.OrderDoneNumber}`}>034533</p>
					<p className={`pb-2 text text_type_digits-default ${styles.OrderDoneNumber}`}>034533</p>
					<p className={`pb-2 text text_type_digits-default ${styles.OrderDoneNumber}`}>034533</p>
				</li>
				<li className={`${styles.Order}`}>
					<h3 className={`pb-6 text text_type_main-medium ${styles.OrderTitle}`}>В работе:</h3>
					<p className={`pb-2 text text_type_digits-default `}>034538</p>
					<p className={`pb-2 text text_type_digits-default `}>034538</p>
					<p className={`pb-2 text text_type_digits-default `}>034538</p>
				</li>
			</ul>
			<div className={`pt-15 pb-15`}>
				<h3 className={`text text_type_main-medium`}>Выполнено за все время:</h3>
				<p className={`text text_type_digits-large ${styles.TotalNumber}`}>28 752</p>
			</div>
			<div>
				<h3 className={`text text_type_main-medium`}>Выполнено за сегодня:</h3>
				<p className={`text text_type_digits-large ${styles.TotalNumber}`}>138</p>
			</div>
		</div>
	)

}