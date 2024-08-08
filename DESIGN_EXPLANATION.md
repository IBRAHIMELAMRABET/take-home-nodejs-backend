# Design Explanation for Bitcoin Mining Pools Microservice

Hello 👋,

This document outlines the design and implementation of a microservice built using Node.js and Express.js. The microservice interfaces with the Minerstat API to provide two key functionalities:

1. Retrieve a list of available coins for mining rewards.
2. Search for mining pools with the best rewards for a specific coin.

The microservice is protected by HTTP Bearer Authentication to ensure secure access.

## Design Decisions

### API Endpoints

1. **GET /coins**
   - **Purpose**: Fetch all available coins from the Minerstat API.
   - **Response**: A JSON array containing details about available coins.
   - **Error Handling**: Returns a 500 status code if the API request fails.

2. **GET /pools/:coin**
   - **Purpose**: Fetch the top mining pools for a specified coin from the Minerstat API.
   - **Parameters**: `coin` - The cryptocurrency for which to fetch mining pools.
   - **Response**: A JSON array of mining pools with details. If no pools are found or if the coin is invalid, a message and an empty array are returned.
   - **Error Handling**: Returns a 500 status code if the API request fails.

### Middleware

**Authentication Middleware**:
- **Purpose**: Protects the endpoints with Bearer Authentication.
- **Implementation**: Checks for the presence of a Bearer token in the Authorization header and validates it against a hardcoded token.

### Libraries and Tools

- **Express.js**: Web framework for Node.js to build the REST API.
- **Axios**: HTTP client for making requests to the Minerstat API.
- **Supertest**: Testing library for making HTTP requests and asserting responses.
- **dotenv**: Loads environment variables from a `.env` file.

### Implementation

1. **File Structure**:
   - `index.js`: Main entry file to start the server.
   - `app.js`: Contains API endpoints and middleware configuration.
   - `middlewares/authMiddleware.js`: Authentication middleware.
   - `tests/auth.test.js`: Tests for authentication middleware.
   - `tests/routes.test.js`: Tests for API routes.

2. **Environment Variables**:
   - `MINERSTAT_API_BASE_URL`: Base URL for the Minerstat API.
   - `BEARER_TOKEN`: Token for Bearer Authentication.
   - `PORT`: Port on which the server listens.

3. **Error Handling**:
   - Error handling is implemented to return appropriate status codes and error messages.

## Testing

### Authentication Middleware Tests (`auth.test.js`)

- **Valid Token**: Ensures that the middleware allows requests with a valid Bearer token.
- **No Token**: Verifies that the middleware responds with a 401 status if no token is provided.
- **Invalid Token**: Checks that the middleware responds with a 403 status for invalid tokens.

### API Route Tests (`route.test.js`)

- **GET /coins**:
  - Valid Token: Confirms the endpoint returns a 200 status and a JSON array.
  - Response Structure: Validates that the response body has the correct structure with the expected coin properties.

- **GET /pools/:coin**:
  - Valid Token: Ensures the endpoint returns a 200 status and a JSON array.
  - Response Structure: Validates that the response body contains the expected pool properties.
  - No Pools Found: Checks that the endpoint returns a message and an empty array if no pools are found for the coin.

