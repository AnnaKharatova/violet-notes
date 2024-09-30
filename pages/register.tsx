import { useDispatch } from 'react-redux';
import { login } from '../store/userSlice';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterSchema } from '../utils/validationSchemes';

interface RegData {
  name: string,
  email: string,
  password: string,
}

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(RegisterSchema),
  });

  const dispatch = useDispatch();
  const router = useRouter();

  function onSubmit(data: RegData) {
    sessionStorage.setItem('username', data.name);
    sessionStorage.setItem('email', data.email);
    dispatch(login({ username: data.name, email: data.email }));
    router.push('/profile');
  };

  return (
    <>

      <main className="register">
        <h1 className="register__title">Регистрация</h1>
        <form
          className="register__form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <label className="register__label" htmlFor="name">
            Имя
            <input
              id="name"
              className={`register__input ${errors.name && !isValid && isDirty
                ? 'register__input_no-valid'
                : ''
                }`}
              {...register('name', { required: true })}
            />
            <div className="register__error">{errors.name?.message}</div>
          </label>

          <label className="register__label" htmlFor="email">
            Email
            <input
              id="email"
              className={`register__input ${errors.email && !isValid && isDirty
                ? 'register__input_no-valid'
                : ''
                } `}
              {...register('email', { required: true })}
            />
            <div className="register__error">{errors.email?.message}</div>
          </label>

          <div className="register__pass-input">
            <label className="register__label" htmlFor="password">
              Пароль
              <input
                id="password"
                type="password"
                className={`register__input ${errors.password && !isValid && isDirty
                  ? 'register__input_no-valid'
                  : ''
                  } `}
                {...register('password', { required: true })}
              />
              <div className="register__error">{errors.password?.message}
              </div>
            </label>
          </div>

          <button
            className={`register__submit-button ${(!isValid || !isDirty) && "register__submit-button_no-valid"}`}
            type="submit"
            disabled={!isValid || !isDirty}
          >
            Зарегистрироваться
          </button>
        </form>
      </main >
    </>
  );
}

export default Register;
