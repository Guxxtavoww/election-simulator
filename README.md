Sure, here is an updated README file including the provided environment variables for the server and client:

# Election Simulator App

Welcome to the Election Simulator App! This project is a full-stack application designed to simulate an election process, allowing users to create, manage, and participate in elections. The backend server is built with NestJS, TypeORM, Swagger, and Zod, while the frontend client is developed using Next.js, ShadCN, and server actions.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Running the Server](#running-the-server)
   - [Running the Client](#running-the-client)
4. [Usage](#usage)
5. [API Documentation](#api-documentation)
6. [Contributing](#contributing)
7. [License](#license)

## Features

- Create and manage elections
- Cast votes and view results
- Secure authentication and authorization
- Interactive user interface

## Technologies Used

### Server

- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **TypeORM**: An ORM for TypeScript and JavaScript (ES7, ES6, ES5) that supports many database systems.
- **Swagger**: A tool to visualize and interact with the API’s resources.
- **Zod**: A TypeScript-first schema declaration and validation library.

### Client

- **Next.js**: A React framework for production.
- **ShadCN**: A collection of beautiful and reusable React components.
- **Server Actions**: For handling server-side logic directly in your Next.js application.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL (or any other TypeORM compatible database)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Guxxtavoww/election-simulator.git
   cd election-simulator
   ```

2. Install dependencies for both server and client:
   ```bash
   cd server
   pnpm install
   cd ../client
   pnpm install
   ```

### Running the Server

1. Set up your environment variables. Create a `.env` file in the `server` directory and add the following:

   ```env
   DATABASE_ROOT_PASSWORD="Gge7RzT0%9C"
   DATABASE_DATABASE_NAME="election_simulator-db"
   DB_PORT=5432
   DATABASE_HOST="localhost"
   DB_USER="root"

   JWT_SECRET="h2s9JpUeQpMv3sRw5u8x/A?D(G+KbPeShVmYq3t6w9z$C&F)J@NcRfUjXn2r5u8x"
   JWT_EXPIRES_IN=1d

   PORT=5000
   ENV=dev
   ```

2. Run database migrations:

   ```bash
   npm run typeorm migration:run
   ```

3. Start the server:
   ```bash
   npm run start:dev
   ```

The server should now be running at `http://localhost:5000`.

### Running the Client

1. Set up your environment variables. Create a `.env.local` file in the `client` directory and add the following:

   ```env
   NEXT_PUBLIC_API_BASE_URL="http://localhost:5000/server"
   ```

2. Start the client:
   ```bash
   npm run dev
   ```

The client should now be running at `http://localhost:3000`.

## Usage

1. Open your browser and go to `http://localhost:3000`.
2. Sign up or log in to access the application.
3. Create and manage elections, cast votes, and view results through the interactive interface.

## API Documentation

API documentation is available through Swagger. Once the server is running, navigate to `http://localhost:5000/api` to explore the API endpoints and their usage.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add your feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Thank you for using the Election Simulator App! If you have any questions or need further assistance, feel free to reach out.
