@echo off

rem Build frontend
cd frontend
npm install
npm run build
cd ..

rem Install dependencies and build backend

npm install
npm run build

