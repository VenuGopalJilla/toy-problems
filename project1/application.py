import os

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

@app.route("/admin")
def admin():
    users = User.query.order_by("timestamp").all()
    return render_template("admin.html", users = users)

@app.route("/register", methods = ['GET','POST'])
def register():
    if request.method == "GET":
        return render_template("register.html")
    else :
        session["data"] = []
        name = request.form.get('username')
        age = request.form.get('age')
        dob = request.form.get('dob')
        gender = request.form.get('gender')
        session["data"].append(name)
        session["data"].append(age)
        session["data"].append(dob)
        session["data"].append(gender)
        user = User(username = name, age = age, gender = gender)
        try :
            db.session.add(user)
            message = "You are successfully registered."
        except:
            return render_template("error.html", message = "Error in registering you. Please try again.")
        db.session.commit()
        return render_template("register.html", notesdata = session["data"], message = message)


