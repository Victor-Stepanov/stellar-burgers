import React, { ChangeEvent } from "react";

interface IUseForm {
	[key:string]:string
}


export default function useForm(inputValues:IUseForm) {
	const [values, setValues] = React.useState(inputValues);
  
	const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
	  const {value, name} = event.target;
	  setValues({...values, [name]: value});
	};
	return {values, handleChange, setValues};
  }