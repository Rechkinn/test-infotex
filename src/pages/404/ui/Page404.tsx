import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const Page404 = () => {
  const navigate = useNavigate();
  const redirectToUsersBase = () => navigate("/users");

  const Section = styled.section`
    padding: 10px;
  `;

  const P = styled.p`
    margin-bottom: 15px;
  `;

  return (
    <Section>
      <P>Страница не найдена!</P>
      <Button type="primary" onClick={redirectToUsersBase}>
        Вернуться в базу пользователей
      </Button>
    </Section>
  );
};
