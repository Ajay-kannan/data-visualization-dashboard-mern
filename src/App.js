import "./App.css";
import SidebarApp from "./components/Sidebar";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SidebarApp />
      </BrowserRouter>
    </div>
  );
}

export default App;
