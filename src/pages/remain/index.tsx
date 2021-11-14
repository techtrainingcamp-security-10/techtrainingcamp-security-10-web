import React, { useState, useEffect } from "react";
import { Button, message } from "antd";
import { logout } from "../../api";
import { useHistory } from "react-router-dom";

const Remain = (props: any) => {
  const id = props.match.params.id;
  console.log(id);
  const history = useHistory();
  const logoutFuc = async (sid: string, actionType: number) => {
    const res = await logout(sid, actionType);
    console.log(res);
    if (res.status == 201) {
      message.success(res.data.Message);
      history.replace("/login");
    } else {
      message.error(res.data.Message);
    }
  };
  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <Button
          type="primary"
          style={{
            marginRight: 20,
          }}
          onClick={() => {
            logoutFuc(id, 1);
          }}
        >
          点击登出
        </Button>
        <Button
          type="primary"
          onClick={() => {
            logoutFuc(id, 2);
          }}
        >
          点击注销
        </Button>
      </div>
    </div>
  );
};

export default Remain;
