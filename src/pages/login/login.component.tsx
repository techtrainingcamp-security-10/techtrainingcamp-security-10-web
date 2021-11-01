import { Card, Form, Input } from "antd";
import React, { useState, useEffect } from "react";
import { LOGIN_TYPE_NAME, LOGIN_TYPE } from "./login.constants";
import { SimpleLayout } from "../../layout";

const Login: React.FC<any> = () => {
  const [option, setOption] = useState(0);
  return (
    <SimpleLayout headTitle="登陆 | TST 10">
        <Form></Form>
    </SimpleLayout>
  );
};
