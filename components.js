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

let modoOscuroOff = JSON.parse(localStorage.getItem("modoOscuro")) || false;

//Inicio "Anchura Breackpoints"
let width = window.innerWidth;
const handleResize = () => {
  width = window.innerWidth;
  m.redraw();
};
window.addEventListener("resize", handleResize);

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
///-------------------HEADER------------------///
function Header() {
  return {
    view: function () {
      const currentRoute = m.route.get();
      const enInicio = currentRoute === "/Inicio";
      return m(
        "header",
        {
          style: {
            width: "100vw",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "2rem 5vw 1rem 5vw",
            boxSizing: "border-box",
          },
        },
        [
          [
            !enInicio
              ? m(botonAtras)
              : m(".elementoInvisible", { style: { visibility: "hidden" } }), //Evita que aparezca el botón de volver al atrás
            !enInicio
              ? m(botonInicio)
              : m(".elementoInvisible", { style: { visibility: "hidden" } }), //Evita que aparezca el botón de volver al inicio
            m(botonModoOscuro),
          ].filter(Boolean),
        ]
      );
    },
  };
}

function botonModoOscuro() {
  return {
    view: () => {
      return m(
        "button",
        {
          role: "switch",
          ariaLabel: modoOscuroOff
            ? "Activar modo oscuro"
            : "Desactivar modo oscuro",
          ariaChecked: modoOscuroOff,
          style: {
            borderRadius: "50%",
            backgroundColor: "transparent",
            border: "none",
            padding: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "clamp(3rem, 6vw, 5rem)",
            height: "clamp(3rem, 6vw, 5rem)",
            cursor: "pointer",
            transition: "all 0.1s ease",
          },
          onclick: () => {
            modoOscuroOff = !modoOscuroOff;
            localStorage.setItem("modoOscuro", JSON.stringify(modoOscuroOff));
            m.redraw();
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
          onmouseleave: (e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.outline = "none";
          },
        },
        m("img", {
          src: modoOscuroOff
            ? "imagenes/luna2.svg"
            : "imagenes/modoOscuroBlanco.svg",
          style: {
            width: "70%",
            height: "70%",
            objectFit: "contain",
          },
          alt: modoOscuroOff ? "Activar modo oscuro" : "Desactivar modo oscuro",
        })
      );
    },
  };
}

function botonInicio() {
  return {
    view: () => {
      return m(
        "button",
        {
          role: "switch",
          ariaLabel: modoOscuroOff
            ? "Activar modo oscuro"
            : "Desactivar modo oscuro",
          ariaChecked: modoOscuroOff,
          style: {
            borderRadius: "50%",
            backgroundColor: "transparent",
            border: "none",
            padding: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "clamp(3rem, 6vw, 5rem)",
            height: "clamp(3rem, 6vw, 5rem)",
            cursor: "pointer",
            alt: "Volver al inicio",
          },
          onclick: () => {
            m.route.set("/Inicio");
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
          onmouseleave: (e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.outline = "none";
          },
        },
        m("img", {
          src: modoOscuroOff
            ? "imagenes/inicio.svg"
            : "imagenes/inicioBlanco.svg",
          style: {
            width: "70%",
            height: "70%",
            objectFit: "contain",
          },
        })
      );
    },
  };
}

function botonAtras() {
  return {
    view: () => {
      return m(
        "button",
        {
          role: "switch",
          ariaLabel: modoOscuroOff
            ? "Activar modo oscuro"
            : "Desactivar modo oscuro",
          ariaChecked: modoOscuroOff,
          style: {
            borderRadius: "50%",
            backgroundColor: "transparent",
            border: "none",
            padding: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "clamp(3rem, 6vw, 5rem)",
            height: "clamp(3rem, 6vw, 5rem)",
            cursor: "pointer",
            alt: "Volver al inicio",
          },
          onclick: () => {
            window.history.back();
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
          onmouseleave: (e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.outline = "none";
          },
        },
        m("img", {
          src: modoOscuroOff
            ? "imagenes/volver.svg"
            : "imagenes/volverBlanco.svg",
          style: {
            width: "70%",
            height: "70%",
            objectFit: "contain",
          },
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
      slug: "",
    },
    {
      icono: "imagenes/buzon.svg",
      texto: "Buzón de sugerencias",
      iconoModoOscuro: "imagenes/buzonBlanco.svg",
      alt: "",
      title: "",
      slug: "/Buzon",
    },
    {
      icono: "imagenes/anuncios.svg",
      texto: "Tablón de anuncios",
      iconoModoOscuro: "imagenes/anunciosBlanco.svg",
      alt: "",
      title: "",
      slug: "/Tablon",
    },
  ];
  return {
    oncreate: () => {
      window.scrollTo(0, 0);
    },
    view: () => {
      return (
        (document.body.style.backgroundColor = modoOscuroOff
          ? "white"
          : blackColor),
        [
          m(Header),
          m(
            "div",
            {
              style: {
                postion: "relative",
                backgroundColor: "transparent",
                width: "100vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              },
            },
            m(
              "h1",
              {
                style: {
                  fontSize: "3em",
                  textAlign: "center",
                  marginBottom: "3vh",
                  color: modoOscuroOff ? "black" : "white",
                },
              },
              "Bienvenido Usuario!"
            ),
            m(
              "main",
              {
                style: {
                  padding: "15px",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "20px",
                  margin: "0 auto",
                  maxWidth: "850px",
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
                      minHeight: "300px",
                      flex: window.innerWidth < 850 ? "0 0 300px" : "0 0 400px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: fontSizeh2,
                      padding: "10px",
                      border: `2px solid 
                        ${modoOscuroOff ? "transparent" : accentColor}`,
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
                      src: modoOscuroOff ? btn.icono : btn.iconoModoOscuro,
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
                        color: modoOscuroOff ? "black" : "white",
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

  const diaSemana = dias[fecha.getDay()];
  const dia = fecha.getDate();
  const mes = meses[fecha.getMonth()];

  let horas = fecha.getHours();
  let minutos = fecha.getMinutes();
  horas = horas < 10 ? "0" + horas : horas;
  minutos = minutos < 10 ? "0" + minutos : minutos;

  // Formatear la cadena final
  return `${diaSemana} ${dia} de ${mes} a las ${horas}:${minutos}`;
}

async function getEventos() {
  try {
    const response = await fetch("http://localhost:3000/calendario");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const events = await response.json();
    console.log("Eventos recibidos:", events);
    return events;
  } catch (error) {
    console.error("Error fetching eventos:", error);
    return [];
  }
}

function Calendario() {
  let calendar;
  return {
    oncreate: async () => {
      window.scrollTo(0, 0);
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
              `Evento: ${info.event.title}\nFecha inicio: ${formatearFecha(
                info.event.start
              )}\nFecha fin: ${formatearFecha(info.event.end)}`
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
      document.body.style.backgroundColor = modoOscuroOff
        ? "white"
        : blackColor;
      return [
        m(Header),
        m(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: modoOscuroOff ? "black" : "white",
            },
          },
          m(
            "h1",
            {
              style: {
                marginBottom: "1.5vh",
                fontSize: "3em",
              },
            },
            "Calendario"
          ),
          m("div", {
            id: "calendar",
            style: {
              margin: "0 2%",
            },
          }),
          m(
            "button",
            {
              style: {
                color: "white",
                marginBottom: "1vh",
                padding: "0.8rem",
                borderRadius: "30px",
                backgroundColor: "#6a131b",
                border: "none",
              },
              onfocus: (e) => {
                e.target.style.backgroundColor = backgroundColorButton;
                e.target.style.outline = `2px solid ${accentColor}`;
                e.target.style.color = modoOscuroOff ? "black" : "white";
                animateSpring(e.target, "scale", 1.05, 1, {
                  stiffness: 1020,
                  damping: 10,
                  mass: 1.5,
                  threshold: 0.01,
                });
              },
              onblur: (e) => {
                e.target.style.outline = "none";
                e.target.style.backgroundColor = "#6a131b";
                e.target.style.color = "white";
              },
              onmouseenter: (e) => {
                e.target.style.backgroundColor = backgroundColorButton;
                e.target.style.outline = `2px solid ${accentColor}`;
                e.target.style.color = modoOscuroOff ? "black" : "white";
                animateSpring(e.target, "scale", 1.05, 1, {
                  stiffness: 900,
                  damping: 8,
                  mass: 1.2,
                  threshold: 0.01,
                });
              },
              onmouseleave: (e) => {
                e.target.style.backgroundColor = "#6a131b";
                e.target.style.outline = "none";
                e.target.style.color = "white";
              },
              onclick: function () {
                m.route.set("/AñadirEvento");
              },
            },
            "Añadir evento"
          )
        ),
      ];
    },
  };
}

function AñadirEvento() {
  return {
    oncreate: () => {
      window.scrollTo(0, 0);
    },
    view: () => {
      document.body.style.backgroundColor = modoOscuroOff
        ? "white"
        : blackColor;
      return [
        m(Header),
        m(
          "h1",
          {
            style: {
              fontSize: "3em",
              color: modoOscuroOff ? "black" : "white",
              fontFamily: "monospace",
              textAlign: "center",
              margin: "20px 0",
            },
          },
          "Añade tu evento"
        ),
        m(
          "div",
          {
            style: {
              width: "90%",
              maxWidth: "800px",
              margin: "0 auto",
              padding: "20px",
              display: "flex",
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
                gap: "15px",
              },
            },
            [
              m(
                "label",
                {
                  for: "Titulo",
                  style: {
                    color: modoOscuroOff ? "black" : "white",
                    fontFamily: "monospace",
                    fontSize: fontSizeh3,
                  },
                },
                "Título"
              ),
              m("input", {
                type: "text",
                placeholder: "Escribe un nombre para tu actividad: ",
                ariaLabel: "Escribe aquí un nombre para tu actividad: ",
                style: {
                  fontFamily: "monospace",
                  width: "100%",
                  padding: "0.8rem",
                  borderRadius: "30px",
                  border: "2px solid #ccc",
                  boxSizing: "border-box",
                },
                onfocus: (e) => {
                  e.target.style.backgroundColor = backgroundColorButton;
                  e.target.style.outline = "none";
                  e.target.style.color = modoOscuroOff ? "black" : "white";
                  e.target.style.border = `2px solid ${accentColor}`;
                },
                onblur: (e) => {
                  e.target.style.backgroundColor = "#FFFFFF";
                  e.target.style.outline = "none";
                  e.target.style.color = "black";
                  e.target.style.border = "2px solid #ccc";
                },
              }),
              m(
                "label",
                {
                  for: "ubicacion",
                  style: {
                    color: modoOscuroOff ? "black" : "white",
                    fontFamily: "monospace",
                    fontSize: fontSizeh3,
                  },
                },
                "Ubicación"
              ),
              m("input", {
                type: "text",
                placeholder: "Escribe donde quieres hacer tu actividad: ",
                ariaLabel: "Escribe aquí la ubicación de tu actividad: ",
                style: {
                  fontFamily: "monospace",
                  width: "100%",
                  padding: "0.8rem",
                  borderRadius: "30px",
                  border: "2px solid #ccc",
                  boxSizing: "border-box",
                },
                onfocus: (e) => {
                  e.target.style.backgroundColor = backgroundColorButton;
                  e.target.style.outline = "none";
                  e.target.style.color = modoOscuroOff ? "black" : "white";
                  e.target.style.border = `2px solid ${accentColor}`;
                },
                onblur: (e) => {
                  e.target.style.backgroundColor = "#FFFFFF";
                  e.target.style.outline = "none";
                  e.target.style.color = "black";
                  e.target.style.border = "2px solid #ccc";
                },
              }),
              m(
                "label",
                {
                  for: "fecha",
                  style: {
                    color: modoOscuroOff ? "black" : "white",
                    fontFamily: "monospace",
                    fontSize: fontSizeh3,
                  },
                },
                "Inicio: "
              ),
              m("input", {
                id: "fecha",
                type: "date",
                ariaLabel:
                  "Escribe aquí la fecha de tu actividad con formato día / número de mes / año",
                style: {
                  fontFamily: "monospace",
                  width: "100%",
                  padding: "0.8rem",
                  borderRadius: "30px",
                  border: "2px solid #ccc",
                  boxSizing: "border-box",
                },
                onfocus: (e) => {
                  e.target.style.backgroundColor = backgroundColorButton;
                  e.target.style.outline = "none";
                  e.target.style.color = modoOscuroOff ? "black" : "white";
                  e.target.style.border = `2px solid ${accentColor}`;
                },
                onblur: (e) => {
                  e.target.style.backgroundColor = "#FFFFFF";
                  e.target.style.outline = "none";
                  e.target.style.color = "black";
                  e.target.style.border = "2px solid #ccc";
                },
              }),
              m(
                "label",
                {
                  for: "fecha",
                  style: {
                    color: modoOscuroOff ? "black" : "white",
                    fontFamily: "monospace",
                    fontSize: fontSizeh3,
                  },
                },
                "Fin: "
              ),
              m("input", {
                id: "fecha",
                type: "date",
                ariaLabel:
                  "Escribe aquí la fecha de tu actividad con formato día / número de mes / año",
                style: {
                  fontFamily: "monospace",
                  width: "100%",
                  padding: "0.8rem",
                  borderRadius: "30px",
                  border: "2px solid #ccc",
                  boxSizing: "border-box",
                },
                onfocus: (e) => {
                  e.target.style.backgroundColor = backgroundColorButton;
                  e.target.style.outline = "none";
                  e.target.style.color = modoOscuroOff ? "black" : "white";
                  e.target.style.border = `2px solid ${accentColor}`;
                },
                onblur: (e) => {
                  e.target.style.backgroundColor = "#FFFFFF";
                  e.target.style.outline = "none";
                  e.target.style.color = "black";
                  e.target.style.border = "2px solid #ccc";
                },
              }),
              m(
                "label",
                {
                  for: "descripcion",
                  style: {
                    color: modoOscuroOff ? "black" : "white",
                    fontFamily: "monospace",
                    fontSize: fontSizeh3,
                  },
                },
                "Descripción"
              ),
              m("textarea", {
                name: "Describe tu actividad: ",
                ariaLabel: "Describe aquí tu actividad",
                id: "descripcion",
                style: {
                  width: "100%",
                  padding: "0.8rem",
                  borderRadius: "30px",
                  border: "2px solid #ccc",
                  boxSizing: "border-box",
                  minHeight: "150px",
                  resize: "vertical",
                },
                onfocus: (e) => {
                  e.target.style.backgroundColor = backgroundColorButton;
                  e.target.style.outline = "none";
                  e.target.style.color = modoOscuroOff ? "black" : "white";
                  e.target.style.border = `2px solid ${accentColor}`;
                },
                onblur: (e) => {
                  e.target.style.backgroundColor = "#FFFFFF";
                  e.target.style.outline = "none";
                  e.target.style.color = "black";
                  e.target.style.border = "2px solid #ccc";
                },
              }),
              m(
                "button",
                {
                  type: "submit",
                  style: {
                    fontSize: fontSizeh3,
                    padding: "0.8rem",
                    borderRadius: "30px",
                    border: "none",
                    backgroundColor: "#6a131b",
                    color: "white",
                    cursor: "pointer",
                    marginTop: "10px",
                  },
                  onfocus: (e) => {
                    e.target.style.backgroundColor = backgroundColorButton;
                    e.target.style.outline = `2px solid ${accentColor}`;
                    e.target.style.color = modoOscuroOff ? "black" : "white";
                    animateSpring(e.target, "scale", 1.05, 1, {
                      stiffness: 1020,
                      damping: 10,
                      mass: 1.5,
                      threshold: 0.01,
                    });
                  },
                  onblur: (e) => {
                    e.target.style.outline = "none";
                    e.target.style.backgroundColor = "#6a131b";
                    e.target.style.color = "white";
                  },
                  onmouseenter: (e) => {
                    e.target.style.backgroundColor = backgroundColorButton;
                    e.target.style.outline = `2px solid ${accentColor}`;
                    e.target.style.color = modoOscuroOff ? "black" : "white";
                    animateSpring(e.target, "scale", 1.05, 1, {
                      stiffness: 900,
                      damping: 8,
                      mass: 1.2,
                      threshold: 0.01,
                    });
                  },
                  onmouseleave: (e) => {
                    e.target.style.backgroundColor = "#6a131b";
                    e.target.style.outline = "none";
                    e.target.style.color = "white";
                  },
                },
                "Enviar sugerencia"
              ),
            ]
          )
        ),
      ];
    },
  };
}

///-------------------BUZON-------------------///
function BuzonDeSugerencias() {
  return {
    oncreate: () => {
      window.scrollTo(0, 0);
    },
    view: () => {
      document.body.style.backgroundColor = modoOscuroOff
        ? "white"
        : blackColor;
      return [
        m(Header),
        m(
          "h1",
          {
            style: {
              fontSize: "3em",
              color: modoOscuroOff ? "black" : "white",
              fontFamily: "monospace",
              textAlign: "center",
              margin: "20px 0",
            },
          },
          "Buzón de sugerencias"
        ),
        m(
          "div",
          {
            style: {
              width: "90%",
              maxWidth: "800px",
              margin: "0 auto",
              padding: "20px",
              display: "flex",
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
                gap: "15px",
              },
            },
            [
              m(
                "label",
                {
                  for: "Titulo",
                  style: {
                    color: modoOscuroOff ? "black" : "white",
                    fontFamily: "monospace",
                    fontSize: fontSizeh3,
                  },
                },
                "Título"
              ),
              m("input", {
                type: "text",
                placeholder: "Escribe un nombre para tu actividad: ",
                ariaLabel: "Escribe aquí un nombre para tu actividad: ",
                style: {
                  fontFamily: "monospace",
                  width: "100%",
                  padding: "0.8rem",
                  borderRadius: "30px",
                  border: "2px solid #ccc",
                  boxSizing: "border-box",
                },
                onfocus: (e) => {
                  e.target.style.backgroundColor = backgroundColorButton;
                  e.target.style.outline = "none";
                  e.target.style.color = modoOscuroOff ? "black" : "white";
                  e.target.style.border = `2px solid ${accentColor}`;
                },
                onblur: (e) => {
                  e.target.style.backgroundColor = "#FFFFFF";
                  e.target.style.outline = "none";
                  e.target.style.color = "black";
                  e.target.style.border = "2px solid #ccc";
                },
              }),
              m(
                "label",
                {
                  for: "ubicacion",
                  style: {
                    color: modoOscuroOff ? "black" : "white",
                    fontFamily: "monospace",
                    fontSize: fontSizeh3,
                  },
                },
                "Ubicación"
              ),
              m("input", {
                type: "text",
                placeholder: "Escribe donde quieres hacer tu actividad: ",
                ariaLabel: "Escribe aquí la ubicación de tu actividad: ",
                style: {
                  fontFamily: "monospace",
                  width: "100%",
                  padding: "0.8rem",
                  borderRadius: "30px",
                  border: "2px solid #ccc",
                  boxSizing: "border-box",
                },
                onfocus: (e) => {
                  e.target.style.backgroundColor = backgroundColorButton;
                  e.target.style.outline = "none";
                  e.target.style.color = modoOscuroOff ? "black" : "white";
                  e.target.style.border = `2px solid ${accentColor}`;
                },
                onblur: (e) => {
                  e.target.style.backgroundColor = "#FFFFFF";
                  e.target.style.outline = "none";
                  e.target.style.color = "black";
                  e.target.style.border = "2px solid #ccc";
                },
              }),
              m(
                "label",
                {
                  for: "fecha",
                  style: {
                    color: modoOscuroOff ? "black" : "white",
                    fontFamily: "monospace",
                    fontSize: fontSizeh3,
                  },
                },
                "Fecha: "
              ),
              m("input", {
                id: "ubicacion",
                type: "date",
                placeholder: "Escribe cuando quieres hacer tu actividad: ",
                ariaLabel:
                  "Escribe aquí la fecha de tu actividad con formato día / número de mes / año",
                style: {
                  fontFamily: "monospace",
                  width: "100%",
                  padding: "0.8rem",
                  borderRadius: "30px",
                  border: "2px solid #ccc",
                  boxSizing: "border-box",
                },
                onfocus: (e) => {
                  e.target.style.backgroundColor = backgroundColorButton;
                  e.target.style.outline = "none";
                  e.target.style.color = modoOscuroOff ? "black" : "white";
                  e.target.style.border = `2px solid ${accentColor}`;
                },
                onblur: (e) => {
                  e.target.style.backgroundColor = "#FFFFFF";
                  e.target.style.outline = "none";
                  e.target.style.color = "black";
                  e.target.style.border = "2px solid #ccc";
                },
              }),
              m(
                "label",
                {
                  for: "descripcion",
                  style: {
                    color: modoOscuroOff ? "black" : "white",
                    fontFamily: "monospace",
                    fontSize: fontSizeh3,
                  },
                },
                "Descripción"
              ),
              m("textarea", {
                name: "Describe tu actividad: ",
                ariaLabel: "Describe aquí tu actividad",
                id: "descripcion",
                style: {
                  width: "100%",
                  padding: "0.8rem",
                  borderRadius: "30px",
                  border: "2px solid #ccc",
                  boxSizing: "border-box",
                  minHeight: "150px",
                  resize: "vertical",
                },
                onfocus: (e) => {
                  e.target.style.backgroundColor = backgroundColorButton;
                  e.target.style.outline = "none";
                  e.target.style.color = modoOscuroOff ? "black" : "white";
                  e.target.style.border = `2px solid ${accentColor}`;
                },
                onblur: (e) => {
                  e.target.style.backgroundColor = "#FFFFFF";
                  e.target.style.outline = "none";
                  e.target.style.color = "black";
                  e.target.style.border = "2px solid #ccc";
                },
              }),
              m(
                "button",
                {
                  type: "submit",
                  style: {
                    fontSize: fontSizeh3,
                    padding: "0.8rem",
                    borderRadius: "30px",
                    border: "none",
                    backgroundColor: "#6a131b",
                    color: "white",
                    cursor: "pointer",
                    marginTop: "10px",
                  },
                  onfocus: (e) => {
                    e.target.style.backgroundColor = backgroundColorButton;
                    e.target.style.outline = `2px solid ${accentColor}`;
                    e.target.style.color = modoOscuroOff ? "black" : "white";
                    animateSpring(e.target, "scale", 1.05, 1, {
                      stiffness: 1020,
                      damping: 10,
                      mass: 1.5,
                      threshold: 0.01,
                    });
                  },
                  onblur: (e) => {
                    e.target.style.outline = "none";
                    e.target.style.backgroundColor = "#6a131b";
                    e.target.style.color = "white";
                  },
                  onmouseenter: (e) => {
                    e.target.style.backgroundColor = backgroundColorButton;
                    e.target.style.outline = `2px solid ${accentColor}`;
                    e.target.style.color = modoOscuroOff ? "black" : "white";
                    animateSpring(e.target, "scale", 1.05, 1, {
                      stiffness: 900,
                      damping: 8,
                      mass: 1.2,
                      threshold: 0.01,
                    });
                  },
                  onmouseleave: (e) => {
                    e.target.style.backgroundColor = "#6a131b";
                    e.target.style.outline = "none";
                    e.target.style.color = "white";
                  },
                },
                "Enviar sugerencia"
              ),
            ]
          )
        ),
      ];
    },
  };
}

function TablonDeAnuncios() {
  return {
    oncreate: () => {
      window.scrollTo(0, 0);
    },
    view: () => {
      document.body.style.backgroundColor = modoOscuroOff
        ? "white"
        : blackColor;
      return [m(Header)];
    },
  };
}

export {
  BuzonDeSugerencias,
  Inicio,
  Calendario,
  AñadirEvento,
  TablonDeAnuncios,
};
