import React from 'react';

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
            component: React.Fragment,
        }
    ],
}