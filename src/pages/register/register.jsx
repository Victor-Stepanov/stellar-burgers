import React, { useCallback } from "react";
import styles from './register.module.css';
import { Link, Redirect } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { sendUserData } from '../../services/slice/userSlice';
import { useDispatch, useSelector } from "react-redux";
import useForm from '../../hooks/useForm';

export const RegisterPage = () => {
	const { user } = useSelector(store => store.userData);
	const { values, handleChange } = useForm({ name: '', email: '', password: '' });

	const dispatch = useDispatch();

	const userRegister = useCallback(
		e => {
			e.preventDefault();
			dispatch(sendUserData(values));
		},
		[values, dispatch]
	);
	//После регистрации перенаправление на главную старницу
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
			<h2 className="text text_type_main-medium">Регистрация</h2>
			<form className={styles.form} onSubmit={userRegister}>
				<div className="pt-6">
					<Input type={'text'} placeholder={'Имя'} errorText={'Ошибка'} size={'default'} onChange={handleChange} value={values.name} name={'name'} />
				</div>
				<div className="pt-6">
					<Input type={'email'} placeholder={'E-mail'} errorText={'Ошибка'} size={'default'} onChange={handleChange} value={values.email} name={'email'} />
				</div>
				<div className="pt-6 pb-6">
					<PasswordInput onChange={handleChange} value={values.password} name={'password'} />
				</div>
				<Button disabled={!(values.name && values.email && values.password)} type="primary" size="large">Зарегистрироваться</Button>
			</form>
			<p className="pt-20 text text_type_main-default text_color_inactive">Уже зарегистрированы?<Link className={styles.link} to={{ pathname: '/login' }}>Войти</Link></p>
		</div>
	)
}