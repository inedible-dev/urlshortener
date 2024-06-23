from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
from sqlalchemy import create_engine, text
import validators
import random
import string

engine = create_engine('sqlite:///database.db')

app = Flask(__name__)

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

def generate_random_url():
  """Generates a random URL with a length between 5 and 8 characters,
  including uppercase letters and digits.

  This function does not implement collision avoidance. You'll need to handle 
  uniqueness in your overall URL shortener implementation.

  Returns:
      str: A random URL with a random length between 5 and 8 characters,
          including uppercase letters and digits.
  """

  # Generate a random length between 5 and 8 (inclusive)
  length = random.randint(5, 8)

  # Combine all character sets for random selection
  all_chars = string.ascii_lowercase + string.ascii_uppercase + string.digits

  # Generate random URL using string concatenation
  random_url = ''.join(random.choice(all_chars) for _ in range(length))
  return random_url

@app.route("/", methods=["POST", "GET"])
def main():
    if request.method == "GET":
        return render_template("index.html", url=None)
    elif request.method == "POST":
        url_request = request.form.get("url")
        if not validators.url(url_request):
            return redirect("/")
        else:
            while True:
                random_url = generate_random_url()
                with engine.connect() as conn:
                    row = {
                        "url_id": random_url
                    }
                    result = conn.execute(text("SELECT * FROM urls WHERE id = :url_id"), row)
                    rows = result.fetchall()
                if len(rows) == 0:
                    with engine.connect() as conn:
                        row = {
                            "id": random_url,
                            "url": url_request
                        }
                        conn.execute(text("INSERT INTO urls (id, url) VALUES (:id, :url)"), row)
                        conn.commit()
                    break
            return render_template("index.html", url="https://sht.puntawat.dev/" + random_url)
            # return render_template("index.html", url="http://localhost:3000/" + random_url)
        
@app.route("/output.css")
def outputcss():
    return render_template("output.css")

@app.route("/<url>")
def custom(url):
    with engine.connect() as conn:
        row = {
            "urlid": url
        }
        result = conn.execute(text("SELECT * FROM urls WHERE id = :urlid"), row)
        rows = result.fetchall()
    if len(rows) == 1:
        return redirect(rows[0][1])
    else:
        return "error: not found 404 url: " + url
