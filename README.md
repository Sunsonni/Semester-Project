# SemesterProject
Sonnie Nguyen #800616531
This is a full stack web application with:
- Angular frontend
- PHP backend
- PostgreSQL database

Prerequisites:
- Docker 
- Docker Compose

Folder Structure:
    project/
    - backend/
    - frontend/
    - db/
    - docker-compose.yml
    - README.md 
Ports:
    Frontend:
        http://localhost:4200
    Backend: 
        http://localhost:8080
        

HOW TO RUN:
1. Initial Setup
To make sure the database initializes cleanly and any other docker processes are down run: 
    docker-compose down -v 
Command to build container:
    docker-compose up --build -d
2. Access the frontend 
    http://localhost:4200 
3. Testing credentials
You can test with these two pre-loaded users:
Administrator user:
    username: admin
    password: admin
Normal user login with API key:
    username: sonnie
    password: sonnie
4. Stopping the project
    docker-compose down

PROCESS:
    DB:
        Initially was using mysql and then switched to postgresql
        TABLES AND RELATIONSHIPS:
            users -> chat_sessions -> chat_messages
            A user is able to have multiple chat sessions which have multiple chat messages.

            users to chat_sessions: One to many
            chat_sessions to chat_messages: One to many
    
    BACKEND: 
        PHP backend with use of google-gemini-php API client for use of gemini api as there is no official php client.
        Honestly would love to have organized it better and finick with some of the parameters for the gemini client to make the user experience better.    

    FRONTEND:
        From the beginning, decided to use Angular due to prior experience in the framework.
        Use of services and interceptors to make token logic and verification easier.
        Would love to do some quality of life changes like automatic closing of dropdown of nav bar and ability for user to edit their chats and delete them.
