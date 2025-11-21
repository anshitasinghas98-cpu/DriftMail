# DriftMail

DriftMail is a simple full-stack project that allows users to create profiles and set up custom email rules.  
It uses a Node.js backend with JWT authentication and a React + Vite frontend.  
The goal of the project is to automate email-based actions through user-defined conditions.

---

## What DriftMail Actually Does

DriftMail works as an **AI-based email tracker and notification system**.  
Instead of only showing normal email pop-ups, it helps you manage your inbox more intelligently.

The system can:

- Remind you periodically if you haven’t checked or replied to a particular email  
- Alert you on time about important unread messages  
- Auto-delete emails if required  
- Track messages based on conditions (sender, subject, keywords, unread status, etc.)  
- Send notifications not only within the app, but also through **WhatsApp and Telegram**, making it more powerful than traditional email notifications

In short, DriftMail is designed to keep you updated and organized without manually checking your inbox again and again.

---

## Features

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
- AI-style email tracking and reminder system  
- WhatsApp and Telegram alert integration  
- Simple React frontend for interacting with the system

---

## Project Structure

Backend/ → Node.js API (controllers, routes, auth, Google OAuth)
Frontend/ → React + Vite user interface
