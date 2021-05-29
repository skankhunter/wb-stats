import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { ProvideAuth } from "./services/auth.service";
import { ProvideDatabse } from "./services/firebase.service";
import * as serviceWorker from "./serviceWorker";
import { store } from "./store/store";

ReactDOM.render(
   <ProvideDatabse>
      <ProvideAuth>
         <Provider store={store}>
            <BrowserRouter>
               <App />
            </BrowserRouter>
         </Provider>
      </ProvideAuth>
   </ProvideDatabse>,
   document.getElementById("root")
);

serviceWorker.unregister();
