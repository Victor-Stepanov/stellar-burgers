import React from "react";
import styles from './login.module.css';
import { Redirect, Link } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { sendLoginData } from '../../services/actions/auth';
import { useDispatch, useSelector } from "react-redux";

export const LoginPage = () => {
	const dispatch = useDispatch();
	const user = useSelector(store => store.userData.user);

	const [email, setEmail] = React.useState('')
	const [password, setPassword] = React.useState('')

	const onChangeEmail = e => {
		setEmail(e.target.value)
	}
	const onChangePassword = e => {
		setPassword(e.target.value)
	}

	const userLogin = e => {
		e.preventDefault();
		dispatch(sendLoginData(email, password))
	}


	//После авторизации перенаправление на главную старницу
	if (user) {
		return (
			<Redirect to={{
				pathname: '/'
			}}
			/>
		);
	}

	return (
		<div className={styles.container}>
			<h2 className="text text_type_main-medium">Вход</h2>
			<form className={styles.form} onSubmit={userLogin}>
				<div className="pt-6">
					<Input type={'email'} placeholder={'E-mail'} errorText={'Ошибка'} size={'default'} onChange={onChangeEmail} value={email} name={'email'} />
				</div>
				<div className="pt-6 pb-6">
					<PasswordInput onChange={onChangePassword} value={password} name={'password'} />
				</div>
				<Button disabled={!(email, password)} type="primary" size="medium">Войти</Button>
			</form>
			<p className="pt-20 text text_type_main-default text_color_inactive">Вы — новый пользователь?<Link className={styles.link} to={{ pathname: '/register' }}>Зарегистрироваться</Link></p>
			<p className="text text_type_main-default text_color_inactive">Забыли пароль?<Link className={styles.link} to={{ pathname: '/forgot-password' }}>Восстановить пароль</Link></p>
		</div>
	)
}