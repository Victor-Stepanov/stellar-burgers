import React from "react";
import styles from './reset-password.module.css';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { sendNewPassword } from '../../services/actions/auth';


export const ResetPasswordPage = () => {

	const disptach = useDispatch();
	const { resetSuccess, forgoutSuccess} = useSelector(store => store.userData);

	const [password, setPassword] = React.useState('');
	const [code, setCode] = React.useState('');

	const onChangePassword = e => {
		setPassword(e.target.value)
	}
	const onChangeCode = e => {
		setCode(e.target.value)
	}

	const resetValue = e => {
		e.preventDefault();
		disptach(sendNewPassword(password, code))
	}
	if (!forgoutSuccess) {
		return <Redirect to={{
			pathname: '/forgot-password'
		}} />
	}

	if (resetSuccess) {
		return <Redirect to={{
			pathname: '/login'
		}} />
	}


	return (
		<div className={styles.container}>
			<h2 className="text text_type_main-medium">Восстановление пароля</h2>
			<form className={styles.form} onSubmit={resetValue}>
				<div className="pt-6">
					<PasswordInput type={'password'} placeholder={"Введите новый пароль"} errorText={'Ошибка'} size={'default'} onChange={onChangePassword} value={password} name={'password'} />
				</div>
				<div className="pt-6 pb-6">
					<Input type={'text'} placeholder={'Введите код из письма'} errorText={'Ошибка'} size={'default'} onChange={onChangeCode} value={code} name={'name'} />
				</div>
				<Button disabled={!(password, code)} type="primary" size="medium">Восстановить</Button>
			</form>
			<p className="pt-20 text text_type_main-default text_color_inactive">Вспомнили пароль?<Link className={styles.link} to={{ pathname: '/login' }}>Войти</Link></p>
		</div>
	)

}