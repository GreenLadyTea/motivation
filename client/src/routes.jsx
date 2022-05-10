import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import GoalsPage from './pages/GoalsPage';
import PeoplePage from './pages/PeoplePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import MainLayout from './layouts/main';
import HomePage from './pages/HomePage';
import CreateGoalPage from './pages/CreateGoalPage';
import AuthLayout from './layouts/auth';
import RegistrationPage from './pages/RegistrationPage';
import UserPage from './pages/UserPage';
import UpdateProfilePage from './pages/UpdateProfilePage';
import GoalPage from './pages/GoalPage';

export default function useRoutes(isAuth) {
  if (isAuth) {
    return (
      <>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="goals" element={<GoalsPage />} />
            <Route path="goals/:id" element={<GoalPage />} />
            <Route path="goals/new" element={<CreateGoalPage />} />
            <Route path="people" element={<PeoplePage />} />
            <Route path="people/:username" element={<UserPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="profile/update" element={<UpdateProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<HomePage />} />
        <Route path="registration" element={<RegistrationPage />} />
        <Route path="authorization" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}
