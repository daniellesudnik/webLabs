document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('animalForm');
    const tableContainer = document.getElementById('animalTable');
    const animals = JSON.parse(localStorage.getItem('animals')) || [];
    const renderTable = () => {
        if (animals.length === 0) {
            tableContainer.innerHTML = '<p>Пока нет добавленных животных.</p>';
            return;
        }
        let tableHTML = '<table class="grid-table"><thead><tr><th>Имя</th><th>Тип</th><th>Возраст</th><th>Действия</th></tr></thead><tbody>';
        animals.forEach((animal, index) => { //перебеирает каждый обьект animal в массиве animal
            tableHTML += `
                <tr>
                    <td>${animal.name}</td>
                    <td>${animal.type}</td>
                    <td>${animal.age}</td>
                    <td><button class="delete-button" data-index="${index}">Удалить</button></td>
                </tr>`;
        });
        tableHTML += '</tbody></table>';
        tableContainer.innerHTML = tableHTML;
        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                animals.splice(index, 1);
                localStorage.setItem('animals', JSON.stringify(animals));
                renderTable();
            });
        });
    };
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const type = document.getElementById('type').value.trim();
        const age = document.getElementById('age').value.trim();
        if (name && type && !isNaN(age)) {
            animals.push({ name, type, age });
            localStorage.setItem('animals', JSON.stringify(animals));
            renderTable();
            form.reset();
        }
    });
    renderTable();
});