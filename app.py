from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from models import db, User, Perfume, Review
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'secret-key'
app.config['SESSION_TYPE'] = 'filesystem'

db.init_app(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)


@app.route('/')
def home():
    return {"message": "Welcome to the Perfume API!"}


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    try:
        hashed_pw = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        user = User(username=data['username'], password_hash=hashed_pw)
        db.session.add(user)
        db.session.commit()
        return user.to_dict(), 201
    except IntegrityError:
        db.session.rollback()
        return {"error": "Username already exists"}, 409

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user and bcrypt.check_password_hash(user.password_hash, data['password']):
        session['user_id'] = user.id
        return user.to_dict()
    return {"error": "Invalid username or password"}, 401

@app.route('/logout', methods=['DELETE'])
def logout():
    session.pop('user_id', None)
    return {}, 204


# Perfume routes
@app.route('/perfumes', methods=['GET'])
def get_perfumes():
    perfumes = Perfume.query.all()
    return [p.to_dict() for p in perfumes]

@app.route('/perfumes/<int:id>', methods=['GET'])
def get_perfume(id):
    perfume = Perfume.query.get(id)
    if perfume:
        return perfume.to_dict()
    return {"error": "Perfume not found"}, 404


@app.route('/reviews', methods=['POST'])
def create_review():
    if not session.get('user_id'):
        return {"error": "Unauthorized"}, 401

    data = request.get_json()
    review = Review(
        rating=data['rating'],
        comment=data['comment'],
        perfume_id=data['perfume_id'],
        user_id=session['user_id']
    )
    db.session.add(review)
    db.session.commit()
    return review.to_dict(), 201



if __name__ == '__main__':
    app.run(debug=True)
