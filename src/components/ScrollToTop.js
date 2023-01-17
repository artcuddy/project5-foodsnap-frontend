import { useEffect } from "react";
import { useLocation, useHistory } from "react-router";

const ScrollToTop = (props) => {
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    return () => {
      if (history.action !== "POP") {
        window.scrollTo(0, 0);
      }
    };
  }, [location, history.action]);

  return <>{props.children}</>;
};

export default ScrollToTop;
