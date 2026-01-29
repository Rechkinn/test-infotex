import React, { useEffect } from "react";
import { Button, Input, Form, message } from "antd";
import Modal from "../components/Modal";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useDeleteUser } from "@/shared/hooks/useDeleteUser";
import { usePutUser } from "@/shared/hooks/usePutUser";

export const EditUserModal = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const deleteUserMutation = useDeleteUser();
  const putUserMutation = usePutUser();
  useEffect(() => {
    if (location?.state) {
      form.setFieldsValue({
        id: location.state.id,
        name: location.state.name,
        avatar: location.state.avatar,
      });
    }
  }, [location, form]);

  const inputStyle = {
    backgroundColor: "rgb(207,207,207)",
  };
  const Div = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  const closeModal = () => window.history.back();

  const onFinish = async (values: any) => {
    try {
      await putUserMutation.mutateAsync(values);
      message.success("Данные пользователя успешно изменены!");
      closeModal();
    } catch (error) {
      message.error("Произошла ошибка при редактировании данных пользователя");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    message.error("Пожалуйста, заполните все обязательные поля");
  };

  const handleDelete = async (userId: string) => {
    try {
      await deleteUserMutation.mutateAsync(userId);
      message.success("Пользователь удалён!");
      closeModal();
    } catch (error) {
      message.error("Произошла ошибка при удалении пользователя");
    }
  };

  return (
    <Modal title="Редактирование пользователя" functionToClose={closeModal}>
      <Form
        form={form}
        name="deleteUser"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="id" name="id">
          <Input style={inputStyle} readOnly />
        </Form.Item>
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
            style={{ marginBottom: 0, marginRight: 10 }}
            onClick={() => handleDelete(location?.state?.id)}
          >
            {deleteUserMutation.isPending ? "Удаление..." : "Удалить"}
          </Button>
          <div>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginBottom: 0, marginRight: 10 }}
            >
              {putUserMutation.isPending ? "Сохранение..." : "Сохранить"}
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{ margin: 0 }}
              onClick={closeModal}
            >
              Отмена
            </Button>
          </div>
        </Div>
      </Form>
    </Modal>
  );
};
