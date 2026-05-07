const envoltura = document.querySelector(".envoltura-sobre");
const carta = document.querySelector(".carta");

document.addEventListener("click", (e) => {
    const clickEnSobre =
        e.target.matches(".sobre") ||
        e.target.matches(".solapa-derecha") ||
        e.target.matches(".solapa-izquierda") ||
        e.target.matches(".corazon");

    const clickDentroDelSobre = e.target.matches(".envoltura-sobre *");

    if (clickEnSobre) {
        // Abre/cierra el sobre
        envoltura.classList.toggle("abierto");

    } else if (clickDentroDelSobre) {
        if (!carta.classList.contains("abierta")) {
            // Sube la carta con animación
            carta.classList.add("mostrar-carta");
            envoltura.classList.add("desactivar-sobre");

            setTimeout(() => {
                carta.classList.remove("mostrar-carta");
                carta.classList.add("abierta");
            }, 500);

        } else {
            // Baja la carta de vuelta
            carta.classList.add("cerrando-carta");
            envoltura.classList.remove("desactivar-sobre");

            setTimeout(() => {
                carta.classList.remove("cerrando-carta");
                carta.classList.remove("abierta");
            }, 500);
        }
    }
});