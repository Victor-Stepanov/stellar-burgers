import React from "react";
import styles from './register.module.css';
import { Link } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

export const RegisterPage = () => {

	const [value, setValue] = React.useState('')
	const onChange = e => {
		setValue(e.target.value)
	}

	return (
		<div className={styles.container}>
			<h2 className="text text_type_main-medium">Регистрация</h2>
			<form className={styles.form}>
				<div className="pt-6">
					<Input type={'text'} placeholder={'Имя'} errorText={'Ошибка'} size={'default'} onChange={onChange} value={value} name={'name'} />
				</div>
				<div className="pt-6">
					<Input type={'email'} placeholder={'E-mail'} errorText={'Ошибка'} size={'default'} onChange={onChange} value={value} name={'email'} />
				</div>
				<div className="pt-6 pb-6">
					<PasswordInput onChange={onChange} value={value} name={'password'} />
				</div>
				<Button type="primary" size="large">Зарегистрироваться</Button>
			</form>
			<p className="pt-20 text text_type_main-default text_color_inactive">Уже зарегистрированы?<Link className={styles.link} to="/login">Войти</Link></p>
		</div>
	)
}