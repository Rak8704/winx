import React from "react";
import AuthContainer from "@/components/auth/AuthContainer";
import RegisterForm from "@/components/auth/RegisterForm";

const Register = () => {
  return (
    <div>
      <AuthContainer
        title="Register"
        formRedirectLinkPlaceholder="Login"
        formRedirectText="You already have an account"
        formRedirectLink="/login"
      >
        <RegisterForm />
      </AuthContainer>
    </div>
  );
};

export default Register;
