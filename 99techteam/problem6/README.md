# Scoreboard Update Module Specification

This document describes the backend module that will handle the live update of the scoreboard and the authorization of user actions that result in score changes. This module is designed to integrate with the existing API service and ensure that user scores are updated securely and in real-time.

## Overview

The module serves the following purposes:

- **Score Update**: Receives requests to update user scores.
- **Live Scoreboard Update**: Ensures that the top 10 users’ scores are updated in real-time.
- **Authorization**: Verifies that each score update request is legitimate and authorized, preventing malicious score manipulation.

## Requirements

### 1. Live Update of the Scoreboard

- The application must maintain a leaderboard that shows the top 10 users with the highest scores.
- This leaderboard should be dynamically updated as users complete actions that modify their scores.

### 2. Action-Triggered Score Update

- A user action triggers a score increase. This action will dispatch an API request to the backend with the user’s identifier and the score increase amount.

### 3. Prevention of Unauthorized Score Updates

- The system must authenticate and authorize the user to ensure that score increases are legitimate.
- A mechanism (e.g., JWT tokens) must be used to verify the user’s identity before updating their score.

### 4. Security

- The system should validate the request to ensure the score change is authorized and prevent malicious or fraudulent attempts to increase a user's score.

### 5. Efficient Update Mechanism

- To ensure fast and real-time updates, the system must efficiently update the scoreboard and notify connected clients of any changes.

## API Endpoints

### 1. POST /api/update-score

**Description**: This endpoint handles the score update requests sent after the user performs an action.

#### Request Body:

```json
{
  "user_id": "string",
  "score_increase": "number",
  "action_id": "string"
}
```

#### Response

```json
{
  "status": "success",
  "message": "Score updated successfully"
}
```

#### Error Response

```json
{
  "status": "error",
  "message": "Unauthorized action"
}
```

## Validation

- **JWT Token**: Every request should include a valid JWT token for authentication.
- **Rate Limiting**: To prevent abuse, the number of requests per user should be limited.
- **Action Validity**: Verify that the action is authorized and corresponds to an actual user action.

### 2. GET /api/leaderboard

**Description**: This endpoint fetches the current top 10 scores.

```json
{
  "leaderboard": [
    { "user_id": "user1", "score": 5000 },
    { "user_id": "user2", "score": 4800 },
    ...
  ]
}
```

# Score Update System Execution Flow

## 1. User Action Initiation

- A user performs an action that triggers a score increase.

## 2. API Request

- The action sends a POST request to `/api/update-score` with:
  - User’s ID
  - The score increase
  - Action ID

## 3. Authorization & Validation

- The server validates the request using the JWT token to verify the user's identity.
- The server also checks that the action is authorized (e.g., the user can only increase their own score).

## 4. Score Update

- If authorized, the server updates the user’s score in the database.

## 5. Leaderboard Update

- The top 10 users' scores are recalculated, and the leaderboard is updated.
- A message is broadcasted to the clients with the updated leaderboard (via WebSockets or similar technology).

## 6. Response

- The client receives:
  - A success response if the score update is successful.
  - An error message if the action is unauthorized.

# Flow Diagram (Illustration)

```python
import matplotlib.pyplot as plt
import networkx as nx

# Create the diagram for the score update flow
G = nx.DiGraph()

# Add nodes
G.add_node("User Action")
G.add_node("API Request to /api/update-score")
G.add_node("Authorization & Validation")
G.add_node("Score Update")
G.add_node("Leaderboard Update")
G.add_node("WebSocket Broadcast to Clients")
G.add_node("Success/Error Response")

# Add edges
G.add_edge("User Action", "API Request to /api/update-score")
G.add_edge("API Request to /api/update-score", "Authorization & Validation")
G.add_edge("Authorization & Validation", "Score Update")
G.add_edge("Score Update", "Leaderboard Update")
G.add_edge("Leaderboard Update", "WebSocket Broadcast to Clients")
G.add_edge("WebSocket Broadcast to Clients", "Success/Error Response")

# Set positions for nodes to make it look like a flow diagram
pos = {
    "User Action": (0, 6),
    "API Request to /api/update-score": (1, 5),
    "Authorization & Validation": (2, 4),
    "Score Update": (3, 3),
    "Leaderboard Update": (4, 2),
    "WebSocket Broadcast to Clients": (5, 1),
    "Success/Error Response": (6, 0),
}

# Draw the graph
plt.figure(figsize=(10, 6))
nx.draw(G, pos, with_labels=True, node_size=3000, node_color="skyblue", font_size=10, font_weight="bold", arrows=True)
plt.title("Execution Flow for Score Update System")
plt.show()
```

Here's the diagram illustrating the execution flow of the score update system. It shows the sequence from the user action, through API requests, authorization, score updates, leaderboard changes, and broadcasting updates to clients via WebSockets.

# Additional Comments for Improvement

## Caching for Performance

To ensure that the scoreboard is responsive, caching mechanisms like Redis can be implemented. This allows for faster retrieval of the leaderboard data without querying the database each time.

## WebSocket Integration

For live updates, WebSocket or Server-Sent Events (SSE) can be used to push updates to the client immediately after the leaderboard is modified.

## Rate Limiting

To prevent abuse, it is essential to implement rate-limiting strategies (e.g., using Redis) to ensure that users cannot make excessive requests in a short time.

## Security Enhancements

### IP Throttling

In addition to user rate-limiting, it is a good practice to monitor request frequency based on IP addresses to prevent abuse.

### Input Sanitization

Ensure that all inputs are sanitized to prevent SQL injection or other types of attacks.

### JWT Expiration

Make sure JWT tokens have a short expiration time and implement refresh tokens to maintain security.
