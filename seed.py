from app import app, db
from models import Perfume, User, Review
from flask_bcrypt import Bcrypt
from faker import Faker
import random

bcrypt = Bcrypt()
faker = Faker()

with app.app_context():
    print("Seeding data...")
    db.drop_all()
    db.create_all()

    perfumes = []
    users = []
    reviews = []

    for _ in range(100):
        perfume = Perfume(
            name=faker.catch_phrase(),
            brand=faker.company()
        )
        perfumes.append(perfume)

    db.session.add_all(perfumes)
    db.session.commit()

    for _ in range(100):
        username = faker.unique.user_name()
        email = faker.unique.email()
        password = faker.password()
        user = User(
            username=username,
            email=email,
            password_hash=bcrypt.generate_password_hash(password).decode('utf-8')
        )
        users.append(user)

    db.session.add_all(users)
    db.session.commit()

    for _ in range(100):
        review = Review(
            rating=random.randint(1, 5),
            comment=faker.sentence(),
            user=random.choice(users),
            perfume=random.choice(perfumes)
        )
        reviews.append(review)

    db.session.add_all(reviews)
    db.session.commit()

    print("✅ Done seeding 100 perfumes, users, and reviews!")
