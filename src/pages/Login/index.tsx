import React, { useState } from 'react';
import './index.css';
import cls from 'classnames';
import { Spin, message } from 'antd';
import { LoginFn, RegisterFn } from '../../utils/api';
import { useNavigate } from 'react-router';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] =
    useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [loginPanel, setLoginPanel] = useState(true);

  const toRegister = () => {
    setLoginPanel(false);
    setUsername('');
    setPassword('');
  };

  const toLogin = () => {
    setLoginPanel(true);
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    e.target.classList.add('focus');
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    if (e.target.value === '') {
      e.target.classList.remove('focus');
    }
  };

  async function Login() {
    if (!username || !password) {
      message.error('Username and password are required');
      return;
    }
    try {
      setLoading(true);
      const res: any = await LoginFn({
        username,
        password,
      });
      if (res.code === 1) {
        message.success({
          content: 'Login successful',
          duration: 1,
        });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.username);
        navigate('/home', {
          replace: true,
        });
      } else if (res.code === 0) {
        message.error(res.msg);
      } else {
        message.error('Login failed');
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  async function register() {
    if (!username || !password || !confirmPassword) {
      message.error('Username and password are required');
      return;
    }
    if (password !== confirmPassword) {
      message.error(
        'Password and confirm password do not match'
      );
      return;
    }
    try {
      setLoading(true);
      const res: any = await RegisterFn({
        username,
        password,
      });
      console.log(res);
      if (res.code === 1) {
        message.success(
          'Register successful, please continue to login'
        );
        setLoginPanel(true);
        setUsername('');
        setPassword('');
        setConfirmPassword('');
      } else if (res.code === 0) {
        message.error(res.msg);
      } else {
        message.error('Register failed');
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <div
        className={cls('main', {
          'reverse-gradient': !loginPanel,
        })}
      >
        <div
          className={cls('container', {
            'right-panel-active': !loginPanel,
          })}
          id="login-box"
        >
          <div
            className={cls(
              'form-container sign-up-container'
            )}
          >
            <form>
              <h1 className="register-title">Register</h1>
              <div className="txtb">
                <input
                  type="text"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  value={username}
                  onChange={e =>
                    setUsername(e.target.value)
                  }
                />
                <span data-placeholder="Username"></span>
              </div>

              <div className="txtb">
                <input
                  type="password"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  value={password}
                  onChange={e =>
                    setPassword(e.target.value)
                  }
                />
                <span data-placeholder="Password"></span>
              </div>
              <div className="txtb">
                <input
                  type="password"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  value={confirmPassword}
                  onChange={e =>
                    setConfirmPassword(e.target.value)
                  }
                />
                <span data-placeholder="Confirm Password"></span>
              </div>
              <button
                className="button"
                type="button"
                onClick={register}
              >
                confirm
              </button>
            </form>
          </div>
          <div
            className={`form-container sign-in-container`}
          >
            <form action="#">
              <h1 className="login-title">Login</h1>
              <div className="txtb">
                <input
                  type="email"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  value={username}
                  onChange={e =>
                    setUsername(e.target.value)
                  }
                />
                <span data-placeholder="username"></span>
              </div>
              <div className="txtb">
                <input
                  type="password"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  value={password}
                  onChange={e =>
                    setPassword(e.target.value)
                  }
                />
                <span data-placeholder="Password"></span>
              </div>
              <a href="#">Forget your password?</a>
              <button
                className="button"
                type="button"
                onClick={Login}
              >
                confirm
              </button>
            </form>
          </div>

          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Already have an account?</h1>
                <p className="text">
                  Please use your account to login
                </p>
                <button
                  type="button"
                  className="ghost button"
                  id="signIn"
                  onClick={toLogin}
                >
                  Login
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>No account?</h1>
                <p className="text">
                  Register and join us, let's start your
                  journey together!
                </p>
                <button
                  type="button"
                  className="ghost button"
                  id="signUp"
                  onClick={toRegister}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading && <Spin size="large" fullscreen />}
    </>
  );
}

export default Login;
