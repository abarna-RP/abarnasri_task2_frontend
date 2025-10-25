# 🎓 Student, Group & Assignment Management System (Frontend)

This is the **frontend** part of the Joineazy Full Stack Engineer Intern Task 2 project.  
The app provides a role-based interface for **Students** and **Professors (Admins)** to manage assignments, track submissions, and view progress visually.

---

## 🚀 Live Demo
🔗 **Frontend (Netlify):** [https://incredible-piroshki-d187ed.netlify.app/](https://incredible-piroshki-d187ed.netlify.app/)

---

## 🧩 Tech Stack
- **React.js** (Frontend framework)
- **Tailwind CSS** (UI styling)
- **Axios** (API requests)
- **React Router DOM** (Navigation)
- **JWT Authentication** (via backend)
- **Vite** (Development server)

---

## 🧠 Features

### 🎓 Student Role
- Register and login securely (JWT-based).
- Create and manage groups.
- Add/invite members using student email or ID.
- View all assignments posted by professors.
- Access OneDrive submission links.
- Confirm assignment submissions (two-step verification).
- Track submission progress via visual progress bars.

### 👨‍🏫 Admin (Professor) Role
- Create, edit, and view assignments.
- Assign work to specific students or groups.
- Track submission confirmations group-wise and student-wise.
- View analytics and performance summaries.

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/abarna-RP/abarnasri_task2_frontend.git
cd abarnasri_task2_frontend

# Install dependencies
npm install

# Run the development server
npm run dev
🔐 Environment Variables

Create a .env file in the root folder and add:

VITE_BACKEND_URL=http://localhost:5000


(Replace with your backend deployment URL when hosted.)

🧭 Folder Structure
abarnasri_task2_frontend/
│
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page-level components (Login, Register, Dashboard, etc.)
│   ├── context/          # Auth Context (JWT handling)
│   ├── routes/           # Protected and Public routes
│   ├── App.jsx           # Main App entry
│   └── main.jsx          # React root
│
├── public/
├── package.json
└── tailwind.config.js

🖼️ UI Highlights

Responsive and mobile-friendly with Tailwind CSS.

Simple and clean dashboard for students and professors.

Progress bars for assignment tracking.

🧑‍💻 Author

Name: Abarnasri P
📧 Email: abarnasri3692@gmail.com

🔗 GitHub: @abarna-RP

🏁 License

This project is created for Joineazy Internship Technical Task 2 (2025).


---

## 🟢 **Backend – README.md** (`abarnasri_task2_backend`)

```markdown
# 🧠 Student, Group & Assignment Management System (Backend)

This is the **backend** for the Joineazy Full Stack Engineer Intern Task 2 project.  
It provides secure REST APIs for handling authentication, group and assignment management, and submission tracking.

---

## 🧩 Tech Stack
- **Node.js** + **Express.js**
- **PostgreSQL**
- **Sequelize ORM**
- **JWT Authentication**
- **Docker** (for containerized deployment)
- **CORS / bcrypt / dotenv**

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/abarna-RP/abarnasri_task2_backend.git
cd abarnasri_task2_backend

# Install dependencies
npm install

# Create environment variables file
cp .env.example .env

🧾 .env Example
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/joineazy_db
JWT_SECRET=your_jwt_secret_key

▶️ Run Server
# Run in development mode
npm run dev

# OR build and run
npm start


Server runs on: http://localhost:5000

📚 API Endpoints
Method	Endpoint	Description	Auth
POST	/api/auth/register	Register new user (student/admin)	Public
POST	/api/auth/login	Login and get JWT token	Public
POST	/api/groups	Create new group	Student
POST	/api/groups/add-member	Add member to group	Student
GET	/api/assignments	Get all assignments	Student
POST	/api/assignments	Create assignment	Admin
PUT	/api/assignments/:id	Edit assignment	Admin
POST	/api/submissions/confirm	Confirm group submission	Student
GET	/api/analytics	View progress summary	Admin
🧠 Database Schema (Simplified ER Diagram)
Users (id, name, email, password, role)
Groups (id, name, created_by)
GroupMembers (id, group_id, user_id)
Assignments (id, title, description, due_date, onedrive_link, created_by)
Submissions (id, assignment_id, group_id, is_submitted, confirmed_at)


Relationships:

User → GroupMembers (1:N)

Group → GroupMembers (1:N)

Group → Submissions (1:N)

Assignment → Submissions (1:N)

🧰 Folder Structure
abarnasri_task2_backend/
│
├── src/
│   ├── controllers/     # API logic
│   ├── models/          # Sequelize models
│   ├── routes/          # Express routes
│   ├── middleware/      # Auth middleware
│   ├── config/          # DB config
│   └── app.js           # Main Express app
│
├── package.json
└── server.js

🐳 Docker Support
# Build and run Docker container
docker build -t joineazy-backend .
docker run -p 5000:5000 joineazy-backend

🔐 Authentication Flow

JWT token generated at login.

Token verified for protected routes (student/admin roles separated).

Role-based middleware ensures secure access.

🧑‍💻 Author

Name: Abarnasri P
📧 Email: abarnasri3692@gmail.com

🔗 GitHub: @abarna-RP

🏁 License

This backend is created for Joineazy Internship Technical Task 2 (2025).


---

### ✅ Next steps:
1. Copy respective README content to:
   - `frontend/README.md`
   - `backend/README.md`
2. Commit & push:
   ```bash
   git add README.md
   git commit -m "Added detailed README"
   git push origin main
