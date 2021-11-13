import { Divider } from "antd";
import { Formik } from "formik";
import { Form, FormItem, Input } from "formik-antd";
import React, { useState, useEffect } from "react";
import { LOGIN_TYPE_NAME, LOGIN_TYPE } from "./login.constants";
import { SimpleLayout } from "../../layout";
import {
  loginForm,
  loginFormSchema,
  loginInitialValues,
} from "../../form/fields";
import {
  PhoneInputPrefix,
  SubmitButton,
} from "../../components/form";
import withVerifyCode from "../../components/verifyCodeInput";
import { ActionLink, RouteLink } from "../../components/link";
import { Flex } from "../../components/layout";

const VerifyInput = withVerifyCode(Input);

const {
  verifyCode,
  phone,
  identifier,
  password,
  loginType
} = loginForm;

const Login: React.FC<any> = () => {
  const [option, setOption] = useState(0);
  console.log(loginFormSchema)
  return (
    <SimpleLayout headTitle="登陆 | TST 10">
      <Formik validationSchema={loginFormSchema} initialValues={loginInitialValues} onSubmit={() => {}}>
        {({values, errors, setFieldValue}: any) => (
          <Form>
            {
              <>
                {option === LOGIN_TYPE.VERIFY_CODE && (
                  <>
                    <FormItem name={phone.name}>
                      <Input
                        prefix={<PhoneInputPrefix>+86</PhoneInputPrefix>}
                        {...phone}
                        size="large"
                      />
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
                        buttonDisabled={
                          errors[phone.name] || !values[phone.name]
                        }
                        size="large"
                      />
                    </FormItem>
                  </>
                )}
                {option === LOGIN_TYPE.PASSWORD && (
                  <>
                    <FormItem name={identifier.name}>
                      <Input {...identifier} size="large" />
                    </FormItem>
                    <FormItem name={password.name}>
                      <Input.Password {...password} size="large" />
                    </FormItem>
                  </>
                )}
                <ActionLink onClick={() => {setFieldValue(loginType.name, 1 - option); setOption(1 - option);}}>
                  {LOGIN_TYPE_NAME[1 - option]}
                </ActionLink>
              </>
            }
            <SubmitButton>登录</SubmitButton>
            <Flex>
              <span>
                <RouteLink to={`/register${location.search}`}>注册</RouteLink>
                <Divider type="vertical" />
                <RouteLink to={`/reset-password${location.search}`}>
                  忘记密码
                </RouteLink>
              </span>
            </Flex>
          </Form>
        )}
      </Formik>
    </SimpleLayout>
  );
};

export default Login;
