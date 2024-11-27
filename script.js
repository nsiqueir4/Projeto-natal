// Seleciona os elementos
const draggables = document.querySelectorAll('.draggable');
const zonas = document.querySelectorAll('.zona');

// Adiciona eventos de arrastar aos presentes
draggables.forEach(item => {
    item.addEventListener('dragstart', dragStart);
});

// Adiciona eventos às zonas de drop
zonas.forEach(zona => {
    zona.addEventListener('dragover', dragOver);
    zona.addEventListener('drop', drop);
});

function dragStart(event) {
    event.dataTransfer.setData('text', event.target.src); // Armazena a referência da imagem
}

function dragOver(event) {
    event.preventDefault(); // Permite o drop
}

function drop(event) {
    event.preventDefault();

    const imageSrc = event.dataTransfer.getData('text'); // Obtém a referência da imagem
    const newImage = document.createElement('img'); // Cria um novo elemento de imagem
    newImage.src = imageSrc;
    newImage.style.width = '100px'; // Ajusta o tamanho do presente

    // Remove qualquer presente existente na zona antes de adicionar o novo
    event.target.innerHTML = '';
    event.target.appendChild(newImage); // Adiciona o presente na zona
}
