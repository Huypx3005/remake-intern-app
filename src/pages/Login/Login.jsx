import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Login.module.css";

import Button from "../../components/Button/Button";
import FormInput from "../../components/FormInput/FormInput";
import FormWrapper from "../../components/FormWrapper/FormWrapper";
import HorizontalLine from "../../components/HorizontalLine/HorizontalLine";
import Loading from "../../components/Loading/Loading";

import { useAuth } from "../../contexts/authContext";

const Login = () => {
  const navigate = useNavigate();

  const { logIn, signUp, loading } = useAuth();
  const [type, setType] = useState("login"); // type of form: login | sign up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await logIn(email, password);
      navigate("/profile");
    } catch (error) {
      console.error("Log-in error:", error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      setType("login");
      setPassword("");
    } catch (error) {
      console.error("Sign-up error:", error.message);
    }
  };

  return (
    <div className={styles["container"]}>
      {loading && <Loading />}
      <div className={styles["form"]}>
        <FormWrapper>
          <FormInput
            type="email"
            name="name"
            value={email}
            placeholder="example@email.com"
            autoComplete="on"
            display="block"
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="password"
            display="block"
            onChange={(e) => setPassword(e.target.value)}
          />
          <HorizontalLine width={75} />

          {type === "login" ? (
            <div>
              <Button
                type="submit"
                variant="primary"
                size="medium"
                onClick={handleLogin}
              >
                Log in
              </Button>
              <p className={styles["no-account"]}>
                Not a member?{" "}
                <Button
                  variant="success"
                  size="very-small"
                  onClick={() => {
                    setType("signup");
                    setEmail("");
                    setPassword("");
                  }}
                >
                  Sign up
                </Button>
              </p>
            </div>
          ) : (
            <div>
              <Button
                type="submit"
                variant="success"
                size="medium"
                onClick={handleSignUp}
              >
                Sign up
              </Button>
              <p className={styles["no-account"]}>
                Already have an account?{" "}
                <Button
                  size="very-small"
                  onClick={() => {
                    setType("login");
                    setEmail("");
                    setPassword("");
                  }}
                >
                  Log in
                </Button>
              </p>
            </div>
          )}
        </FormWrapper>
      </div>
    </div>
  );
};

export default Login;
