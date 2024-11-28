document.addEventListener('DOMContentLoaded', () => {
    const userTable = document.getElementById('userTable');
    const preloader = document.getElementById('preloader');
    const apiUrl = 'https://jsonplaceholder.typicode.com/users'; // URL с данными фиктивными

    const fetchUsers = async (filter) => {
        try {
            preloader.classList.add('active');
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Ошибка сети');
            const users = await response.json();
            await new Promise(resolve => setTimeout(resolve, 1000));

            const filteredUsers = filter(users);

            renderUsers(filteredUsers);
        } catch (error) {
            renderError(error.message);
        } finally {
            preloader.classList.remove('active'); // Скрываем preloader
        }
    };

    const renderUsers = (users) => {
        userTable.innerHTML = `
            <div class="header">Имя</div>
            <div class="header">Email</div>
            <div class="header">Телефон</div>
            <div class="header">Сайт</div>
        `;

        users.forEach(user => {
            userTable.innerHTML += `
                <div class="cell">${user.name}</div>
                <div class="cell">${user.email}</div>
                <div class="cell">${user.phone}</div>
                <div class="cell"><a href="http://${user.website}" target="_blank">${user.website}</a></div>
            `;
        });
    };
    const renderError = (message) => {
        userTable.innerHTML = `<p style="color: red;">Ошибка ${message}</p>`;
    };

    const filterUsers = (users) => {
        const random = Math.random();
        if (random > 0.5) {
            return users.filter(user => user.id >= 5);
        } else {
            return users.filter(user => user.id <= 5);
        }
    };
    fetchUsers(filterUsers);
});