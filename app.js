document.addEventListener('DOMContentLoaded', function () {
    const addBookForm = document.getElementById('addBookForm');
    const bookList = document.getElementById('bookList');

    addBookForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const genre = document.getElementById('genre').value;

        const book = {
            title: title,
            author: author,
            genre: genre,
            read: false // Ajoutez d'autres propriétés si nécessaire
        };

        addBookToList(book);
        saveBookToLocalStorage(book);

        addBookForm.reset();
    });

    function addBookToList(book) {
        const li = document.createElement('li');
        li.textContent = `${book.title} - ${book.author} (${book.genre})`;
        const markAsReadButton = document.createElement('button');
        markAsReadButton.textContent = book.read ? 'Marquer Non Lu' : 'Marquer Lu';
        markAsReadButton.addEventListener('click', function () {
            book.read = !book.read;
            markAsReadButton.textContent = book.read ? 'Marquer Non Lu' : 'Marquer Lu';
            saveBookToLocalStorage(book);
        });
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.addEventListener('click', function () {
            deleteBookFromList(li, book);
        });
        li.appendChild(markAsReadButton);
        li.appendChild(deleteButton);
        bookList.appendChild(li);
    }

    function deleteBookFromList(li, book) {
        bookList.removeChild(li);
        removeBookFromLocalStorage(book);
    }

    function saveBookToLocalStorage(book) {
        let books = JSON.parse(localStorage.getItem('books')) || [];
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    function removeBookFromLocalStorage(book) {
        let books = JSON.parse(localStorage.getItem('books')) || [];
        books = books.filter(b => b.title !== book.title || b.author !== book.author || b.genre !== book.genre);
        localStorage.setItem('books', JSON.stringify(books));
    }

    function loadBooksFromLocalStorage() {
        let books = JSON.parse(localStorage.getItem('books')) || [];
        books.forEach(book => {
            addBookToList(book);
        });
    }

    loadBooksFromLocalStorage();
});