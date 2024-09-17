# mono-event-websocket

A websocket that recieves and processes events

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/josephanya/mono-event-websocket.git
   cd mono-event-websocket
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## Configuration

1. **Create a `.env` file** in the root of the project directory:
   ```bash
   touch .env
   ```

2. **Add the following environment variable** to the `.env` file:
   ```env
   PORT=8080  # The port on which the server will run
   ```

## Running the Application

1. **Run the application**:
   ```bash
   npm run build
   npm start
   ```

   Alternatively, you can use `nodemon` to automatically restart the server when changes are made:
   ```bash
   npx nodemon app.ts
   ```

## WebSocket Events

The application expects WebSocket clients to send events in the following format:

For interactions

```json
{
  "type": "event.interaction",
  "data": "event data"
}
```
For errors

```json
{
  "type": "event.error",
  "data": "error message"
}
```

- `event.error` events are logged to `errors.txt`.
- `event.interaction` events are logged to `interactions.txt`.


## Access the Application
1. **WebSocket**: Connect to the WebSocket server at `ws://localhost:8080`

2. **HTTP**: Open your browser and access the text files at:
     - `http://localhost:8080/errors.txt`
     - `http://localhost:8080/interactions.txt`