import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailInput from "../../components/inputs/email-input";
import PasswordInput from "../../components/inputs/password-input";
import type { InputState } from "../../components/models/input";
import { useAuth } from "../../context/AuthContext";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="primary-button"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
