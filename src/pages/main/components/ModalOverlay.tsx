import React, { FC, PropsWithChildren } from "react";
import styled from "styled-components";

type TModalOverlayProps = {
  functionToClose: () => void;
} & PropsWithChildren;

const ModalOverlay: FC<TModalOverlayProps> = ({
  functionToClose,
  children,
}) => {
  const Div = styled.div`
    padding: 10px;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.61);
    z-index: 500;
  `;

  return <Div onClick={functionToClose}>{children}</Div>;
};

export default ModalOverlay;
