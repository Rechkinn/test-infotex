import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { EditUserModal, CreatedUserModal, MainPage } from "@/pages/main";

import { Page404 } from "@/pages/404";
import { AuthPage } from "@/pages/auth";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const App = () => {
  const location = useLocation();

  return (
    <>
      <Routes location={location?.state?.background || location}>
        <Route path="/login" element={<AuthPage />} />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/create"
          element={
            <ProtectedRoute>
              <CreatedUserModal />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Page404 />} />
      </Routes>

      {location?.state?.background && (
        <Routes>
          <Route
            path="/users/create"
            element={
              <ProtectedRoute>
                <CreatedUserModal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/edit/:id"
            element={
              <ProtectedRoute>
                <EditUserModal />
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </>
  );
};
