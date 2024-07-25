#!/usr/bin/env python3

from app import app, db
from models import User, Todo
from sqlalchemy.exc import IntegrityError
from werkzeug.security import generate_password_hash

# Create a function to seed the database
def seed_database():
    with app.app_context():
        # Clear existing data
        db.drop_all()
        db.create_all()
        print("seeding data...")
        # Sample users
        users = [
            {
                "username": "john_doe",
                "email": "john@example.com",
                "password": "password123",
                "avatar": "http://example.com/avatar1.png"
            },
            {
                "username": "jane_smith",
                "email": "jane@example.com",
                "password": "password123",
                "avatar": "http://example.com/avatar2.png"
            }
        ]

        # Add sample users to the database
        for user_data in users:
            hashed_password = generate_password_hash(user_data["password"])
            user = User(
                username=user_data["username"],
                email=user_data["email"],
                password=hashed_password,
                avatar=user_data["avatar"]
            )
            try:
                db.session.add(user)
                db.session.commit()
            except IntegrityError:
                db.session.rollback()
                print(f"User with email {user_data['email']} already exists")

        # Sample todos
        todos = [
            {
                "title": "Buy groceries",
                "completed": False,
                "user_id": 1  # Assume this user ID exists
            },
            {
                "title": "Read a book",
                "completed": True,
                "user_id": 2  # Assume this user ID exists
            }
        ]

        # Add sample todos to the database
        for todo_data in todos:
            todo = Todo(
                title=todo_data["title"],
                completed=todo_data["completed"],
                user_id=todo_data["user_id"]
            )
            db.session.add(todo)
            db.session.commit()
print("Database seeded!")
if __name__ == "__main__":
    seed_database()
