import { useEffect, useState } from "react";
import axios from "axios";

function Books() {

    const [books, setBooks] = useState([]);

    // Form data
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        isbn: "",
        publisher: "",
        publication_year: "",
        edition: "",
        pages: "",
        language: "",
        total_copies: "",
        available_copies: "",
        category_id: ""
    });

    // Get all books
    const getBooks = async () => {

        try {

           const token = localStorage.getItem("token");


const response = await axios.get(
    "http://localhost:5000/api/books",
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);

           setBooks(response.data);

        } catch (error) {

            console.error("Error fetching books:", error);

        }
    };

    useEffect(() => {

    const token = localStorage.getItem("token");

    axios.get(
        "http://localhost:5000/api/books",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    .then((response) => {

        setBooks(response.data);

    })
    .catch((error) => {

        console.error("Error fetching books:", error);

    });

}, []);
    // Handle input changes
    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Add book
    const handleAddBook = async (e) => {

        e.preventDefault();

        try {

           const token = localStorage.getItem("token");

const response = await axios.post(
    "http://localhost:5000/api/books",
    {
        ...formData,
        publication_year: Number(formData.publication_year),
        pages: Number(formData.pages),
        total_copies: Number(formData.total_copies),
        available_copies: Number(formData.available_copies),
        category_id: Number(formData.category_id)
    },
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);




            alert(response.data.message);

            // Clear form
            setFormData({
                title: "",
                author: "",
                isbn: "",
                publisher: "",
                publication_year: "",
                edition: "",
                pages: "",
                language: "",
                total_copies: "",
                available_copies: "",
                category_id: ""
            });

            // Refresh books table
            getBooks();

        } catch (error) {

            console.error("Add Book Error:", error);

            if (error.response) {

                alert(error.response.data.message);

            } else {

                alert("Server connection failed.");

            }
        }
    };


    // Edit / Update Book
const handleEdit = async (book) => {

    const newTitle = prompt(
        "Enter new title:",
        book.title
    );

    if (!newTitle) {
        return;
    }

    const newAuthor = prompt(
        "Enter new author:",
        book.author
    );

    if (!newAuthor) {
        return;
    }

    try {

        const token = localStorage.getItem("token");

        const response = await axios.put(
            `http://localhost:5000/api/books/${book.book_id}`,
            {
                title: newTitle,
                author: newAuthor,
                isbn: book.isbn,
                publisher: book.publisher,
                publication_year: book.publication_year,
                edition: book.edition,
                pages: book.pages,
                language: book.language,
                total_copies: book.total_copies,
                available_copies: book.available_copies,
                category_id: book.category_id
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        alert(response.data.message);

        // Refresh books table
        getBooks();

    } catch (error) {

        console.error("Update Book Error:", error);

        if (error.response) {

            alert(error.response.data.message);

        } else {

            alert("Server connection failed.");

        }
    }
};

// Delete Book
const handleDelete = async (book) => {

    const confirmDelete = window.confirm(
        `Are you sure you want to delete "${book.title}"?`
    );

    if (!confirmDelete) {
        return;
    }

    try {

        const token = localStorage.getItem("token");

        const response = await axios.delete(
            `http://localhost:5000/api/books/${book.book_id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        alert(response.data.message);

        // Refresh books table
        getBooks();

    } catch (error) {

        console.error("Delete Book Error:", error);

        if (error.response) {
            alert(error.response.data.message);
        } else {
            alert("Server connection failed.");
        }
    }
};
    return (
        <div>

            <h1>📚 Library Books</h1>

            {/* ========================= */}
            {/* Add Book Form */}
            {/* ========================= */}

            <h2>➕ Add New Book</h2>

            <form onSubmit={handleAddBook}>

                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="text"
                    name="author"
                    placeholder="Author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="text"
                    name="isbn"
                    placeholder="ISBN"
                    value={formData.isbn}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="publisher"
                    placeholder="Publisher"
                    value={formData.publisher}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="number"
                    name="publication_year"
                    placeholder="Publication Year"
                    value={formData.publication_year}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="edition"
                    placeholder="Edition"
                    value={formData.edition}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="number"
                    name="pages"
                    placeholder="Pages"
                    value={formData.pages}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="language"
                    placeholder="Language"
                    value={formData.language}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="number"
                    name="total_copies"
                    placeholder="Total Copies"
                    value={formData.total_copies}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="number"
                    name="available_copies"
                    placeholder="Available Copies"
                    value={formData.available_copies}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="number"
                    name="category_id"
                    placeholder="Category ID"
                    value={formData.category_id}
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">
                    ➕ Add Book
                </button>

            </form>

            <hr />




            

            {/* ========================= */}
            {/* Books Table */}
            {/* ========================= */}

            <h2>📖 All Books</h2>

            {books.length === 0 ? (

                <p>No books found.</p>

            ) : (

                <table border="1" cellPadding="10">

                    <thead>

                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>ISBN</th>
                            <th>Total Copies</th>
                            <th>Available Copies</th>

                            
                            <th>Actions</th>
                        </tr>

                    </thead>

                    <tbody>

                        {books.map((book) => (

                            <tr key={book.book_id}>

                                <td>{book.book_id}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.isbn}</td>
                                <td>{book.total_copies}</td>
                                <td>{book.available_copies}</td>

                                <td>
                                 <button onClick={() => handleEdit(book)}>
                                 ✏️ Edit
                                     </button>

                                     <button onClick={() => handleDelete(book)}>
                                       🗑️ Delete
                                     </button>
                                 </td>
                                

                            </tr>

                        ))}

                    </tbody>

                </table>

            )}

        </div>
    );
}

export default Books;