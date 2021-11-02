export const LOGIN_TYPE = {
  VERIFY_CODE: 0,
  PASSWORD: 1,
};
  
const LOGIN_TYPE_NAME: string[] = [];
LOGIN_TYPE_NAME[LOGIN_TYPE.VERIFY_CODE] = '验证码登录';
LOGIN_TYPE_NAME[LOGIN_TYPE.PASSWORD] = '账号密码登录';
export { LOGIN_TYPE_NAME };
  
export const LOGIN_TYPE_VALUE_NAME = 'loginType'; 