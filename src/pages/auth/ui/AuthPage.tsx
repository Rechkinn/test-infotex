import React from "react";
import { Button, Form, Input } from "antd";
import { useLogin } from "@/shared/hooks/useAuth";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export const AuthPage = () => {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const onFinish = async (values: { login: string; password: string }) => {
    try {
      await loginMutation.mutateAsync(values);
      navigate("/users");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const Div = styled.div`
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
  `;

  return (
    <Div>
      <Form
        onFinish={onFinish}
        style={{ width: "285px", display: "flex", flexDirection: "column" }}
      >
        <h1 style={{ fontSize: "16px", marginBottom: "20px" }}>Авторизация</h1>
        <Form.Item
          name="login"
          rules={[{ required: true, message: "Введите логин" }]}
        >
          <Input placeholder="Логин" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Введите пароль" }]}
        >
          <Input.Password placeholder="Пароль" />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ alignSelf: "end", margin: 0 }}
        >
          Войти
        </Button>
      </Form>
    </Div>
  );
};
