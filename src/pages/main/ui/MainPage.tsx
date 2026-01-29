import React, { useEffect, useState } from "react";
import { Button, Spin } from "antd";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { UserData } from "../components/UserData";
import { useUsers } from "@/shared/hooks/useUsers";
import { TUser } from "@/shared/types/types";
import { useLogout } from "@/shared/hooks/useAuth";

export const MainPage = () => {
  const [users2, setUsers] = useState<TUser[]>([]);
  const navigate = useNavigate();

  const { data: users, isLoading, isError, refetch } = useUsers();

  useEffect(() => {
    if (Array.isArray(users)) {
      setUsers(users);
    }
  }, [users]);

  const Section = styled.section`
    padding: 10px;
    display: flex;
    flex-direction: column;
  `;

  const Div = styled.div`
    margin-bottom: 50px;
  `;

  const location = useLocation();
  const createNewUser = () => {
    navigate("/users/create", { state: { background: location } });
  };

  const logoutMutation = useLogout();
  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
      navigate("/login");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Section>
      <Button type="primary" style={{ marginLeft: "auto" }} onClick={logout}>
        Выход
      </Button>

      {isLoading && <Spin size="large" />}
      {!isLoading && isError && (
        <div>
          <p style={{ marginBottom: "5px" }}>Ошибка получения данных!</p>
          <Button type="primary" onClick={() => refetch()}>
            Обновить
          </Button>
        </div>
      )}
      {!isLoading && !isError && (
        <>
          <Div>
            {users2.length === 0 ? (
              <p>Список пользователей пуст!</p>
            ) : (
              users2.map((user, i, arr) => {
                return (
                  <UserData
                    key={user.id}
                    id={user.id}
                    createdAt={user.createdAt}
                    avatar={user.avatar}
                    name={user.name}
                    borderBottom={i < arr.length - 1 ? true : false}
                  />
                );
              })
            )}
          </Div>
          <Button
            onClick={createNewUser}
            type="primary"
            style={{ maxWidth: "250px" }}
          >
            Создать пользователя
          </Button>
        </>
      )}
    </Section>
  );
};
