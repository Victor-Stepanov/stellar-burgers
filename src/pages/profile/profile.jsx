import React, {useCallback } from "react";
import styles from "./profile.module.css";
import {
	Button,
	Input,
	PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useHistory} from "react-router-dom";
import { sendLogoutData } from "../../services/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { sendUpdateUserData } from "../../services/actions/auth";
import useForm from '../../hooks/useForm';

export const ProfilePage = () => {
	
	const history = useHistory();
	const dispatch = useDispatch();
	const { user, logoutSuccess } = useSelector((store) => store.userData.user);
	const { values, handleChange, setValues } = useForm({ name: user.name, email: user.email, password: '' });
	
	//const logoutProfile = useCallback(
	//	() => {
	//		dispatch(sendLogoutData())
	//		history.replace({ pathname: '/login' });
	//	},[dispatch, history]
	//)


	//Временное решение
	const logoutProfile = () => {
		dispatch(sendLogoutData())
		if (logoutSuccess) {
			history.replace({ pathname: '/login' });
		}
	}

	const resetFormValue = () => {
		setValues({ name: user.name, email: user.email, password: '' })
	}

	
	const userUpdateDate = useCallback(
		e => {
			e.preventDefault();
			dispatch(sendUpdateUserData(values));
		},
		[values, dispatch]
	);


	return (
		<div className={styles.container}>
			<ul className={`${styles.list} mr-15`}>
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
			</ul>
			<form className={styles.form} onSubmit={userUpdateDate}>
				<div className="pt-6">
					<Input
						type={"text"}
						icon={"EditIcon"}
						placeholder={"Имя"}
						errorText={"Ошибка"}
						size={"default"}
						onChange={handleChange}
						value={values.name}
						name={"name"}
					/>
				</div>
				<div className="pt-6">
					<Input
						type={"email"}
						icon={"EditIcon"}
						placeholder={"Логин"}
						errorText={"Ошибка"}
						size={"default"}
						name={"email"}
						onChange={handleChange}
						value={values.email}
					/>
				</div>
				<div className="pt-6 pb-6">
					<PasswordInput
						onChange={handleChange}
						value={values.password}
						name={"password"}
					/>
				</div>
				<div className={styles.buttons}>
					<Button onClick={resetFormValue} type="secondary" size="medium">
						Отмена
					</Button>
					<Button type="primary" size="medium">
						Cохранить
					</Button>
				</div>
			</form>
		</div>
	);
};
