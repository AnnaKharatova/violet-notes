import * as yup from 'yup';
import { ERROR_MESSAGES } from './config';

export const RegisterSchema = yup.object().shape({
	name: yup
		.string()
		.required(ERROR_MESSAGES.NAME.EMPTY_NAME),
	email: yup
		.string()
		.email(ERROR_MESSAGES.EMAIL.INCORRECT)
		.required(ERROR_MESSAGES.EMAIL.EMPTY),
	password: yup
		.string()
		.required(ERROR_MESSAGES.PASSWORD.EMPTY)
		.min(6, ERROR_MESSAGES.PASSWORD.TO_SHORT)
});