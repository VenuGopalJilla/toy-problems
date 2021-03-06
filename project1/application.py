import os
from passlib.hash import sha256_crypt

from flask import Flask, session
from flask_session import Session
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from flask import render_template, request, session
from flask_session import Session


from datetime import datetime

from models import *


app = Flask(__name__)

# Check for environment variable
if not os.getenv("DATABASE_URL"):
    raise RuntimeError("DATABASE_URL is not set")

# # Configure session to use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Set up database
# engine = create_engine(os.getenv("DATABASE_URL"))
# db = scoped_session(sessionmaker(bind=engine))

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.app_context().push()

db.init_app(app)

db.create_all()


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/logout")
def logout():
    session.clear()
    return render_template("register.html")

@app.route("/admin")
def admin():
    users = User.query.order_by("timestamp").all()
    return render_template("admin.html", users = users)

@app.route("/register", methods = ['GET','POST'])
def register():
    if request.method == "GET":
        return render_template("register.html")
    else :
        data = []
        name = request.form.get('username')
        age = request.form.get('age')
        dob = request.form.get('dob')
        gender = request.form.get('gender')
        password_hashed = sha256_crypt.encrypt(request.form.get('password'))
        # print(password_hashed)
        data.append(name)
        data.append(age)
        data.append(dob)
        data.append(gender)
        if (User.query.get(name) == None):
            user = User(username = name, age = age, gender = gender, password = password_hashed)
            db.session.add(user)
            message = "You are successfully registered."
            db.session.commit()
            return render_template("register.html", notesdata = data, message = message)
        else :
            return render_template("register.html", message = "Username already exists. Please login.")

            
        


@app.route("/auth", methods = ['GET', 'POST'])
def auth():
    if request.method == "POST":
        # salt = bcrypt.gensalt()
        session["data1"] = []
        name1 = request.form.get('username')
        # session["username"] = name1
        # print(name1)
        password1 = request.form.get('password')
        # print(password1)
        user1 = User.query.get(name1)
        age1 = user1.age
        gender1 = user1.gender
        session["data1"].append(name1)
        session["data1"].append(age1)
        session["data1"].append(gender1)
        # print(user1.username)
        # print(user1.password)
        # print(sha256_crypt.encrypt(password1))
        # print(sha256_crypt.verify(password1, sha256_crypt.encrypt(password1)))
        if ((name1 == user1.username) and sha256_crypt.verify(password1, sha256_crypt.encrypt(password1))) :
            return render_template("userhome.html", notesdata1 = session["data1"])
        else:
            msg = "Invalid Credentials."
            return render_template("register.html", message = msg)
    else:
        msg = "Please login."
        return render_template("register.html", message = msg)



