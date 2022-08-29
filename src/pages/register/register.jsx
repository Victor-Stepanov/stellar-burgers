import React, {useEffect, useState} from "react";
import styles from './register.module.css';
import { Link, Redirect } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { sendUserData } from '../../services/actions/auth';
import { useDispatch, useSelector } from "react-redux";


export const RegisterPage = () => {
	const {user} = useSelector(store => store.userData);
	
	const dispatch = useDispatch();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('')


	//Обработчики полей формы
	const onChangeName = e => {
		setName(e.target.value)
	}
	const onChangeEmail = e => {
		setEmail(e.target.value)
	}
	const onChangePassword = e => {
		setPassword(e.target.value)

	}

	const userRegister = e => {
		e.preventDefault();
		dispatch(sendUserData(email, password, name)) //диспатчим 
	}
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
					<Input type={'text'} placeholder={'Имя'} errorText={'Ошибка'} size={'default'} onChange={onChangeName} value={name} name={'name'} />
				</div>
				<div className="pt-6">
					<Input type={'email'} placeholder={'E-mail'} errorText={'Ошибка'} size={'default'} onChange={onChangeEmail} value={email} name={'email'} />
				</div>
				<div className="pt-6 pb-6">
					<PasswordInput onChange={onChangePassword} value={password} name={'password'} />
				</div>
				<Button disabled={!(name && email && password)}  type="primary" size="large">Зарегистрироваться</Button>
			</form>
			<p className="pt-20 text text_type_main-default text_color_inactive">Уже зарегистрированы?<Link className={styles.link} to={{ pathname:'/login'}}>Войти</Link></p>
		</div>
	)
}