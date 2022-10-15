import React, { FormEvent, useCallback } from "react";
import styles from './login.module.css';
import { Redirect, Link, useLocation } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { sendLoginData } from '../../services/actions/auth';
import { useAppSelector, useAppDispatch} from "../../hooks/hooks";
import useForm from '../../hooks/useForm';
import { getCookie } from "../../utils/utils";

interface LocationState {
	from: {
	  pathname: string;
	};
  }

export const LoginPage = () => {
	const dispatch = useAppDispatch();
	const { values, handleChange } = useForm({email: '', password: '' });
	const {name, email} = useAppSelector(store => store.userData.user)
	const location = useLocation<LocationState>();

	const userLogin = useCallback(
		(e:FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			dispatch(sendLoginData(values))
		},
		[values, dispatch]
	);

	//После авторизации перенаправление на главную старницу
	if (name.length > 0 && email.length > 0) {
		return (
			<Redirect to={location?.state?.from || '/'}
			/>
		);
	}

	return (
		<div className={styles.container}>
			<h2 className="text text_type_main-medium">Вход</h2>
			<form className={styles.form} onSubmit={userLogin}>
				<div className="pt-6">
					<Input type={'email'} placeholder={'E-mail'} errorText={'Ошибка'} size={'default'} onChange={handleChange} value={values.email} name={'email'} />
				</div>
				<div className="pt-6 pb-6">
					<PasswordInput onChange={handleChange} value={values.password} name={'password'} />
				</div>
				<Button disabled={!(values.email, values.password)} type="primary" size="medium">Войти</Button>
			</form>
			<p className="pt-20 text text_type_main-default text_color_inactive">Вы — новый пользователь?<Link className={styles.link} to={{ pathname: '/register' }}>Зарегистрироваться</Link></p>
			<p className="text text_type_main-default text_color_inactive">Забыли пароль?<Link className={styles.link} to={{ pathname: '/forgot-password' }}>Восстановить пароль</Link></p>
		</div>
	)
}