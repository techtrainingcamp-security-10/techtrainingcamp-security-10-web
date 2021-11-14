import React from 'react';
import Login from '../pages/login'
import Register from '../pages/register';
import Remain from '../pages/remain';

export interface RouteWithComponent {
  component?: React.ComponentType<{ children?: React.ReactNode, [prop: string]: any }>
  routes?: RouteWithComponent[]
  exact?: boolean
  path?: string
}

export const routes: RouteWithComponent = {
  routes: [
    {
      path: "/",
      exact: true,
      component: Login,
    },
    {
      path: "/login",
      exact: true,
      component: Login,
    },
    {
      path: "/register",
      exact: true,
      component: Register,
    },
    {
      path: "/remain/:id",
      exact: true,
      component: Remain,
    }
  ],
}