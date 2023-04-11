from flask import redirect, render_template, request, session, send_file, jsonify
from functools import wraps
from PIL import Image, ImageEnhance
from io import BytesIO
import requests

# Decorate routes to require login.
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("user_id") is None:
            return redirect("/login")
        return f(*args, **kwargs)
    return decorated_function

# Return a pokemon image with brightness 0
def mystery_image(name):
    response = requests.get(requests.get(f"https://pokeapi.co/api/v2/pokemon/{name}").json()["sprites"]["other"]["official-artwork"]["front_default"])
    img = Image.open(BytesIO(response.content)).convert("RGBA")
    img = ImageEnhance.Brightness(img).enhance(0)
    image_io = BytesIO()
    img.save(image_io, format='PNG')
    image_io.seek(0)
    return send_file(
        image_io,
        as_attachment=False,
        mimetype='image/png'
    )