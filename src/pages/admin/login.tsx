import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailInput from "../../components/inputs/email-input";
import PasswordInput from "../../components/inputs/password-input";
import type { InputState } from "../../components/models/input";
import { useAuth } from "../../context/AuthContext";
import './login.scss';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [emailState, setEmailState] = useState<InputState>({
    value: "",
    touched: false,
    error: "",
    isValid: false,
  });

  const [passwordState, setPasswordState] = useState<InputState>({
    value: "",
    touched: false,
    error: "",
    isValid: false,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordState((prev: any) => ({
      ...prev,
      value: e.target.value,
    }));
  };

  const handlePasswordBlur = () => {
    setPasswordState((prev: any) => ({
      ...prev,
      touched: true,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validEmail = "sonyamore051@gmail.com";
    const validNumber = "9876543210";
    const validPassword = "pass@123";
    const loginToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjdlNjAxNTAwLWU0NzgtNGVlZC05NTczLTFjZjA0OWMwODhkNyIsImV4cCI6MTcxODc4NDU3M30.wADBMmCw7Zih_2cg_dlp9GcDHIrxuKHSWPnhIocKyVE"

    if (
      (emailState.value === validEmail || emailState.value === validNumber) &&
      passwordState.value === validPassword
    ) {
      setErrorMessage("");
      login(loginToken);
      navigate("/admin");
    } else {
      setErrorMessage("Incorrect credentials");
    }
  };
  

  return (
    <div className="main-login-wrapper">
      <div className="login-form-wrapper">
        <div className="login-text">Login</div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-inputs">
            <EmailInput
              customLabel="Email or Number"
              parentState={emailState}
              parentStateChanger={setEmailState}
              initialFocus={false} />

            <PasswordInput
              value={passwordState.value}
              errortext={passwordState.error}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
            />

          </div>
          {errorMessage && (
            <div className="error-text">{errorMessage}</div>
          )}

          <button
            type="submit"
            className="primary-button max-width-100"
             disabled={!emailState.isValid || !passwordState.value}
          >
            Login
          </button>
        </form>
      </div>
    </div >
  );
};

export default Login;
