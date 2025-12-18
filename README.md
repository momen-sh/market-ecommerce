# 🛒 Market Clean (E-Commerce)

Full-stack e-commerce web application built with ASP.NET Core Web API and Angular.

## 🧰 Tech Stack
- ASP.NET Core Web API
- Angular
- Entity Framework Core + SQL Server
- JWT Authentication
- Stripe Payments

## ✨ Features
- User authentication (JWT)
- Products listing + search/filter
- Shopping cart (add/remove/update)
- Payment integration using Stripe
- RESTful API + layered services/repositories

## 📁 Project Structure
- `market.backend/` → ASP.NET Core Web API
- `market.frontend/` → Angular App

## ⚙️ Run Locally

### Backend
1. Create `appsettings.Development.json` (not committed) and add your:
   - SQL Server connection string
   - JWT key
   - Stripe keys
2. Run the API (Visual Studio / dotnet run)

### Frontend
```bash
cd market.frontend/my-project-ui
npm install
ng serve

## 🎥 Demo Video
Short demo showcasing the e-commerce application (user flow + admin panel).

▶ Watch: https://drive.google.com/file/d/1r41pGTHeBbciS2WzOVXb3z0VLF3hO9ZY/view?usp=sharing
