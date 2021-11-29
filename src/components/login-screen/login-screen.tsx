import { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login as loginAction } from '../../store/user-process/user-process';
import { AppDispatch } from '../../store/store';
import { unwrapResult } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import cn from 'classnames';
import PageLogo from '../page-logo/page-logo';
import PageFooter from '../page-footer/page-footer';
import LoginMessage from '../login-message/login-message';
import { AppRoute, AuthorizationStatus } from '../../const';
import { selectAuthorizationStatus } from '../../store/user-process/selectors';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const validateEmail = (email: string) => {
  const pattern = /\S+@\S+\.\S+/;

  return pattern.test(email);
};

const validatePassword = (password: string) => {
  const pattern = /^(?=.*[aA-zZ])(?=.*\d)[aA-zZ\d]{1,}$/;

  return pattern.test(password);
};

function LoginScreen(): JSX.Element {
  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Redirect to={AppRoute.Root} />;
  }

  const handleLoginInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setLogin(evt.target.value);

    if (emailError) {
      setMessage('');
      setEmailError(false);
    }
  };

  const handlePasswordInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPassword(evt.target.value);

    if (passwordError) {
      setMessage('');
      setPasswordError(false);
    }
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    switch (true) {
      case !validateEmail(login):
        setMessage('Please enter a valid email address');
        setEmailError(true);
        return;
      case !validatePassword(password):
        setMessage('Please enter a valid password');
        setPasswordError(true);
        return;
      case !validateEmail(login) && !validatePassword(password.toString()):
        setMessage('We can’t recognize this email and password combination. Please try again.');
        return;
    }

    dispatch(
      loginAction({
        email: login,
        password,
      }),
    )
      .then(unwrapResult)
      .then(() => {
        browserHistory.goBack();
      })
      .catch(() => toast.error('Не удалось войти в аккаунт'));
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <PageLogo />
        <h1 className="page-title user-page__title">Sign in</h1>
      </header>
      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleFormSubmit} noValidate>
          <LoginMessage message={message} />
          <div className="sign-in__fields">
            <div className={cn('sign-in__field', { 'sign-in__field--error': emailError })}>
              <input
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                value={login}
                onChange={handleLoginInputChange}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">
                Email address
              </label>
            </div>
            <div className={cn('sign-in__field', { 'sign-in__field--error': passwordError })}>
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                value={password}
                onChange={handlePasswordInputChange}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">
                Password
              </label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">
              Sign in
            </button>
          </div>
        </form>
      </div>
      <PageFooter />
    </div>
  );
}

export default LoginScreen;
