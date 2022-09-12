import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import styles from './profile-menu.module.css';
import { sendLogoutData } from "../../../services/actions/auth";

const ProfileMenu = () => {

	const dispatch = useDispatch();
	const history = useHistory();
	const { logoutSuccess } = useSelector(store => store.userData.user);

	const logoutProfile = () => {
		dispatch(sendLogoutData())
		if (logoutSuccess) {
			history.replace({ pathname: '/login' });
		}
	}

	return (
		<menu className={`${styles.list} mr-15`}>
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
					<button className={`text text_type_main-medium ${styles.button}`} onClick={logoutProfile}>Выход</button>
				</li>
				<p
					className={`mt-20 text text_type_main-default text_color_inactive ${styles.text}`}
				>
					В этом разделе вы можете изменить свои персональные данные
				</p>
			</menu>
	)
}

export default ProfileMenu;