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

    perfume_names = [
    "Velvet Bloom", "Amber Noir", "Ocean Whisper", "Crimson Kiss", "Lunar Petals",
    "Golden Mirage", "Mystic Oud", "Twilight Veil", "Vanilla Eclipse", "Silken Dusk"
    ]

    brands = [
    "Chanel", "Dior", "Yves Saint Laurent", "Tom Ford", "Gucci",
    "Versace", "Armani", "Prada", "Burberry", "Hermès"
    ]  

    perfume_images = [
        "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyZnVtZXN8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1701291927826-c7775869d822?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyZnVtZXN8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1724157073080-fcffb8d6c956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBlcmZ1bWVzfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBlcmZ1bWVzfGVufDB8fDB8fHww"
    ]

    for _ in range(100):
        name = random.choice(perfume_names) 
        brand = random.choice(brands)
        image = random.choice(perfume_images)
        
        perfume = Perfume(
            name=name,
            brand=brand,
            image=image
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
