// Import React library
import React from "react";
// Import necessary components and libraries
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ROUTE_LIST } from "./routes";
import MainLayout from "./layout";

// Define the App component
const App: React.FC = () => {
  return (
    <Router>
      <MainLayout>
        <Switch>
          {/* Render each route from list */}
          {ROUTE_LIST.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))}
          {/* Render 404 Not Found page */}
          <Route
            component={() => (
              <h1 className="h-screen w-screen grid place-content-center text-2xl font-bold">
                404 Not Found
              </h1>
            )}
          />
        </Switch>
      </MainLayout>
    </Router>
  );
};

// Export the App component as the default export
export default App;
