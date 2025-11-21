DriftMail

DriftMail is a simple full-stack project that allows users to create profiles and set up custom email rules.  
It uses a Node.js backend with JWT authentication and a React + Vite frontend.  
The goal of the project is to automate email-based actions through user-defined conditions.

---

 Features

- User registration and login  
- JWT-based authentication  
- Multiple profiles for each user  
- Create, edit, and delete rules for each profile  
- Rule conditions:
  - sender address  
  - cc / bcc  
  - subject keywords  
  - body keywords  
  - unread-only filter  
  - optional delay  
- Google OAuth client for Gmail actions  
- Simple React frontend for interacting with the system

---

Project Structure
Backend/ → Node.js API (controllers, routes, auth, Google OAuth)
Frontend/ → React + Vite user interface



