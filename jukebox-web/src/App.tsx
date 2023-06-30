import React from 'react';
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import WelcomePage from './pages/welcome';
import routes from './pages/routes';
import Player from './pages/player';
import { MusicPlayerProvider } from './features/musicPlayer/MusicPlayerProvider';
import { GroupSessionProvider } from './features/groupSessions/GroupSessionProvider';
import GuestPage from './pages/guest';

function App() {
  const router = createBrowserRouter([
    {
      path: routes.welcome,
      element: <WelcomePage />
    },
    {
      path: routes.player,
      element: <Player />
    },
    {
      path: routes.guest,
      element: <GuestPage />
    }
  ])

  return (
    <MusicPlayerProvider>
      <GroupSessionProvider>
        <RouterProvider router={router}></RouterProvider>   
      </GroupSessionProvider>
    </MusicPlayerProvider>
  );
}

export default App;
