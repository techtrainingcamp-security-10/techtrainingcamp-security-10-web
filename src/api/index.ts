import client from "./client";

export const sendVerifyCode = (PhoneNumber: string) => {
  return client.post("/api/apply_code", { PhoneNumber: Number(PhoneNumber) });
};

export const passwordLogin = ({ UserName, Password }: any) => {
  return client.post("/api/login_uid", { UserName, Password });
};

export const phoneLogin = ({ PhoneNumber, VerifyCode }: any) => {
  return client.post("/api/login_uid", { PhoneNumber: Number(PhoneNumber), VerifyCode });
};

export const register = ({
  UserName,
  Password,
  VerifyCode,
  PhoneNumber,
}: any) => {
  return client.post("/api/register", {
    PhoneNumber: Number(PhoneNumber),
    VerifyCode,
    UserName,
    Password,
  });
};

export const logout = (SessionID: string, ActionType: number) => {
  return client.delete("/api/logout", { data: { SessionID, ActionType} })
}
