    class Book{
        constructor(title,author,isbn){
            this.title = title;
            this.author = author;
            this.isbn = isbn;
        }
    }

    class Store{
        static getBooks(){
            let books;
            if(localStorage.getItem('books')===null){
                books = []
            }else{
                books = JSON.parse(localStorage.getItem('books'))
            }
            return books;
        }
        static addBook(book){
            let books = Store.getBooks()
            books.push(book);
            localStorage.setItem('books',JSON.stringify(books));
        }
        static removeBook(isbn){
            let books = Store.getBooks();
            books.forEach((book,index)=>{
                if(book.isbn===isbn){
                    books.splice(index,1);
                }
                localStorage.setItem('books',JSON.stringify(books));
            })

        }
    }

    class UI{
        static displayBooks(){
            const books = Store.getBooks();
            books.forEach(book=>UI.addBookToList(book));
        }
        static addBookToList({title,author,isbn}){
            const list = document.getElementById("book-list");
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${title}</td>
            <td>${author}</td>
            <td>${isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;
            list.appendChild(row);
            
        }
        static clearFields(){debugger
            document.querySelector("#title").value='';
            document.querySelector("#author").value='';
            document.querySelector("#isbn").value='';
        }
        static deleteBook(field){
            if(field.classList.contains("delete")){
                field.parentElement.parentElement.remove();
                // UI.StoredBooks.splice()
            }
        }
        static showAlert(message,className){debugger
            const div = document.createElement('div');
            div.className = `alert alert-${className}`;
            div.appendChild(document.createTextNode(message));
            const container = document.querySelector(".container");
            const form = document.querySelector("#book-form");
            container.insertBefore(div,form);
            setTimeout(()=>{document.querySelector(".alert").remove()},3000)
        }
    }
// Event: Display Books
    document.addEventListener("DOMContentLoaded",UI.displayBooks);

// Event: Add a book
    document.getElementById("book-form").addEventListener("submit",(e)=>{
        e.preventDefault()
        const title = document.querySelector("#title").value;
        const author = document.querySelector("#author").value;
        const isbn = document.querySelector("#isbn").value;
        if(title==="" || author==="" || isbn===""){
            UI.showAlert('Please fill all fields to proceed','danger text-center');
        }
        else{debugger
        // Instantiate a book
        const book = new Book(title,author,isbn);
        UI.addBookToList(book);
        Store.addBook(book)  ;
        UI.showAlert('You have successfully added a book','success text-center');
        UI.clearFields();
        }   
    })

// Event: Remove a book
    document.querySelector("#book-list").addEventListener("click",(e)=>{
        UI.deleteBook(e.target);
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
        UI.showAlert('The book has been removed.','success text-center');
    })