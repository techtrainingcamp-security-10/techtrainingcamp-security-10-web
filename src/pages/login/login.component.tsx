import { Form, Input, Button, Divider } from "antd";
import React, { useState, useEffect } from "react";
import { LOGIN_TYPE_NAME, LOGIN_TYPE } from "./login.constants";
import { SimpleLayout } from "../../layout";
import { verifyCode, phone, identifier, password, newPassword, confirmPassword, email } from "../../form/fields";
import { FullWidthButton, PhoneInputPrefix } from "../../components/form";
import withVerifyCode from "../../components/verifyCodeInput"
import { ActionLink, RouteLink } from "../../components/link";
import { Flex } from "../../components/layout";

const VerifyInput = withVerifyCode(Input);


const Login: React.FC<any> = () => {
  const [option, setOption] = useState(0);
  const [disabled, setDiabled] = useState(true);
  const [verifyCodeDisabled, setVerifyCodeDiabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = Form.useForm();

  const formValidator = () => { setDiabled(false); }
  return (
    <SimpleLayout headTitle="登陆 | TST 10">
        <Form form={form}>
            {
              <>
                {option === LOGIN_TYPE.VERIFY_CODE && (
                  <>
                    <Form.Item name={phone.name}>
                      <Input prefix={<PhoneInputPrefix>+86</PhoneInputPrefix>} {...phone} size="large" />
                    </Form.Item>
                    <Form.Item name={verifyCode.name}>
                      <VerifyInput
                        {...verifyCode}
                        sendVerifyCode={() => new Promise((resolve: any, reject: any) => {
                          console.log('not thing here');
                          resolve();
                        })}
                        buttonDisabled={verifyCodeDisabled}
                        size="large"
                      />
                    </Form.Item>
                  </>
                )}
                {option === LOGIN_TYPE.PASSWORD && (
                  <>
                    <Form.Item name={identifier.name}>
                      <Input {...identifier} size="large" />
                    </Form.Item>
                    <Form.Item name={password.name}>
                      <Input.Password {...password} size="large" />
                    </Form.Item>
                  </>
                )}
                <ActionLink onClick={() => setOption(1 - option)}>
                  {LOGIN_TYPE_NAME[1 - option]}
                </ActionLink>
              </>}
              <FullWidthButton
                type="primary"
                htmlType="submit"
                size="large"
                disabled={disabled}
                loading={isSubmitting}
              >登录</FullWidthButton>
          <Flex>
            <span>
              <RouteLink to={`/register${location.search}`}>注册</RouteLink>
              <Divider type="vertical" />
              <RouteLink to={`/reset-password${location.search}`}>忘记密码</RouteLink>
            </span>
          </Flex>
        </Form>
    </SimpleLayout>
  );
};

export default Login