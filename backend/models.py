from flask_sqlalchemy import SQLAlchemy 
from sqlalchemy import MetaData 
from sqlalchemy_serializer import SerializerMixin
from email_validator import validate_email, EmailNotValidError

metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)

db = SQLAlchemy(metadata=metadata)

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    avatar = db.Column(db.String(150))

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    todos = db.relationship("Todo", backref="user", lazy=True)


    def validate(self):
        if len(self.username) < 3:
            raise ValueError("Username must be at least 3 characters long.")
        if len(self.password) < 3:
            raise ValueError("Password must be at least 3 characters long.")
        try:
            validate_email(self.email)
        except EmailNotValidError as e:
            raise ValueError(f"Invalid email address: {e}")

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "avatar": self.avatar
        }

    def __repr__(self):
        return f"<User(username='{self.username}')>"

class Todo(db.Model, SerializerMixin):
    __tablename__ = "todos"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    completed = db.Column(db.Boolean, default=False)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def __init__(self, title, completed=False, user_id=None):
        self.title = title
        self.completed = completed
        self.user_id = user_id
        self.validate()

    def validate(self):
        if not self.title or len(self.title) < 3:
            raise ValueError("Title must be at least 3 characters long.")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "completed": self.completed
        }

    def __repr__(self):
        return f"<Todo(title='{self.title}')>"
