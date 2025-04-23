# Todo List Application with ELK Stack

This is a simple to-do list application built with NestJS, MongoDB, and the ELK Stack for logging and visualization. The application provides a RESTful API for managing tasks with features like pagination and comprehensive logging.

## Architecture

The application consists of the following services:

1. **Backend (NestJS)**: Handles CRUD operations for tasks with pagination support
2. **MongoDB**: Stores task data with persistent volume
3. **Mongo Express**: Web-based MongoDB admin interface
4. **Elasticsearch**: Stores and indexes logs
5. **Kibana**: Visualizes logs and provides analytics
6. **Logstash**: Collects and processes logs

## Why Docker?

Each service is containerized using Docker for the following reasons:

- **Backend**: Ensures consistent runtime environment, easy deployment, and development with hot-reloading
- **MongoDB**: Provides isolated data storage with persistent volumes and automatic initialization
- **Mongo Express**: Offers a convenient web interface for database management
- **Elasticsearch**: Requires specific JVM settings and configuration for optimal performance
- **Kibana**: Needs to be connected to Elasticsearch and configured properly for visualization
- **Logstash**: Requires specific pipeline configuration and dependencies for log processing

## Prerequisites

- Docker
- Docker Compose

This setup does not require your machine to have nodejs installed

## Getting Started

1. Clone the repository:
```bash
git clone git@github.com:mike-prog-lab/todo-tasks-nestjs-elk.git
cd todo-tasks-nestjs-elk
```

2. Initialize the environment
```bash
make init # after running "make clean" make sure to initialize again for further usage.
```

3. Build and start the services:
```bash
make start-dev
```

3. Access the services:
- Backend API: http://localhost:3000
- Kibana Dashboard: http://localhost:5601
- MongoDB: http://localhost:27017
- Mongo Express: http://localhost:8081
- Elasticsearch: http://localhost:9200

## API Endpoints

### Tasks

- `POST /tasks` - Create a new task
  ```json
  {
    "title": "Task title",
    "description": "Task description",
    "completed": false
  }
  ```

- `GET /tasks` - Get all tasks with pagination
  - Query Parameters:
    - `page`: Page number (default: 1)
    - `limit`: Items per page (default: 10)
  - Response:
    ```json
    {
      "items": [...],
      "total": 100,
      "page": 1,
      "limit": 10,
      "totalPages": 10
    }
    ```

- `GET /tasks/:id` - Get a specific task
- `PATCH /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

## Logging and Visualization

The application logs all CRUD operations to Logstash, which forwards them to Elasticsearch. You can visualize these logs in Kibana:

1. Open Kibana at http://localhost:5601
2. Go to "Discover" to view raw logs
3. Create visualizations and dashboards to analyze the data

### Setting up Kibana Dashboard

1. Access Kibana at http://localhost:5601
2. Navigate to "Discover" in the left sidebar
3. Create an index pattern for "logstash-*"
4. Create visualizations:
   - Bar chart showing operations by type (CREATE, UPDATE, DELETE)
   - Line chart showing operations over time
   - Pie chart showing distribution of operations
5. Combine visualizations into a dashboard

### Sample Kibana Dashboard

The dashboard includes:
- Operation statistics over time
- Distribution of CRUD operations
- Task completion status
- Error rate monitoring
- Response time analysis

## Development

For local development:
```bash
make init # if not initialized before
make start-dev
```

Execute into container to perform CLI operations:
```bash
make exec # make sure that "make start-dev" is running
```

The backend service supports hot-reloading when running in development mode.

## Stopping the Services

To stop all services:
```bash
make clean
```
