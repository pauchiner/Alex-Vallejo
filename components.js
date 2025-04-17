///---------------CONSTANTES-----------------///
const alturaRelativaHeader = "10vh";
const alturaRelativaBody = "85vh";
const alturaRelativaFooter = "5vh";
const fontSizeh1 = "35px";
const fontSizeh2 = "24px";
const fontSizeh3 = "20px";

const backgroundColorButton = "#BF0F1E3D";
const accentColor = "#D42635";
const blackColor = "#1B1B1B";

let modoOscuroOn = JSON.parse(localStorage.getItem("modoOscuro")) || false;

/**
 * Animate a property (like scale) using a spring simulation.
 * @param {HTMLElement} element - The element to be animated.
 * @param {string} property - The CSS transform property to apply (e.g., "scale").
 * @param {number} from - Starting value.
 * @param {number} to - Target value.
 * @param {Object} options - Spring parameters.
 */
function animateSpring(element, property, from, to, options = {}) {
  let current = from;
  let velocity = 0;
  // Default spring parameters (tweak these to change the feel):
  const stiffness = options.stiffness || 200; // spring stiffness
  const damping = options.damping || 15; // damping factor
  const mass = options.mass || 1; // mass (affects acceleration)
  const threshold = options.threshold || 0.001; // when to stop the animation

  const dt = 1 / 60; // approximate time step (60fps)

  function update() {
    // Calculate the spring force: F = -stiffness * (current - to)
    const springForce = -stiffness * (current - to);
    // Calculate the damping force: F = -damping * velocity
    const dampingForce = -damping * velocity;
    // Sum forces to get acceleration: F = ma, so a = F / m
    const acceleration = (springForce + dampingForce) / mass;

    // Update velocity and current value with simple Euler integration
    velocity += acceleration * dt;
    current += velocity * dt;

    // Apply the new scale value using transform (for example, scale)
    element.style.transform = `${property}(${current.toFixed(3)})`;

    // Stop if the change is below a small threshold
    if (Math.abs(current - to) > threshold || Math.abs(velocity) > threshold) {
      requestAnimationFrame(update);
    } else {
      // Ensure final value is set
      element.style.transform = `${property}(${to})`;
    }
  }

  requestAnimationFrame(update);
}

///----------------LOGIN-----------------///
function Login() {
  return {
    view: () => [
      m(
        "div",
        {
          style: {
            height: "100vh",
            width: "100vw",
            backgroundImage: "url(imagenes/fondoLogin2.jpg)",
            // backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        m(
          "div",
          {
            style: {
              width: "20%",
              height: "20vh",
              paddingBottom: "60px",
            },
          },
          m("img", {
            src: "imagenes/logoRecortado.webp",
            style: { objectFit: "contain", width: "100%", height: "100%" },
          })
        ),
        m(
          "div",
          {
            style: {
              backgroundColor: "rgba(255, 255, 255)",
              padding: "2rem",
              borderRadius: "30px",
              boxShadow: "2px 4px 80px rgba(0, 0, 0, 0.2)",
              width: "50vw",
              maxWidth: "90%",
            },
          },
          m(
            "h2",
            {
              style: {
                textAlign: "center",
                fontFamily: "monospace",
                marginBottom: "1.5rem",
              },
            },
            "Bienvenido a Rebombori"
          ),
          [
            m("form", [
              m(
                "div",
                {
                  style: {
                    marginBottom: "1rem",
                  },
                },
                [
                  m(
                    "label",
                    {
                      style: {
                        display: "block",
                        marginBottom: "0.5rem",
                        marginLeft: "1.5rem",
                        fontWeight: "bold",
                      },
                    },
                    "Usuario"
                  ),
                  m("input", {
                    type: "text",
                    placeholder: "Ingrese su usuario",
                    ariaLabel: "Nombre de usuario para inicio de sesión",
                    style: {
                      width: "100%",
                      padding: "0.5rem",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    },
                  }),
                ]
              ),
              m(
                "div",
                {
                  style: {
                    marginBottom: "1.5rem",
                  },
                },
                [
                  m(
                    "label",
                    {
                      style: {
                        display: "block",
                        marginBottom: "0.5rem",
                        marginLeft: "1.5rem",
                        fontWeight: "bold",
                      },
                    },
                    "Contraseña AÑADIR VISIBLE/INVUISIB"
                  ),
                  m("input", {
                    type: "password",
                    placeholder: "Ingrese su contraseña",
                    ariaLabel: "Contraseña para inicio de sesión",
                    style: {
                      width: "100%",
                      padding: "0.5rem",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    },
                  }),
                ]
              ),
              m(
                "button",
                {
                  type: "submit",
                  ariaLabel: "Boton enviar de inicio de sesión",
                  style: {
                    width: "100%",
                    padding: "0.75rem",
                    backgroundColor: "#000000",
                    color: "white",
                    border: "none",
                    borderRadius: "30px",
                    cursor: "pointer",
                    fontSize: "1rem",
                    transition: "all 0.3s ease",
                  },
                  onfocus: (e) =>
                    (e.target.style.backgroundColor = accentColor),
                  onblur: (e) => (e.target.style.backgroundColor = "#000000"),
                },
                "Continuar"
              ),
            ]),
            m(
              "div",
              {
                style: {
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "12px",
                },
              },
              m("p", "¿Aún no tienes cuenta?"),
              m(
                "a",
                {
                  href: "#",
                  style: {},
                },
                "Regístrate"
              )
            ),
          ]
        )
      ),
    ],
  };
}

///-------------------HEADER------------------///
function HeaderNormal() {
  return {
    view: function () {
      return m(
        "div",
        {
          style: {
            backgroundColor: "#abb1ee",
            width: "100%",
            // height: alturaHeader,
            minHeight: alturaRelativaHeader,
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.5)",
            position: "fixed",
            display: "flex",
            flexWrap: "row",
            justifyContent: "space-between",
          },
        },
        m(
          "div",
          {
            style: {
              display: "flex",
              flexWrap: "row",
              alignItems: "center",
            },
          },
          m("img", {
            src: "img/logoPagina.png",
            alt: "Logo principal",
            style: {
              height: "40px",
              padding: "0 80px",
            },
          }),
          m(
            "div",
            {
              style: {
                width: "100%",
                display: "flex",
                marginLeft: "100px",
                gap: "30px",
              },
            },
            m(
              "a",
              {
                href: "#",
                style: {
                  textDecoration: "none",
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "20px",
                  whiteSpace: "nowrap",
                },
              },
              "Página 1"
            ),
            m(
              "a",
              {
                href: "#",
                style: {
                  textDecoration: "none",
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "20px",
                  whiteSpace: "nowrap",
                },
              },
              "Página 2"
            )
          )
        ),
        m(
          "div",
          {
            style: {
              marginRight: "16px",
              gap: "8px",
              display: "flex",
              flexWrap: "row",
              alignItems: "center",
              justifyContent: "space-between",
            },
          },
          m(
            "a",
            {
              href: "https://www.instagram.com/",
              target: "_blank",
            },
            m("img", {
              src: "img/logoInstagram.svg",
              alt: "Enlace a Instagram",
              title: "Instagram",
              style: {
                height: "40px",
                width: "40px",
              },
            })
          ),
          m(
            "a",
            {
              href: "https://www.facebook.com/",
              target: "_blank",
            },
            m("img", {
              src: "img/logoFacebook.svg",
              alt: "Logo Facebook",
              title: "Facebook",
              style: {
                height: "40px",
                width: "40px",
              },
            })
          ),
          m(
            "a",
            {
              href: "https://www.linkedin.com/",
              target: "_blank",
            },
            m("img", {
              src: "img/logoLinkedin.svg",
              alt: "Logo Linkedin",
              title: "Linkedin",
              style: {
                height: "40px",
                width: "40px",
              },
            })
          )
        )
      );
    },
  };
}

function HeaderBlanco() {
  return {
    view: ({}) => [
      m("div", {
        style: {
          width: "100%",
          height: alturaRelativaHeader,
          "box-sizing": "border-box",
          backgroundColor: "white",
        },
      }),
      "",
    ],
  };
}

function botonModoOscuro() {
  return {
    view: () => {
      return m(
        "button",
        {
          onclick: (e) => {
            modoOscuroOn = !modoOscuroOn;
            localStorage.setItem("modoOscuro", JSON.stringify(modoOscuroOn));
            m.redraw();
          },
          role: "switch",
          ariaLabel: modoOscuroOn
            ? "Activar modo oscuro"
            : "Desactivar modo oscuro",
          ariaChecked: modoOscuroOn,
          ariaLive: "polite",
          style: {
            position: "absolute",
            top: "5vh",
            right: "5vw",
            borderRadius: "50%",
            backgroundColor: "transparent",
            border: "none",
            padding: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "fit-content",
            height: "fit-content",
            cursor: "pointer",
            transition: "all 0.1s ease",
          },
          onfocus: (e) => {
            e.target.style.backgroundColor = backgroundColorButton;
            e.target.style.outline = `2px solid ${accentColor}`;
          },
          onblur: (e) => {
            e.target.style.outline = "none";
            e.target.style.backgroundColor = "transparent";
          },
          onmouseenter: (e) => {
            e.target.style.backgroundColor = backgroundColorButton;
            e.target.style.outline = `2px solid ${accentColor}`;
          },
          onmouseleave: function (e) {
            e.target.style.backgroundColor = "transparent";
            e.target.style.outline = "none";
          },
        },
        m("img", {
          src: modoOscuroOn
            ? "imagenes/modoOscuro.svg"
            : "imagenes/modoOscuroBlanco.svg",
          style: {
            width: "clamp(2rem, 5vw, 4rem)",
            height: "auto",
            aspectRatio: "1/1",
            padding: "0.5rem",
          },
          alt: modoOscuroOn ? "Activar modo oscuro" : "Activar modo claro",
        })
      );
    },
  };
}

///-------------------INICIO-------------------///
function Inicio() {
  let datosBtn = [
    {
      icono: "imagenes/calendario.svg",
      texto: "Calendario",
      iconoModoOscuro: "imagenes/calendarioBlanco.svg",
      alt: "",
      title: "",
      slug: "/Calendario",
    },
    {
      icono: "imagenes/galeria.svg",
      texto: "Galería",
      iconoModoOscuro: "imagenes/galeriaBlanco.svg",
      alt: "",
      title: "",
      slug: "/Calendario",
    },
    {
      icono: "imagenes/buzon.svg",
      texto: "Buzón de sugerencias",
      iconoModoOscuro: "imagenes/buzonBlanco.svg",
      alt: "",
      title: "",
      slug: "/Calendario",
    },
    {
      icono: "imagenes/anuncios.svg",
      texto: "Tablón de anuncios",
      iconoModoOscuro: "imagenes/anunciosBlanco.svg",
      alt: "",
      title: "",
      slug: "/Calendario",
    },
  ];
  return {
    view: () => {
      return (
        (document.body.style.backgroundColor = modoOscuroOn
          ? "white"
          : blackColor),
        [
          m(
            "div",
            {
              style: {
                postion: "relative",
                backgroundColor: "transparent",
                height: "100vh",
                width: "100vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              },
            },
            m(
              "p",
              {
                style: {
                  fontSize: "3em",
                  margin: "10vh 0 0 0",
                  textAlign: "center",
                  color: modoOscuroOn ? "black" : "white",
                },
              },
              "Bienvenido Usuario!"
            ),
            m(botonModoOscuro),
            m(
              "main",
              {
                style: {
                  width: "60vw",
                  height: "70vh",
                  marginTop: "5vh",
                  padding: "15px",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "20px",
                  marginBottom: "5vh",
                  boxSizing: "border-box",
                  justifyContent: "center",
                },
              },
              datosBtn.map((btn) =>
                m(
                  "button",
                  {
                    style: {
                      backgroundColor: backgroundColorButton,
                      minWidth: "250px",
                      minHeight: "220px",
                      flex: "1 0 calc(50% - 10px)",
                      height: "calc(50% - 5px)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: fontSizeh2,
                      padding: "10px",
                      border: `2px solid 
                        ${modoOscuroOn ? "transparent" : accentColor}`,
                      borderRadius: "30px",
                      cursor: "pointer",
                      boxSizing: "border-box",
                      transform: "scale(1)",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
                      gap: "20px",
                    },
                    onfocus: (e) => {
                      (e.target.style.backgroundColor = accentColor),
                        (e.target.style.outline = "none"),
                        animateSpring(e.target, "scale", 1.05, 1, {
                          stiffness: 1020,
                          damping: 10,
                          mass: 1.5,
                          threshold: 0.01,
                        });
                    },
                    onblur: (e) => (
                      (e.target.style.backgroundColor = backgroundColorButton),
                      (e.target.style.transform = "scale(1)")
                    ),
                    onmouseenter: (e) => {
                      e.target.style.backgroundColor = accentColor;
                      animateSpring(e.target, "scale", 1.05, 1, {
                        stiffness: 1020,
                        damping: 10,
                        mass: 1.5,
                        threshold: 0.01,
                      });
                    },
                    onmouseleave: function (e) {
                      (e.target.style.backgroundColor = backgroundColorButton),
                        (e.target.style.transform = "scale(1)");
                    },
                    onclick: function () {
                      m.route.set(btn.slug);
                    },
                  },
                  m(
                    "span",
                    {
                      style: {
                        width: "50%",
                        height: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      },
                    },
                    m("img", {
                      src: modoOscuroOn ? btn.icono : btn.iconoModoOscuro,
                      alt: "Ir a " + btn.texto,
                      style: {
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      },
                    })
                  ),
                  m(
                    "span",
                    {
                      style: {
                        fontSize: fontSizeh1,
                        color: modoOscuroOn ? "black" : "white",
                      },
                    },
                    btn.texto
                  )
                )
              )
            )
          ),
        ]
      );
    },
  };
}

///-------------------CALENDARIO-------------------///
function formatearFecha(fechaStr) {
  // Convertir la cadena a objeto Date
  const fecha = new Date(fechaStr);

  // Arrays para traducir días de la semana y meses al español
  const dias = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  // Obtener el nombre del día, día del mes y el nombre del mes
  const diaSemana = dias[fecha.getDay()];
  const dia = fecha.getDate();
  const mes = meses[fecha.getMonth()];

  // Obtener la hora y minutos, agregando el 0 a la izquierda si es necesario
  let horas = fecha.getHours();
  let minutos = fecha.getMinutes();
  horas = horas < 10 ? "0" + horas : horas;
  minutos = minutos < 10 ? "0" + minutos : minutos;

  // Formatear la cadena final
  return `${diaSemana} ${dia} de ${mes} a las ${horas}:${minutos}`;
}

async function getEventos() {
  const response = await fetch("http://localhost:3000/calendario");
  const events = await response.json();
  console.log(events);
  return events;
}

function Calendario() {
  let calendar;
  return {
    oncreate: async () => {
      const calendarEl = document.getElementById("calendar");
      if (calendarEl) {
        calendar = new FullCalendar.Calendar(calendarEl, {
          locale: "es",
          firstDay: 1,
          initialView: "dayGridMonth",
          contentHeight: "auto",
          aspectRatio: 1.5,
          buttonText: {
            today: "Hoy",
          },
          headerToolbar: { left: "", center: "title", right: "" },
          footerToolbar: { left: "today", center: "", right: "prev,next" },
          events: await getEventos(),
          eventClick: (info) =>
            console.log(
              `Evento: ${info.event.title}\nFecha: ${formatearFecha(
                info.event.start
              )}`
            ),
          dateClick: (info) => {
            const title = prompt("Nuevo evento:");
            if (title) calendar.addEvent({ title, start: info.dateStr });
          },
        });
        calendar.render();
      }
    },
    onremove: () => {
      if (calendar) calendar.destroy();
    },

    view: () => {
      document.body.style.backgroundColor = modoOscuroOn ? "white" : blackColor;
      return [
        m(botonModoOscuro),
        m(
          "div",
          {
            style: {
              height: "100vh",
              width: "100vw",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: modoOscuroOn ? "black" : "white",
            },
          },
          m("h1", { style: { marginBottom: "48px" } }, "Calendario"),
          m("div", {
            id: "calendar",
            style: {
              margin: "0 2vw",
            },
          })
        ),
      ];
    },
  };
}

///-------------------BUZON-------------------///
function BuzonDeSugerencias() {
  return {
    view: () => {
      return [
        (document.body.style.backgroundColor = modoOscuroOn
          ? "white"
          : blackColor),
        m(botonModoOscuro),
        m(
          "h1",
          {
            style: {
              position: "absolute",
              top: "20vh",
              color: modoOscuroOn ? "black" : "white",
              fontFamily: "monospace",
              textAlign: "center",
            },
          },
          [
            "Buzón de sugerencias",
            m(
              "h2",
              {
                style: { textAlign: "left" },
              },
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            ),
          ]
        ),

        m(
          "div",
          {
            style: {
              width: "70vw",
              display: "flex",
              margin: "0px 3vh",
              flexDirection: "column",
            },
          },
          m(
            "form",
            {
              style: {
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
              },
            },
            [
              //-------Titulo---------
              m(
                "label",
                {
                  for: "titulo",
                  style: {
                    color: modoOscuroOn ? "black" : "white",
                    fontFamily: "monospace",
                    margin: "10px",
                    fontSize: fontSizeh3,
                  },
                },
                "Escribe aquí un nombre para tu actividad: "
              ),
              m("input", {
                type: "text",
                placeholder: "Ej. Día de cine",
                style: {
                  fontFamily: "monospace",
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "30px",
                  border: "1px solid #ccc",
                },
              }),

              //-------Ubicacion---------
              m(
                "label",
                {
                  for: "ubicacion",
                  style: {
                    color: modoOscuroOn ? "black" : "white",
                    fontFamily: "monospace",
                    margin: "10px",
                    fontSize: fontSizeh3,
                  },
                },
                "Escribe aquí la ubicación de tu actividad: "
              ),
              m("input", {
                type: "text",
                placeholder:
                  "Calle Guillem de Castro, 42, 46007, Valencia, Valencia",
                style: {
                  fontFamily: "monospace",
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "30px",
                  border: "1px solid #ccc",
                },
              }),

              //-------Fecha---------
              m(
                "label",
                {
                  for: "fecha",
                  style: {
                    color: modoOscuroOn ? "black" : "white",
                    fontFamily: "monospace",
                    margin: "10px",
                    fontSize: fontSizeh3,
                  },
                },
                "Escribe aquí la fecha (formato día/mes/año)"
              ),
              m("input", {
                id: "fecha",
                type: "date",
                placeholder: "Ej: 01/01/2000",
                style: {
                  fontFamily: "monospace",
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "30px",
                  border: "1px solid #ccc",
                },
              }),

              //-------Descripción---------
              m(
                "label",
                {
                  for: "descripcion",
                  style: {
                    color: modoOscuroOn ? "black" : "white",
                    fontFamily: "monospace",
                    margin: "10px",
                    fontSize: fontSizeh3,
                  },
                },
                "Describe aquí tu actividad: "
              ),
              m("textarea", {
                name: "descripcion",
                id: "descripcion",
                style: {
                  width: "100%",
                  fontFamily: "monospace",
                  padding: "0.5rem",
                  borderRadius: "30px",
                  border: "1px solid #ccc",
                },
              }),
            ]
          )
        ),
      ];
    },
  };
}

export { BuzonDeSugerencias, Inicio, Calendario };
