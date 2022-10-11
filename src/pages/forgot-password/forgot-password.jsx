import React, {useCallback} from "react";
import styles from './forgot-password.module.css';
import { Link, Redirect } from 'react-router-dom'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from "../../hooks/hooks";
import { sendEmailResetValue } from '../../services/actions/auth';
import useForm from '../../hooks/useForm';

export const ForgotPasswordPage = () => {
	const { forgoutSuccess } = useSelector(store => store.userData);
	const dispatch = useDispatch();
	const { values, handleChange } = useForm({ email: ''});

	const forgoutPassword = useCallback(
		e => {
			e.preventDefault();
			dispatch(sendEmailResetValue(values))
		},
		[values, dispatch]
	);

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
					<Input type={'email'} placeholder={'Укажите e-mail'} errorText={'Ошибка'} size={'default'} onChange={handleChange} value={values.email} name={'email'} />
				</div>
				<Button disabled={!(values.email)} type="primary" size="medium">Восстановить</Button>
			</form>
			<p className="pt-20 text text_type_main-default text_color_inactive">Вспомнили пароль?<Link className={styles.link} to={{ pathname: '/login' }}>Войти</Link></p>
		</div>
	)

}