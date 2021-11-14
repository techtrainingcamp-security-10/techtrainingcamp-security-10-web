import { Divider, message } from "antd";
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
import { PhoneInputPrefix, SubmitButton } from "../../components/form";
import withVerifyCode from "../../components/verifyCodeInput";
import { ActionLink, RouteLink } from "../../components/link";
import { Flex } from "../../components/layout";
import { phoneLogin, passwordLogin } from "../../api";
import { wrapFormikSubmitFunction } from "../../utils/form";
import { useHistory } from "react-router-dom";

const VerifyInput = withVerifyCode(Input);

const { verifyCode, phone, identifier, password, loginType } = loginForm;

const Login: React.FC<any> = () => {
  const [option, setOption] = useState(0);
  const history = useHistory();
  const login = wrapFormikSubmitFunction((data: any) => {
    const loginFunc =
      option === LOGIN_TYPE.PASSWORD ? passwordLogin : phoneLogin;
    return loginFunc(data).then(({ status, data }: any) => {
      if (status === 201) {
        message.success(data.Message)
        history.push(`/remain/${data.Data.SessionID}`);
      } else {
        console.log(data.Message)
        message.error(data.Message)
      }
    })
  });
  const sendVerifyCode = wrapFormikSubmitFunction((data: any) => {
    const ret = verifyCode.sendVerifyCode(data);
    return ret.then(({ status, data }: any) => {
      console.log(data.Data.VerifyCode);
      message.success(`您的验证码是：${data.Data.VerifyCode}`);
    });
  });
  return (
    <SimpleLayout headTitle="登陆 | TST 10">
      <Formik
        validationSchema={loginFormSchema}
        initialValues={loginInitialValues}
        onSubmit={login}
      >
        {({ values, errors, setFieldValue, setErrors, setTouched }: any) => (
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
                          sendVerifyCode(values[phone.name], {
                            setErrors,
                            setTouched,
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
                <ActionLink
                  onClick={() => {
                    setFieldValue(loginType.name, 1 - option);
                    setOption(1 - option);
                  }}
                >
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
