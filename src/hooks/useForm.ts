import React, { ChangeEvent } from "react";
import { IUseForm } from "./useForm.props";

export default function useForm(inputValues: any) {
	const [values, setValues] = React.useState(inputValues);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = event.target;
		setValues({ ...values, [name]: value });
	};
	return { values, handleChange, setValues };
}
