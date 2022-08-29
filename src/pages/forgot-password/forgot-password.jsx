import React from "react";
import styles from './forgot-password.module.css';
import { Link, Redirect } from 'react-router-dom'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from "react-redux";
import { sendEmailResetValue } from '../../services/actions/auth'

export const ForgotPasswordPage = () => {
	const { forgoutSuccess } = useSelector(store => store.userData);
	const dispatch = useDispatch();
	const [email, setEmail] = React.useState('')
	const onChangeEmail = e => {
		setEmail(e.target.value)
	}

	const forgoutPassword = e => {
		e.preventDefault();
		dispatch(sendEmailResetValue(email))
	}

	if (forgoutSuccess) {
		return <Redirect to={{
			pathname: '/reset-password'
		}} />
	}

	return (
		<div className={styles.container}>
			<h2 className="text text_type_main-medium">Восстановление пароля</h2>
			<form className={styles.form} onSubmit={forgoutPassword}>
				<div className="pt-6 pb-6">
					<Input type={'email'} placeholder={'Укажите e-mail'} errorText={'Ошибка'} size={'default'} onChange={onChangeEmail} value={email} name={'email'} />
				</div>
				<Button disabled={!(email)} type="primary" size="medium">Восстановить</Button>
			</form>
			<p className="pt-20 text text_type_main-default text_color_inactive">Вспомнили пароль?<Link className={styles.link} to={{ pathname: '/login' }}>Войти</Link></p>
		</div>
	)

}