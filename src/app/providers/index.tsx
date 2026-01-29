import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import ruRU from "antd/locale/ru_RU";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { AuthProvider } from "@/pages/auth/component/AuthContext";

dayjs.locale("ru");

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export const withProviders = (Component: React.ComponentType) => {
  return () => (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ConfigProvider locale={ruRU}>
            <Component />
          </ConfigProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};
