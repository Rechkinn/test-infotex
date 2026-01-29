import React, { FC } from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

type TUserDataProps = {
  id: string;
  avatar: string;
  name: string;
  createdAt: string;
  borderBottom: boolean;
};

export const UserData: FC<TUserDataProps> = ({
  id,
  avatar,
  name,
  createdAt,
  borderBottom,
}) => {
  const Article = styled.article`
    padding: 10px;
    display: flex;
    align-items: center;
    border-bottom: ${borderBottom ? `1px solid rgb(207, 207, 207)` : `none`};
  `;

  const H2 = styled.h2`
    font-size: 18px;
  `;

  const P = styled.p`
    color: gray;
  `;

  const location = useLocation();
  const navigate = useNavigate();

  const editInfoUser = () =>
    navigate(`/users/edit/${id}`, {
      state: {
        id: id,
        avatar: avatar,
        name: name,
        background: location,
      },
    });

  return (
    <Article
      tabIndex={0}
      role="button"
      aria-label={`Редактировать пользователя ${name}`}
      onClick={editInfoUser}
      onKeyDown={(e) => {
        if (e.key === "Enter") editInfoUser();
      }}
    >
      <img
        src={avatar}
        alt=""
        width="50"
        height="50"
        style={{ marginRight: "20px" }}
      />
      <div>
        <H2>{name}</H2>
        <P>
          Зарегистрирован <time>{dayjs(createdAt).format("DD.MM.YYYY")}</time>
        </P>
      </div>
    </Article>
  );
};
