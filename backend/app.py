#!/usr/bin/env python3

import random
from flask import Flask, jsonify, make_response, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, create_access_token, get_jwt
from datetime import timedelta
 

from models import db, User, Todo

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = "$hhjd4q%h%^#7&893" + str(random.randint(1, 1000000))
app.config["JWT_SECRET_KEY"] = "a44u5$%*47992n3i*#*#99s29" + str(random.randint(1, 100000))
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1)

app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)


@app.route("/")
def index():
    return "Hello, World!"
# ===================== AUTHENTICATION ======================
# Login
@app.route("/login", methods=["POST"])
def login_user():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.id)
        return jsonify({"access_token":access_token})

    else:
        return jsonify({"message": "Check your username or password"}), 401

# Fetch Current user
@app.route("/current_user", methods=["GET"])
@jwt_required()
def current_user():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    # user_data = {
    #     "id": user.id,
    #     "name": user.name,
    #     "email": user.email,
    #     "avatar" : user.avatar
    # }
    return jsonify([user.to_dict()]), 200

# Logout
BLACKLIST = set()
@jwt.token_in_blocklist_loader
def check_if_token_in_blocklist(jwt_header, decrypted_token):
    return decrypted_token['jti'] in BLACKLIST

@app.route("/logout", methods=["DELETE"])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    BLACKLIST.add(jti)
    return jsonify({"success":"Successfully logged out"}), 200


# ======================= USERS =======================

@app.route("/users", methods=["GET", "POST"])
def users():
    if request.method == "GET":
        users = User.query.all()
        return make_response(jsonify([user.to_dict() for user in users]), 200)

    elif request.method == "POST":
        data = request.get_json()   

        new_user = User(
            username=data['username'],
            email=data["email"],
            password=bcrypt.generate_password_hash(data['password']).decode('utf-8'),
            avatar=data.get('avatar')
        )
        try:
            db.session.add(new_user)
            db.session.commit()
            return jsonify({"success" : "User created successfully"}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': 'User with this email or username already exists', 'error': str(e)}), 500


@app.route("/user/<int:id>", methods=["GET", "PATCH", "DELETE"])
@jwt_required()
def user(id):
    user = User.query.get_or_404(id)

    if request.method == "GET":
        return make_response(jsonify(user.to_dict()), 200)

    elif request.method == "PATCH":
        data = request.get_json()
        logged_in_user = get_jwt_identity()
        user = User.query.get(logged_in_user)
    
        for key, value in data.items():
            setattr(user, key, value)
        db.session.add(user)
        db.session.commit()
        return make_response(jsonify(user.to_dict()), 200)

    elif request.method == "DELETE":
        db.session.delete(user)
        db.session.commit()
        return make_response(jsonify({"message": "User deleted successfully"}), 200)

# ============================= TODOS =============================

@app.route("/todos", methods=["GET", "POST"])
@jwt_required()
def todos():
    todos = Todo.query.all()

    if request.method == "GET":
        return make_response(jsonify([todo.to_dict() for todo in todos]), 200)

    elif request.method == "POST":
        data = request.get_json()
        new_todo = Todo(
            title=data.get("title"),
            completed=data.get("completed"),
            user_id=data.get("user_id")
        )
        db.session.add(new_todo)
        db.session.commit()
        return make_response(jsonify(new_todo.to_dict()), 201)


@app.route("/todos/<int:id>", methods=["GET", "PATCH", "DELETE"])
@jwt_required()
def todo(id):
    todo = Todo.query.get_or_404(id)

    if request.method == "GET":
        return make_response(jsonify(todo.to_dict()), 200)

    elif request.method == "PATCH":
        data = request.get_json()
        for key, value in data.items():
            setattr(todo, key, value)
        db.session.add(todo)
        db.session.commit()
        return make_response(jsonify(todo.to_dict()), 200)

    elif request.method == "DELETE":
        db.session.delete(todo)
        db.session.commit()
        return make_response(jsonify({"message": "Todo deleted successfully"}), 200)


if __name__ == "__main__":
    app.run(debug=True, port=5555)
