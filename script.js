// Seleciona os elementos
const draggables = document.querySelectorAll('.draggable');
const dropzone = document.getElementById('dropzone');

// Adiciona eventos de arrastar aos presentes
draggables.forEach(item => {
    item.addEventListener('dragstart', dragStart);
});

// Adiciona eventos à zona de drop (a árvore)
dropzone.addEventListener('dragover', dragOver);
dropzone.addEventListener('drop', drop);

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
    newImage.style.width = '80px'; // Ajusta o tamanho do presente (ajustável)
    newImage.style.position = 'absolute'; // Permite posicionar na árvore

    // Calcula posição para alinhar os presentes na base da árvore
    const dropzoneRect = dropzone.getBoundingClientRect(); // Pega a posição da árvore
    const offsetX = event.clientX - dropzoneRect.left; // Posição do mouse dentro da árvore
    const baseY = dropzoneRect.height - 80; // Define a base da árvore (ajustável)

    newImage.style.left = `${offsetX - 40}px`; // Ajusta para centralizar o presente
    newImage.style.top = `${baseY}px`; // Posiciona na base da árvore

    dropzone.appendChild(newImage); // Adiciona o presente à árvore
}
