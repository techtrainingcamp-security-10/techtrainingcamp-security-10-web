import React, { useState, useEffect, FormEvent } from "react";
import { Formik } from "formik";
import { Form, FormItem, Input } from "formik-antd";
import { SimpleLayout } from "../../layout";
import {
  registerForm,
  registerFormSchema,
  registerInitialValues,
} from "../../form/fields";
import {
  PhoneInputPrefix,
  SubmitButton,
} from "../../components/form";
import withVerifyCode from "../../components/verifyCodeInput";
import { RouteLink } from "../../components/link";
import { Flex } from "../../components/layout";

const VerifyInput = withVerifyCode(Input);

const {
  verifyCode,
  phone,
  newPassword,
  confirmPassword,
  email
} = registerForm;

const Register: React.FC<any> = () => {

  return (
    <SimpleLayout headTitle="注册 | TST 10">
      <Formik validationSchema={registerFormSchema} initialValues={registerInitialValues} onSubmit={() => {}}>
        {(props: any) => (
          <Form>
            <FormItem name={phone.name}>
              <Input
                prefix={<PhoneInputPrefix>+86</PhoneInputPrefix>}
                {...phone}
                size="large"
              />
            </FormItem>
            <FormItem name={email.name}>
              <Input {...email} size="large"></Input>
            </FormItem>
            <FormItem name={verifyCode.name}>
              <VerifyInput
                {...verifyCode}
                sendVerifyCode={() =>
                  new Promise((resolve: any, reject: any) => {
                    console.log("not thing here");
                    resolve();
                  })
                }
                buttonDisabled={props.errors[phone.name] || !props.values[phone.name]}
                size="large"
              />
            </FormItem>
            <FormItem name={newPassword.name}>
              <Input.Password size="large" {...newPassword}></Input.Password>
            </FormItem>
            <FormItem name={confirmPassword.name}>
              <Input.Password
                size="large"
                {...confirmPassword}
              ></Input.Password>
            </FormItem>
            <Flex>
              <span>
                <RouteLink to={`/login`}>已有账号？前往登录</RouteLink>
              </span>
            </Flex>
            <SubmitButton>注册</SubmitButton>
          </Form>
        )}
      </Formik>
    </SimpleLayout>
  );
};

export default Register;
