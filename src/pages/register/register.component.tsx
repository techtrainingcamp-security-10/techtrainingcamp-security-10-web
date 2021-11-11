import { Form, Input, Button, Divider } from "antd";
import React, { useState, useEffect, FormEvent } from "react";
import { SimpleLayout } from "../../layout";
import { verifyCode, phone, identifier, password, newPassword, confirmPassword, email } from "../../form/fields";
import { FullWidthButton, PhoneInputPrefix } from "../../components/form";
import withVerifyCode from "../../components/verifyCodeInput"
import { ActionLink, RouteLink } from "../../components/link";
import { Flex } from "../../components/layout";

const VerifyInput = withVerifyCode(Input);


const Register: React.FC<any> = () => {
  const [disabled, setDiabled] = useState(false);
  const [verifyCodeDisabled, setVerifyCodeDiabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = Form.useForm();

  const formValidator = (e: FormEvent) => { setDiabled(true); }
  return (
    <SimpleLayout headTitle="注册 | TST 10">
      <Form form={form} onChange={(e: FormEvent) => {formValidator(e)}}>
        <Form.Item name={phone.name}>
          <Input prefix={<PhoneInputPrefix>+86</PhoneInputPrefix>} {...phone} size="large" />
        </Form.Item>
        <Form.Item name={email.name}>
          <Input {...email} size="large"></Input>
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
        <Form.Item name={password.name}>
          <Input.Password size="large" {...password}></Input.Password>
        </Form.Item>
        <Form.Item name={confirmPassword.name}>
          <Input.Password size="large" {...confirmPassword}></Input.Password>
        </Form.Item>
        <FullWidthButton
          type="primary"
          htmlType="submit"
          size="large"
          disabled={disabled}
          loading={isSubmitting}
        >注册</FullWidthButton>
        <Flex>
          <span>
            <RouteLink to={`/login`}>登录</RouteLink>
          </span>
        </Flex>
      </Form>
    </SimpleLayout>
  );
};

export default Register