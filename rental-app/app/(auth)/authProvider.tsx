import React from "react";
import { Amplify } from "aws-amplify";

import { Authenticator, Heading, Radio, RadioGroupField, useAuthenticator, View } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID!,
      userPoolClientId:
        process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID!,
    },
  },
});

const components = {
  Header() {
    return (
      <View className="mt-4 mb-7">
          <Heading level={3}
           className="!text-2xl !font-bold" >
            RENT
            <span className="text-rose-500 font-light hover:text-teal-500">
              APP
            </span>
            <p className="mt-2">
              <span className="font-bold">
                Welcome!
              </span>
              Please sign in to continue.
            </p>
           </Heading>
      </View>
    )
  },
  SignIn: {
    Footer() {
      const { toSignUp } = useAuthenticator();
      return (
        <View className="mt-4">
          <p className="text-center">
            Don&apos;t have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer
              hover:underline"
              onClick={toSignUp}
            >
              Sign Up
            </span>
          </p>
        </View>
      );
    }
  },
  SignUp: {
    FormFields() {
      const {validationErrors} = useAuthenticator()
      return (
        <>
          <Authenticator.SignUp.FormFields />
          <RadioGroupField
            legend="role"
            name="custom:role"
            errorMessage={validationErrors?.["custom:role"]}
            hasError={!!validationErrors?.["custom:role"]}
            isRequired
          >
            <Radio value="tentant">Tentant</Radio>
            <Radio value="manager">Manager</Radio>
          </RadioGroupField>
        </>
      )
    },
    Footer() {
      const { toSignIn } = useAuthenticator();
      return (
        <View className="mt-4">
          <p className="text-center">
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer
              hover:underline"
              onClick={toSignIn}
            >
              Sign In
            </span>
          </p>
        </View>
      );
    }
  }
}

const formFields = {
  signIn: {
    username: {
      placeholder: "Enter your email",
      label: "Email",
      isRequired: true,
    },
    password: {
      placeholder: "Enter your password",
      label: "Password",
      isRequired: true,
    },
  },
  signUp: {
    username: {
      order: 1,
      placeholder: "Choose a username",
      label: "Username",
      isRequired: true,
    },
    email: {
      order: 2,
      placeholder: "Enter your email address",
      label: "Email",
      isRequired: true,
    },
    password: {
      order: 3,
      placeholder: "Create a password",
      label: "Password",
      isRequired: true,
    },
    confirm_password: {
      order: 4,
      placeholder: "Confirm your password",
      label: "Confirm Password",
      isRequired: true,
    },
  },
};

const Auth = ({ children }: { children: React.ReactNode }) => {
  const {user} = useAuthenticator((context) => [context.user]);
  return (
    <div className="h-full">
      <Authenticator
       components={components}
       formFields={formFields}
      >{() => <>{children}</>}</Authenticator>
    </div>
  );
};


export default Auth;