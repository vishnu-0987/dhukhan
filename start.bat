@echo off

rem Start the backend server
cd backend
start node index.js
cd ..

rem Start the frontend server
cd frontend
start npm start
