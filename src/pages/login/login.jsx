import React from "react";
import styles from './login.module.css';
import { Redirect, Link } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';


export const LoginPage = () => {
	const [value, setValue] = React.useState('')
	const onChange = e => {
		setValue(e.target.value)
	}

	return (
		<div className={styles.container}>
			<h2 className="text text_type_main-medium">Вход</h2>
			<form className={styles.form}>
				<div className="pt-6">
				<Input type={'email'} placeholder={'E-mail'} errorText={'Ошибка'} size={'default'} onChange={onChange} value={value} name={'email'} />
				</div>
				<div className="pt-6 pb-6">
					<PasswordInput onChange={onChange} value={value} name={'password'} />
				</div>
				<Button type="primary" size="medium">Войти</Button>
			</form>
			<p className="pt-20 text text_type_main-default text_color_inactive">Вы — новый пользователь?<Link className={styles.link} to="/register">Зарегистрироваться</Link></p>
			<p className="text text_type_main-default text_color_inactive">Забыли пароль?<Link className={styles.link} to="/forgot-password">Восстановить пароль</Link></p>
		</div>
	)
}