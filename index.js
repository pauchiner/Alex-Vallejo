// import { Main } from "./components.js"
import { BuzonDeSugerencias, Calendario, Inicio } from "./components.js";

/* function Layout() {
    return {
        view: ({children}) => [
            m("header"),
            m("main"),
            children,
            m("aside")
        ]
    }
} */

const routes = {
  // "/Inicio": { view: () =>  m(Main)},
  "/Inicio": { view: () => m(Inicio) },
  "/Buzon": { view: () => m(BuzonDeSugerencias) },
  "/Calendario": { view: () => m(Calendario) },
  // "/Posts/:href": {view: ({attrs}) => m(PostAUX, attrs)},
};

m.route(document.body, "/Inicio", routes); //Donde empieza
