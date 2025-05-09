// import { Main } from "./components.js"
import {
  Login,
  BuzonDeSugerencias,
  Sugerencias,
  Inicio,
  Calendario,
  AñadirActividad,
  Documentos,
} from "./components.js";

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
  "/Login": { view: () => m(Login) },
  "/Inicio": { view: () => m(Inicio) },
  "/Buzon": { view: () => m(BuzonDeSugerencias) },
  "/Sugerencias": { view: () => m(Sugerencias) },
  "/Calendario": { view: () => m(Calendario) },
  "/Documentos": { view: () => m(Documentos) },
  "/AñadirActividad": { view: () => m(AñadirActividad) },

  // "/Posts/:href": {view: ({attrs}) => m(PostAUX, attrs)},
};

m.route(document.body, "/Login", routes);
