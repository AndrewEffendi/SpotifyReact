import "bootstrap/dist/css/bootstrap.min.css";
import Authorization from "./Authorization";
import Dashboard from "./Dashboard";

const code = new URLSearchParams(window.location.search).get("code");

export default function App() {
  // render Dashboard if there is code, otherwise render the authorization
  return code ? <Dashboard code={code} /> : <Authorization />;
}
