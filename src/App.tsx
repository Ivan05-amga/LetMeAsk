import {BrowserRouter,Route,Switch} from "react-router-dom"

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

import {AuthContextProvider} from "./context/AuthContext"
import { Room } from "./pages/Room";
import { AdminRoom } from "./pages/AdminRoom";
import {ThemeContextProvider} from "./context/ThemeContext"
import {ButtonTheme} from "./components/ButtonTheme"

function App() {
  
  return (
    <BrowserRouter>
      <ThemeContextProvider>
        <AuthContextProvider>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/rooms/new" component={NewRoom}/>
            <Route path="/rooms/:id" component={Room}/>
            <Route path="/admin/rooms/:id" component={AdminRoom} />
          </Switch>
        </AuthContextProvider>
        <ButtonTheme/>
      </ThemeContextProvider>
    </BrowserRouter>
  );
}


export default App;
