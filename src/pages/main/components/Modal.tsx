import { createPortal } from "react-dom";
import ModalOverlay from "./ModalOverlay";
import React, { useEffect } from "react";
import { FC, PropsWithChildren } from "react";
import styled from "styled-components";

type TModalProps = {
  functionToClose: () => void;
  title: string;
} & PropsWithChildren;

const elementForRenderModal: HTMLElement | null =
  document.getElementById("modals");

const Modal: FC<TModalProps> = React.memo(
  ({ functionToClose, children, title }) => {
    useEffect(() => {
      function handleEscape(e: KeyboardEvent): void {
        if (e.key === "Escape") {
          functionToClose();
        }
      }

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [functionToClose]);

    if (!elementForRenderModal) return null;

    const Div = styled.div`
      padding: 20px;
      background-color: white;
      border-radius: 10px;
    `;

    const Button = styled.button`
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: 0;
      top: 0;
      background-color: transparent;
      border: 0;
      transition: all 200ms;

      &:active {
        scale: 0.8;
      }
    `;

    const H1 = styled.h1`
      font-size: 18px;
      margin-bottom: 20px;
    `;

    return createPortal(
      <ModalOverlay functionToClose={functionToClose}>
        <Div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <header style={{ position: "relative" }}>
            <H1 style={{}}>{title}</H1>

            <Button onClick={() => functionToClose()}>
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 15 15"
                version="1.1"
                id="cross"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.64,1.27L7.5,6.13l4.84-4.84C12.5114,1.1076,12.7497,1.0029,13,1c0.5523,0,1,0.4477,1,1&#xA;&#x9;c0.0047,0.2478-0.093,0.4866-0.27,0.66L8.84,7.5l4.89,4.89c0.1648,0.1612,0.2615,0.3796,0.27,0.61c0,0.5523-0.4477,1-1,1&#xA;&#x9;c-0.2577,0.0107-0.508-0.0873-0.69-0.27L7.5,8.87l-4.85,4.85C2.4793,13.8963,2.2453,13.9971,2,14c-0.5523,0-1-0.4477-1-1&#xA;&#x9;c-0.0047-0.2478,0.093-0.4866,0.27-0.66L6.16,7.5L1.27,2.61C1.1052,2.4488,1.0085,2.2304,1,2c0-0.5523,0.4477-1,1-1&#xA;&#x9;C2.2404,1.0029,2.4701,1.0998,2.64,1.27z"
                />
              </svg>
            </Button>
          </header>
          {children}
        </Div>
      </ModalOverlay>,
      elementForRenderModal,
    );
  },
);

export default Modal;
