# Todo App Deployment Guide


This guide will walk you through the deployment process for the Todo App, including setting up the backend with Render and deploying the frontend with Netlify.

## a) Backend Deployment on Render

### 1. Create Database on Render

1. Log in to your Render account.
2. Create a new PostgreSQL database named `todo_db`.
3. Copy the database connection URL provided by Render. (use External URL)

### 2. Configure the Flask Application

1. In your Flask application, update the `app.config["SQLALCHEMY_DATABASE_URI"]` with the connection URL:

    ```python
    app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://todo_db_y0kz_user:DWYR4hmfKMXuebwU0gyIrv09AGhWNzSl@dpg-cqio0bogph6c738sehh0-a.oregon-postgres.render.com/todo_db_y0kz"
    ```

2. Install the necessary dependencies:

    ```bash
    pipenv install psycopg2-binary
    pipenv install python-dotenv
    ```

3. Run database migrations:

    ```bash
    flask db upgrade head
    ```

4. Create a `.env` file and add the database password as a variable:

    ```env
    POSTGRES_PWD=DWYR4hmfKMXuebwU0gyIrv09AGhWNzSl@dpg-cqio0bogph6c738sehh0-a.oregon-postgres.render.com/todo
    ```

5. Update your `app.py` to load environment variables:

    ```python
    from dotenv import load_dotenv
    import os

    load_dotenv()  # take environment variables from .env
    postgres_pwd = os.getenv("POSTGRES_PWD")  

    app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql://todo_db_y0kz_user:{postgres_pwd}"
    ```

### 3. Prepare for Deployment

1. Install `gunicorn` to serve your Flask app:

    ```bash
    pipenv install gunicorn
    ```

2. Test your app locally with `gunicorn`:

    ```bash
    gunicorn app:app
    ```

3. Create a `requirements.txt` file:

    ```bash
    pip freeze > requirements.txt
    ```

### 4. Deploy to Render

1. Push your code to GitHub.
2. Create a new web service on Render, connecting it to your GitHub repository.
3. Set the start command to:

    ```bash
    gunicorn app:app
    ```

4. In the Render dashboard, go to the "Environment" tab and add the following environment variable:

    ```plaintext
    POSTGRES_PWD=DWYR4hmfKMXuebwU0gyIrv09AGhWNzSl@dpg-cqio0bogph6c738sehh0-a.oregon-postgres.render.com/todo
    ```
#### Deploying to render from github account
 ![Render Deployment](../assets/render.png)


## b) Frontend Deployment on Netlify

### 1. Update Configuration

1. In your frontend code, update the `config.json` file with the server URL provided by Render:

    ```json
    {
        "server_url": "https://todoapp-fst3.onrender.com"
    }
    ```

### 2. Build and Deploy

1. Run the build command to create the `dist` folder:

    ```bash
    npm run build
    ```

2. Log in to your Netlify account.
3. Create a new site on Netlify.
4. Drag and drop the contents of the `dist` folder into the Netlify drop zone.

## Conclusion

Your Todo App should now be successfully deployed with the backend on Render and the frontend on Netlify. If you encounter any issues, refer to the documentation of the respective services or seek help from their support channels.
