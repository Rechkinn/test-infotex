declare module "react-dom" {
  import * as React from "react";

  export function render(
    element: React.ReactElement | null,
    container: Element | DocumentFragment | null,
    callback?: () => void,
  ): void;

  export function unmountComponentAtNode(
    container: Element | DocumentFragment,
  ): boolean;
  export function findDOMNode(
    component: React.ReactInstance | Element | null,
  ): Element | null;
  export function createPortal(
    children: React.ReactNode,
    container: Element,
    key?: null | string,
  ): React.ReactPortal;

  export const version: string;
}
