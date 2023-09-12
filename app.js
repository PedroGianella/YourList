// Obtén elementos del DOM
const itemInput = document.getElementById('item');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('list');

// Manejador de clic para el botón "Agregar"
addBtn.addEventListener('click', () => {
    const newItemText = itemInput.value.trim();
    if (newItemText !== '') {
        const newItem = document.createElement('li');
        newItem.textContent = newItemText;
        list.appendChild(newItem);
        itemInput.value = '';

        // Agrega un botón para eliminar el elemento
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.className = 'delete-btn';
        newItem.appendChild(deleteBtn);

        // Manejador de clic para eliminar el elemento
        deleteBtn.addEventListener('click', () => {
            list.removeChild(newItem);
        });

        // Marcar elementos como completados
        newItem.addEventListener('click', () => {
            newItem.classList.toggle('completed');
        });

        // Guardar la lista en el almacenamiento local
        saveListToLocalStorage();
    }
});

// Cargar la lista desde el almacenamiento local al cargar la página
window.addEventListener('load', () => {
    const savedList = localStorage.getItem('yourList');
    if (savedList) {
        list.innerHTML = savedList;
        attachEventListeners();
    }
});

// Adjuntar manejadores de eventos a los elementos cargados
function attachEventListeners() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', () => {
            list.removeChild(button.parentElement);
            saveListToLocalStorage();
        });
    });

    const listItems = document.querySelectorAll('li');
    listItems.forEach((item) => {
        item.addEventListener('click', () => {
            item.classList.toggle('completed');
            saveListToLocalStorage();
        });
    });
}

// Guardar la lista en el almacenamiento local
function saveListToLocalStorage() {
    localStorage.setItem('yourList', list.innerHTML);
}

// Adjuntar manejadores de eventos a elementos ya cargados
attachEventListeners();
