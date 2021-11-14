import React, { useState, useEffect, FormEvent } from "react";
import { Formik } from "formik";
import { Form, FormItem, Input } from "formik-antd";
import { SimpleLayout } from "../../layout";
import {
  registerForm,
  registerFormSchema,
  registerInitialValues,
} from "../../form/fields";
import { PhoneInputPrefix, SubmitButton } from "../../components/form";
import { register } from "../../api";
import withVerifyCode from "../../components/verifyCodeInput";
import { RouteLink } from "../../components/link";
import { Flex } from "../../components/layout";
import { wrapFormikSubmitFunction } from "../../utils/form";
import { message } from "antd";
import { useHistory } from "react-router-dom";

const VerifyInput = withVerifyCode(Input);

const { verifyCode, phone, newPassword, confirmPassword, username } =
  registerForm;

const Register: React.FC<any> = () => {
  const history = useHistory()
  const onRegister = wrapFormikSubmitFunction((data: any) => {
    return register(data).then(({ data, status }: any) => {
      if (status < 300) {
        message.success(data.Message);
        history.push(`/login`);
      } else {
        console.log(data.Message);
        message.error(data.Message);
      }
    });
  });

  const sendVerifyCode = wrapFormikSubmitFunction((data: any) => {
    const ret = verifyCode.sendVerifyCode(data);
    return ret.then(({ data }: any) => {
      console.log(data.Data.VerifyCode);
      message.success(`您的验证码是：${data.Data.VerifyCode}`);
    });
  });

  return (
    <SimpleLayout headTitle="注册 | TST 10">
      <Formik
        validationSchema={registerFormSchema}
        initialValues={registerInitialValues}
        onSubmit={onRegister}
      >
        {({ values, errors, setTouched, setErrors }: any) => (
          <Form>
            <FormItem name={phone.name}>
              <Input
                prefix={<PhoneInputPrefix>+86</PhoneInputPrefix>}
                {...phone}
                size="large"
              />
            </FormItem>
            <FormItem name={username.name}>
              <Input {...username} size="large"></Input>
            </FormItem>
            <FormItem name={verifyCode.name}>
              <VerifyInput
                {...verifyCode}
                sendVerifyCode={() =>
                  sendVerifyCode(values[phone.name], { setErrors, setTouched })
                }
                buttonDisabled={errors[phone.name] || !values[phone.name]}
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
