const zonas = document.querySelectorAll(".zona");
const presentes = document.querySelectorAll(".draggable");
const mensagem = document.getElementById("mensagem");

// Ordem correta dos presentes (IDs)
const ordemCorreta = ["presente-azul", "presente-vermelho", "presente-amarelo", "presente-verde"];

// Variáveis para touchscreen
let draggedElement = null;

// Adicionar eventos de arrastar (mouse e toque)
presentes.forEach((presente) => {
    // Mouse
    presente.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("id", presente.id);
        draggedElement = presente;
    });

    // Touch
    presente.addEventListener("touchstart", (e) => {
        draggedElement = presente;
        e.target.style.transform = "scale(1.1)";
    });

    presente.addEventListener("touchend", (e) => {
        e.target.style.transform = "scale(1)";
    });
});

// Adicionar eventos nas zonas (mouse e toque)
zonas.forEach((zona) => {
    // Mouse
    zona.addEventListener("dragover", (e) => {
        e.preventDefault(); // Permitir o drop
        zona.style.backgroundColor = "rgba(255, 183, 3, 0.3)";
    });

    zona.addEventListener("dragleave", () => {
        zona.style.backgroundColor = "transparent";
    });

    zona.addEventListener("drop", (e) => {
        e.preventDefault();
        const presenteId = e.dataTransfer.getData("id");
        const presente = document.getElementById(presenteId);

        if (zona.children.length === 0) {
            zona.appendChild(presente);
        }
        zona.style.backgroundColor = "transparent";
        verificarOrdem();
    });

    // Touch
    zona.addEventListener("touchmove", (e) => {
        e.preventDefault();
    });

    zona.addEventListener("touchend", () => {
        if (draggedElement && zona.children.length === 0) {
            zona.appendChild(draggedElement);
        }
        zona.style.backgroundColor = "transparent";
        draggedElement = null;
        verificarOrdem();
    });
});

// Verificar se os presentes estão na ordem correta
function verificarOrdem() {
    const ordemAtual = Array.from(zonas).map((zona) => {
        return zona.children[0]?.id || null;
    });

    if (ordemAtual.join() === ordemCorreta.join()) {
        mensagem.textContent = "Parabéns! Você organizou os presentes corretamente!";
        mensagem.style.color = "green";
    } else if (ordemAtual.includes(null)) {
        mensagem.textContent = ""; // Limpa a mensagem se houver zonas vazias
    } else {
        mensagem.textContent = "Ops! A ordem não está correta. Tente novamente.";
        mensagem.style.color = "red";
    }
}
