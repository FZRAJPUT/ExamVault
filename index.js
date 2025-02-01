import { registerRootComponent } from "expo";
import App from "./App";
import StoreContextProvider from "./context/storeContext";

let Main = () => (
  <StoreContextProvider>
    <App />
  </StoreContextProvider>
);

registerRootComponent(Main);
