import React, { useCallback, useState } from "react";
import styles from './profile.module.css';
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, Redirect } from "react-router-dom";
import {sendLogoutData} from '../../services/actions/auth'
import { useDispatch, useSelector } from "react-redux";
import { sendUpdateUserData } from '../../services/actions/auth';

export const ProfilePage = () => {
	const dispatch = useDispatch();
	const {user} = useSelector(store => store.userData.user)

	//Поля формы
	const [name, setName] = useState(user.name);
	const [login, setLogin] = useState(user.email);
	const [password, setPassword] = useState('');
	//
	const onChangeName = e => {
		setName(e.target.value);
	};
	const onChangeLogin = e => {
		setLogin(e.target.value);
	};
	const onChangePassword = e => {
		setPassword(e.target.value);
	};

	const logoutProfile = useCallback((e) => {
		e.preventDefault();
		dispatch(sendLogoutData())
	}, [dispatch])
	
	const userUpdateDate = e => {
		e.preventDefault();
		dispatch(sendUpdateUserData(name, login, password))
	}
	return (
		<div className={styles.container}>
			<ul className={`${styles.list} mr-15`}>
				<li>
					<NavLink
						className={`text text_type_main-medium ${styles.link}`}
						to={{

						}}>
						<span className="text text_type_main-medium">Профиль</span>
					</NavLink >
				</li>
				<li>
					<NavLink
						className={styles.link}
						to={{
							
						}}>
						<span className="text text_type_main-medium">История заказов</span>
					</NavLink >
				</li>
				<li>
					<NavLink onClick={logoutProfile}
						className={`text text_type_main-medium ${styles.link}`}
						to={{
							pathname:"/login"
						}}>
						<span className="text text_type_main-medium">Выход</span>
					</NavLink >
				</li>
				<p className={`mt-20 text text_type_main-default text_color_inactive ${styles.text}`}>В этом разделе вы можете
					изменить свои персональные данные</p>
			</ul>
			<form className={styles.form}>
						<div className="pt-6">
							<Input type={'text'} icon={'EditIcon'} placeholder={'Имя'} errorText={'Ошибка'} size={'default'} onChange={onChangeName} value={name} name={'name'} />
						</div>
						<div className="pt-6">
							<Input type={'email'}  icon={'EditIcon'} placeholder={'Логин'} errorText={'Ошибка'} size={'default'} name={'email'} onChange={onChangeLogin} value={login} />
						</div>
						<div className="pt-6 pb-6">
							<PasswordInput onChange={onChangePassword} value={password} name={'password'} />
						</div>
						<div className={styles.buttons}>
							<Button type="secondary" size="medium" >Отмена</Button>
							<Button onClick={userUpdateDate} type="primary" size="medium">Cохранить</Button>
						</div>
					</form>
		</div>
	)

}