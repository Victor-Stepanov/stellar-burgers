import React, { useCallback, useState } from "react";
import styles from "./profile.module.css";
import {
	Button,
	Input,
	PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useHistory } from "react-router-dom";
import { sendLogoutData } from "../../services/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { sendUpdateUserData } from "../../services/actions/auth";

export const ProfilePage = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { user } = useSelector((store) => store.userData.user);

	//Поля формы
	const [name, setName] = useState(user.name);
	const [email, setEmail] = useState(user.email);
	const [password, setPassword] = useState('');

	//Функционал
	const onChangeName = (e) => {
		setName(e.target.value);
	};
	const onChangeLogin = (e) => {
		setEmail(e.target.value);
	};
	const onChangePassword = (e) => {
		setPassword(e.target.value);
	};

	const logoutProfile = useCallback(
		(e) => {
			e.preventDefault();
			dispatch(sendLogoutData())
			history.replace({ pathname: '/login' });
		},[dispatch, history]
	)

	const resetFormValue = () => {
		setName(user.name)
		setEmail(user.email)
		setPassword('')
	}

	const userUpdateDate = (e) => {
		e.preventDefault();
		dispatch(sendUpdateUserData(email, name, password));
	};

	
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
						onChange={onChangeName}
						value={name}
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
						onChange={onChangeLogin}
						value={email}
					/>
				</div>
				<div className="pt-6 pb-6">
					<PasswordInput
						onChange={onChangePassword}
						value={password}
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
