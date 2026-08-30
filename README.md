# 📚 LibraryHub

LibraryHub is a full-stack Library Management System designed to manage books, members, borrowing, returning, and library reports.

## ✨ Features

- 🔐 User Login & Authentication
- 📚 Book Management
- 👥 Member Management
- 🔄 Borrow & Return Books
- 📊 Dashboard Statistics
- 📋 Checkout History & Reports
- 🚪 Logout
- 🔒 Protected API Routes

## 🛠️ Technologies Used

### Frontend
- React.js
- React Router
- Axios
- CSS

### Backend
- Node.js
- Express.js
- JWT Authentication

### Database
- MySQL

## 📂 Project Structure

```text
LibraryHub/
│
├── client/
│   └── React Frontend
│
├── server/
│   └── Node.js + Express Backend
│
├── package.json
└── package-lock.json



📖 Main Modules
📚 Books

Manage library books, including adding, updating, and deleting books.

👥 Members

Register and manage library members.

🔄 Borrow & Return

Members can borrow available books and return borrowed books.

📊 Dashboard

Displays:

Total Books
Total Copies
Available Copies
Total Members
Borrowed Books
📋 Reports

Displays complete checkout history with:

Checkout ID
Member
Book
Checkout Date
Due Date
Return Date
Status
▶️ How to Run
1. Clone the repository
git clone https://github.com/Karthickaramalingam/LibraryHub.git

2. Install dependencies
npm install

Then install the client dependencies:

cd client
npm install

3. Start the backend
cd server
npm start

4. Start the frontend
cd client
npm run dev

🔐 Authentication

LibraryHub uses JWT-based authentication to protect API routes and manage logged-in users.

👨‍💻 Author

Karthicka
