# Mini Coding Editor

This is a simple Flask-based online Python editor with execution.

## Features

- Enter Python code in the browser.
- Runs code in a temporary file and shows output.
- Timeout and error capture.

## Deployment

### Locally with Docker

1. Build the image:
   ```
   docker build -t mini-editor .
   ```
2. Run the container:
   ```
   docker run -p 5000:5000 mini-editor
   ```
3. Open http://localhost:5000 in your browser.

### Deploy to Render

1. Create a new Web Service on Render.
2. Connect your GitHub repo containing this project.
3. Use Docker as the environment.
4. Deploy—Render will build from the Dockerfile.

