import React from "react";
import "./App.css";
import UserRegistrationForm from "./components/UserRegistrationForm";
import { Provider } from "react-redux";
import store from "./redux/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <UserRegistrationForm />
      </div>
    </Provider>
  );
};

export default App;
