import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import { ProfileDataProvider } from "./contexts/ProfileDataContext";
import { AlertProvider } from "./contexts/AlertContext";
import ScrollToTop from "./hooks/useScrollToTop";

ReactDOM.render(
  <Router>
    <AlertProvider>
      <CurrentUserProvider>
        <ProfileDataProvider>
          <ScrollToTop />
          <App />
        </ProfileDataProvider>
      </CurrentUserProvider>
    </AlertProvider>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
