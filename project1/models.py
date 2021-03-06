from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = ("USERSS")
    username = db.Column(db.String, primary_key = True)
    age = db.Column(db.Integer, nullable = False)
    gender = db.Column(db.String, nullable = False)
    password = db.Column(db.String, nullable = False)
    timestamp = db.Column(db.DateTime, nullable = False)

    def __init__(self, username, age, password, gender):
        self.username = username
        self.age = age
        self.gender = gender
        self.password = password
        self.timestamp = datetime.now()



