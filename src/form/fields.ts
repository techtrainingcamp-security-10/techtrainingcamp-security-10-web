import * as Yup from "yup";
import { sendVerifyCode } from "../api";
import {
  LOGIN_TYPE,
  LOGIN_TYPE_VALUE_NAME,
} from "../pages/login/login.constants";
import * as utils from "../utils";

export const phone = {
  name: "PhoneNumber",
  placeholder: "请输入手机号",
  validator: Yup.string()
    .length(11, ({ length }) => `手机号长度必须为${length}位`)
    .required("手机号不可为空"),
};

export const identifier = {
  name: "UserName",
  placeholder: "请输入用户名",
  validator: Yup.string().required("用户名不能为空"),
};

export const verifyCode = {
  name: "VerifyCode",
  placeholder: "6位验证码",
  validator: Yup.string()
    .length(6, ({ length }) => `请输入${length}位验证码`)
    .required("验证码不可为空"),
  sendVerifyCodeBtnText: "发送验证码",
  limitSeconds: 60000,
  countDownFormatter: (ms: number) => `${Math.round(ms / 1000)}s`,
};

export const password = {
  name: "Password",
  placeholder: "请输入密码",
  validator: Yup.string().required("密码不可为空"),
};

export const newPassword = {
  ...password,
  validator: password.validator.min(8, "密码最少为8个字符"),
};

export const confirmPassword = {
  name: "confirm_password",
  placeholder: "请再次输入密码",
  validator: Yup.string().oneOf(
    [Yup.ref("Password")],
    "两次密码输入不相同"
  ),
};

export const username = {
  name: "UserName",
  placeholder: "请输入用户名",
  validator: Yup.string().required("用户名"),
};

const { buildInitialValues, buildSchema, conditionalField } = utils;

export const loginForm = {
  phone: conditionalField(phone, {
    value: LOGIN_TYPE_VALUE_NAME,
    is: LOGIN_TYPE.VERIFY_CODE,
  }),
  verifyCode: {
    ...conditionalField(verifyCode, {
      value: LOGIN_TYPE_VALUE_NAME,
      is: LOGIN_TYPE.VERIFY_CODE,
    }),
    sendVerifyCode: sendVerifyCode,
  },
  identifier: conditionalField(identifier, {
    value: LOGIN_TYPE_VALUE_NAME,
    is: LOGIN_TYPE.PASSWORD,
  }),
  password: conditionalField(password, {
    value: LOGIN_TYPE_VALUE_NAME,
    is: LOGIN_TYPE.PASSWORD,
  }),
  loginType: {
    name: LOGIN_TYPE_VALUE_NAME,
    initialValue: LOGIN_TYPE.VERIFY_CODE,
  },
};

export const loginFormSchema = buildSchema(loginForm);

export const loginInitialValues = buildInitialValues(loginForm);

export const registerForm = {
  verifyCode: {
    ...verifyCode,
    sendVerifyCode: sendVerifyCode,
  },
  phone,
  newPassword,
  confirmPassword,
  username,
};

export const registerFormSchema = buildSchema(registerForm);

export const registerInitialValues = buildInitialValues(registerForm);
