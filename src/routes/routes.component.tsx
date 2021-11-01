import { RouteWithComponent, routes } from "./routes.data";
import React from "react";
import { Route, Switch } from 'react-router-dom'

const mapRoutes = (routes?: RouteWithComponent[]) => {
  return routes?.map((x, i) => (
    <Route
      key={i}
      path={x.path}
      exact={x.exact}
      render={(props) =>
        x.component && (
          <x.component {...props}>
            {x.routes && <Switch>{mapRoutes(x.routes)}</Switch>}
          </x.component>
        )
      }
    />
  ));
};

const AllRoutes = React.memo(function AllRoutes() {
  return <Switch>{mapRoutes(routes.routes)}</Switch>
})

export default AllRoutes