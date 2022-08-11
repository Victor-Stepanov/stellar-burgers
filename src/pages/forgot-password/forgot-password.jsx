import React from "react";
import styles from './forgot-password.module.css';
import {Link} from 'react-router-dom'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

export const ForgotPasswordPage = () => {
	const [value, setValue] = React.useState('')
	const onChange = e => {
		setValue(e.target.value)
	}
	return (
		<div className={styles.container}>
			<h2 className="text text_type_main-medium">Восстановление пароля</h2>
			<form className={styles.form}>
				<div className="pt-6 pb-6">
				<Input type={'email'} placeholder={'Укажите e-mail'} errorText={'Ошибка'} size={'default'} onChange={onChange} value={value} name={'email'} />
				</div>
				<Button type="primary" size="medium">Восстановить</Button>
			</form>
			<p className="pt-20 text text_type_main-default text_color_inactive">Вспомнили пароль?<Link className={styles.link} to="/login">Войти</Link></p>
		</div>
	)

}