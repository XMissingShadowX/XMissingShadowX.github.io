const envoltura = document.querySelector(".envoltura-sobre");
const carta = document.querySelector(".carta");

// Typewriter: revela el HTML de la carta caracter por caracter
function typewriter(elemento, velocidad = 30) {
    const htmlCompleto = elemento.innerHTML;
    const tokens = htmlCompleto.match(/<[^>]+>|[^<]+/g) || [];

    elemento.innerHTML = '';
    let tokenIndex = 0;
    let charIndex = 0;
    let acumulado = '';
    let textoToken = '';

    function siguiente() {
        if (tokenIndex >= tokens.length) {
            elemento.innerHTML = elemento.innerHTML.replace(/▍$/, '');
            return;
        }

        const token = tokens[tokenIndex];

        if (token.startsWith('<')) {
            acumulado += token;
            elemento.innerHTML = acumulado + textoToken + '▍';
            tokenIndex++;
            setTimeout(siguiente, 0);
        } else {
            if (charIndex < token.length) {
                textoToken += token[charIndex];
                elemento.innerHTML = acumulado + textoToken + '▍';
                charIndex++;
                setTimeout(siguiente, velocidad);
            } else {
                acumulado += textoToken;
                textoToken = '';
                charIndex = 0;
                tokenIndex++;
                setTimeout(siguiente, 0);
            }
        }
    }

    siguiente();
}

let typewriterYaEjecutado = false;

document.addEventListener("click", (e) => {
    const clickEnSobre =
        e.target.matches(".sobre") ||
        e.target.matches(".solapa-derecha") ||
        e.target.matches(".solapa-izquierda") ||
        e.target.matches(".corazon");

    const clickDentroDelSobre = e.target.matches(".envoltura-sobre *");

    if (clickEnSobre) {
        envoltura.classList.toggle("abierto");

    } else if (clickDentroDelSobre) {
        if (!carta.classList.contains("abierta")) {
            carta.classList.add("mostrar-carta");
            envoltura.classList.add("desactivar-sobre");

            setTimeout(() => {
                carta.classList.remove("mostrar-carta");
                carta.classList.add("abierta");

                // Inicia typewriter solo la primera vez que se abre
                if (!typewriterYaEjecutado) {
                    typewriterYaEjecutado = true;
                    const contenido = document.querySelector(".contenido");
                    setTimeout(() => typewriter(contenido, 30), 300);
                }
            }, 500);

        } else {
            carta.classList.add("cerrando-carta");
            envoltura.classList.remove("desactivar-sobre");

            setTimeout(() => {
                carta.classList.remove("cerrando-carta");
                carta.classList.remove("abierta");
            }, 500);
        }
    }
});