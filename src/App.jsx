import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import DiamondTableScroll from "./pages/diamond-table-scroll";
import RequestSent from "./pages/request-sent";
import HintSent from "./pages/hint-sent";
import Compare from "./pages/compare";
import DiamondPage from "./pages/diamond-details";
import Complete from "./pages/complete";
import DiamondTable from "./pages/diamond-table";
import Diamond from "./pages/diamond";
import Settings from "./pages/settings";
import SettingDetails from "./pages/setting-details"; 

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/request-sent":
        title = "";
        metaDescription = "";
        break;
      case "/hint-sent":
        title = "";
        metaDescription = "";
        break;
      case "/compare":
        title = "";
        metaDescription = "";
        break;
      case "/diamond-page":
        title = "";
        metaDescription = "";
        break;
      case "/setting-details":
        title = "";
        metaDescription = "";
        break;
      case "/complete":
        title = "";
        metaDescription = "";
        break;
      case "/diamond-table":
        title = "";
        metaDescription = "";
        break;
      case "/diamond":
        title = "";
        metaDescription = "";
        break;
      case "/settings":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]',
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Settings />} />
      <Route path="/setting-details/:settingId" element={<SettingDetails />} /> 
      <Route path="/compare" element={<Compare />} />
      <Route path="/diamond" element={<Diamond />} />
      <Route path="/diamond-details" element={<DiamondPage />} />
      <Route path="/diamond-table" element={<DiamondTable />} />
      <Route path="/complete" element={<Complete />} />
      {/* <Route path="/diamond-table-scroll" element={<DiamondTableScroll />} /> */}
      {/* <Route path="/request-sent" element={<RequestSent />} /> */}
      {/* <Route path="/hint-sent" element={<HintSent />} /> */}
    </Routes>
  );
}
export default App;
