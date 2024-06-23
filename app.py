from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
import sqlite3

con = sqlite3.connect("database.db")
db = con.cursor()

app = Flask(__name__)

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

@app.route("/")
def main():
    return render_template("index.html")