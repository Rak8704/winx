import React from "react";
import AuthContainer from "@/components/auth/AuthContainer";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <div>
      <AuthContainer
        title="Login"
        formRedirectLinkPlaceholder="Register"
        formRedirectText="No account yet? "
        formRedirectLink="/register"
      >
        <LoginForm />
      </AuthContainer>
    </div>
  );
};

export default Login;
