# AuroraStream 🚀

AuroraStream is a robust, scalable microservices-based video streaming platform designed to handle high-quality video content delivery using HLS (HTTP Live Streaming). The system is built with Spring Boot, leveraging a distributed architecture for authentication, metadata management, transcoding, and streaming.

## 🏗️ Architecture Overview

AuroraStream follows a microservices architecture where each service handles a specific domain. The services communicate asynchronously via **Amazon SQS & SNS** for long-running tasks like transcoding and use **Eureka** for service discovery.

### 🛰️ Microservices
- **ApiGateway-Aurora**: The entry point for all client requests. It handles routing and JWT-based authentication.
- **Service-Registry**: Eureka server for service discovery and load balancing.
- **User-Service**: Manages user profiles, roles (Admin, Publisher, Viewer, Master Admin), and authentication (JWT, OTP).
- **Metadata-Service**: Manages video metadata (Movies, Series, Episodes, Genres). It triggers transcoding tasks by publishing messages to Amazon SQS.
- **Transcode-Service**: Consumes transcoding tasks from Amazon SQS (`video-transcode-jobs`) and uses **FFmpeg** to convert raw videos into multi-resolution HLS streams (360p, 480p, 720p, 1080p).
- **Streaming-Service**: Serves the HLS playlist files (`.m3u8`) and video segments (`.ts`) to the client.
- **Mail-Service**: Handles transactional emails such as OTP verification and notifications.
- **frontend**: React + Vite client application that acts as the user interface for the streaming platform.

## Frontend Dependencies

| Package           | Version  |
|-------------------|----------|
| @tailwindcss/vite | ^4.1.18  |
| axios             | 1.14.0   |
| lucide-react      | ^0.545.0 |
| react             | ^19.1.1  |
| react-dom         | ^19.1.1  |
| react-hot-toast   | ^2.6.0   |
| react-router-dom  | ^7.9.3   |
| tailwindcss       | ^4.1.18  |

## 🛠️ Tech Stack

- **Backend**: Java 17+, Spring Boot, Spring Cloud (Gateway, Eureka)
- **Frontend**: React 19, Vite, TailwindCSS v4, Axios
- **Databases**:
  - **PostgreSQL**: Shared database (`streaming_db`) with isolated schemas (`user_schema`, `metadata_schema`).
  - **Redis**: Caching OTPs and user sessions for high performance.
- **Messaging**: Amazon SQS & Amazon SNS (LocalStack for local development)
- **Video Processing**: FFmpeg (HLS Transcoding)
- **Security**: Spring Security, JWT
- **Containerization**: Docker, Docker Compose

## 🚀 Getting Started

### Prerequisites
- JDK 17 or higher
- Maven 3.x
- Node.js & npm (for the frontend client)
- Docker and Docker Compose
- **FFmpeg** installed on the host machine (for Transcode-Service)

### 1. Infrastructure Setup
Run the following command to start LocalStack, PostgreSQL, and Redis:
```bash
docker-compose -f docker-compose.yml up -d
```
*Note: Ensure you have MongoDB, MySQL, and Redis running either locally or in containers.*

### 2. Database Configuration
The project uses a shared PostgreSQL database (`streaming_db`) with isolated schemas. The schemas (`user_schema`, `metadata_schema`) are automatically created on startup via the `init.sql` script mounted in the Docker container.

### 3. Environment Variables
Ensure the following environment variables are set in your system or provided in `application.properties`:
- `REDIS_HOST`: Redis host (defaults to localhost).
- `REDIS_USER`: Username for Redis.
- `REDIS_PASSWD`: Password for Redis.
- `POSTGRES_USER`: Username for PostgreSQL.
- `POSTGRES_PASSWD`: Password for PostgreSQL.
- `JWT_SECRET`: Secret key for JWT signing.
- `AURORA_MAIL`: Gmail address for Mail-Service.
- `AURORA_MAIL_PASSWORD`: Gmail App Password for Mail-Service.

### 4. Running the Services
Start the services in the following order:
1. **Service-Registry** (Port: 8761)
2. **ApiGateway-Aurora** (Port: 8080)
3. **User-Service** (Port: 9000)
4. **Metadata-Service** (Port: 9003)
5. **Transcode-Service** (Port: 9007)
6. **Streaming-Service** (Port: 9012)
7. **Mail-Service** (Port: 9015)

### 5. Running the Frontend Client
The frontend user interface is located in the [frontend](file:///home/kushagra/Documents/AuroraStream/frontend) directory. To set it up and run it:
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server (runs on Port 5173 by default):
   ```bash
   npm run dev
   ```


## 🎞️ Video Processing Workflow
1. **Publisher** uploads a video through the `Metadata-Service`.
2. `Metadata-Service` saves the metadata and pushes a job message to the `video-transcode-jobs` SQS queue.
3. `Transcode-Service` receives the message via `@SqsListener` and invokes **FFmpeg** to generate HLS segments.
4. Once transcoding is complete, `Transcode-Service` publishes a completion event to the `video-events` SNS topic.

## 🛡️ Security
The project uses JWT for secure communication.
- **Authentication**: Handled by `User-Service`.
- **Authorization**: API Gateway validates the JWT and routes the request to downstream services.
- **Roles**: `MASTER_ADMIN`, `ADMIN`, `PUBLISHER`, `VIEWER`.

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
