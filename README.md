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
    

    FRONTEND:
        From the beginning, decided to use Angular due to prior experience in the framework.
        Use of services and interceptors to make token logic and verification easier.   
