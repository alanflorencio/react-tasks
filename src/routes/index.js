import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { Route as RouterRoute } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Task from "../pages/Task";

const Routes = () => {
	return (
		<BrowserRouter>
      <Switch>
        <RouterRoute exact path="/" component={Task} />
      </Switch>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
		</BrowserRouter>
	);
};

export default Routes;
