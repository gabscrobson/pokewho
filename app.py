from cs50 import SQL
from flask import Flask, redirect, render_template, request, session
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import login_required, mystery_image, apology

# Configure application
app = Flask(__name__)

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure app to reload templates when they are changed
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///pokewho.db")

# Ensure responses aren't cached
@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

# Homepage
@app.route("/")
@login_required
def index():
    return render_template("index.html")

@app.route("/play")
@login_required
def play():
    
    return render_template("play.html")

# Login
@app.route("/login", methods=["GET", "POST"])
def login():
    # Forget any user_id
    session.clear()

    # User reached route via POST
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")

        # Ensure username was submitted
        if not username:
            return apology("missing username")
        # Ensure password was submitted
        elif not password:
            return apology("missing password")
        # Query database for username
        rows = db.execute("SELECT * FROM users WHERE username = ?", username)
        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(rows[0]["password"], password):
            return apology("invalid username and/or password")
        
        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]
        session["username"] = rows[0]["username"]
        session["cash"] = rows[0]["cash"]
        session["pokemon_caught"] = rows[0]["pokemon_caught"]

        return redirect("/")
    
    # User reached route via GET
    else:
        return render_template("login.html")

# Logout
@app.route("/logout")
def logout():
    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")

# Register
@app.route("/register", methods=["GET", "POST"])
def register():
    # Forget any user_id
    session.clear()

    # User reached route via POST
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        confirmation = request.form.get("confirmation")
        # Ensure username was submitted
        if not username:
            return apology("missing username")
        # Ensure password was submitted
        elif not password:
            return apology("missing password")
        # Ensure confirmation was submitted
        elif not confirmation:
            return apology("missing confirmation")
        # Ensure password and confirmation match
        elif password != confirmation:
            return apology("passwords do not match")
        # Ensure username is not already taken
        elif db.execute("SELECT * FROM users WHERE username = ?", username):
            return apology("username already taken")
        # Insert user into database
        db.execute("INSERT INTO users (username, password) VALUES (?, ?)", username, generate_password_hash(password))

        return redirect("/")
    
    # User reached route via GET
    else:
        return render_template("register.html")

# Catch Pokemon
@app.route("/catch")
@login_required
def catch():
    name = request.args.get("name")
    guess = request.args.get("guess")
    is_shiny = request.args.get("is_shiny")
    if name is None or guess is None:
        return "missing name or guess"
    if name.lower() == guess.lower():
        db.execute("UPDATE users SET pokemon_caught = pokemon_caught + ?, cash = cash + ? WHERE id = ?", 1, 100, session["user_id"])
        db.execute("INSERT INTO pokemon (user_id, name, is_shiny) VALUES (?, ?, ?)", session["user_id"], name, is_shiny)
        return "correct"
    return "incorrect"

# Mystery Image
@app.route("/mystery")
def mystery():
    name = request.args.get("name")
    if name is None:
        return "missing name"
    return mystery_image(name)

# Profile
@app.route("/profile/<username>")
@login_required
def profile(username):
    user = db.execute("SELECT * FROM users WHERE username = ?", username)
    if len(user) != 1:
        return apology("user not found")
    user = user[0]
    pokemon = db.execute("SELECT * FROM pokemon WHERE user_id = ?", user["id"])
    return render_template("profile.html", user=user, pokemon=pokemon)
