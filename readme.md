# qp-assessment
Node.js app for managing groceries: admins add/update/remove items, users view/order.


```markdown
# qp-assessment

This repository contains the code for the QP assessment task, including a Node.js application for managing grocery items and a Dockerfile for containerizing the application.

## Getting Started

These instructions will help you set up and run the application locally using Docker.

### Prerequisites

- Docker: [Installation Guide](https://docs.docker.com/get-docker/)


```
   

### Installing

1. Clone the repository:
   ```bash
   git clone https://github.com/hackzbhavin/qp-assessment.git
   ```

3. Navigate to the project directory:
     ```bash
   cd qp-assessment
   ```
   

### Building the Docker Image

To build the Docker image, run the following command:

```bash
docker build -t qp-assessment .
```

### Running the Docker Container

Once the Docker image is built, you can run a Docker container from this image:

```bash
docker run -p 3000:3000 qp-assessment
```

The application should now be accessible at http://localhost:3000 in your web browser.

## Usage

- Admin Responsibilities:
  - Add new grocery items to the system
  - View existing grocery items
  - Remove grocery items from the system
  - Update details (e.g., name, price) of existing grocery items
  - Manage inventory levels of grocery items

- User Responsibilities:
  - View the list of available grocery items
  - Ability to book multiple grocery items in a single order

## Important
- See database.sql for the SQL script to create tables and initial data.
  - Create a .env file in the root directory of the project and set the following variables
    ```
     DB_HOST=localhost
     DB_USER=username
     DB_PASSWORD=password
     DB_NAME=database_name
    ```
  - Check important folder -> Includes postman collection of api and database sql file

- Start the application:
   ```
   npm start
   ```

- Logs
  - I also added request_logs.txt for storing logs of api in txt file you can check code in the project
  - src/middleware/requestLoggerMiddleware.ts includes the code its commented you can utilize 

## Additional Information

- Docker Version: 24.0.2
- Node.js Version: Latest LTS
- Database: grocery

## Author

- [Bhavin Patil](https://github.com/hackzbhavin)

## Links
- DOCKER REPO : https://hub.docker.com/r/hackzbhavin/qp-assesment
- GITHUB REPO : https://github.com/hackzbhavin/qp-assessment      


