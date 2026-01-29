import React from "react";
import { Form, Input, Button, message } from "antd";
import Modal from "../components/Modal";
import styled from "styled-components";

import { useCreateUser } from "@/shared/hooks/useCreateUser";

const Div = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;

export const CreatedUserModal = () => {
  const [form] = Form.useForm();
  const createUserMutation = useCreateUser();

  const closeModal = () => window.history.back();

  const onFinish = async (values: any) => {
    try {
      await createUserMutation.mutateAsync(values);
      message.success("Пользователь создан!");
      closeModal();
    } catch (error) {
      console.log(error);
      message.error("Произошла ошибка при создании нового пользователя");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    message.error("Пожалуйста, заполните все обязательные поля");
  };

  return (
    <Modal title="Создание пользователя" functionToClose={closeModal}>
      <Form
        form={form}
        name="createUser"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Имя"
          name="name"
          rules={[{ required: true, message: "Пожалуйста, введите имя" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Ссылка на аватар"
          name="avatar"
          rules={[{ required: true, message: "Пожалуйста, введите ссылку" }]}
        >
          <Input />
        </Form.Item>

        <Div>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginBottom: 0, marginRight: 10 }}
          >
            {createUserMutation.isPending ? "Создание..." : "Создать"}
          </Button>
          <Button type="primary" style={{ margin: 0 }} onClick={closeModal}>
            Отмена
          </Button>
        </Div>
      </Form>
    </Modal>
  );
};
