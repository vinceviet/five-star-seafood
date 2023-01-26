from app.models import db, Review, environment, SCHEMA
from datetime import datetime


def seed_reviews():
    review1 = Review(user_id=1, product_id=1, review='Super fresh and delicious, would order again',
                     stars=5, date_time=datetime.now().strftime("%m/%d/%Y"))
    review2 = Review(user_id=1, product_id=2, review='Super fresh and delicious, would order again',
                     stars=5, date_time=datetime.now().strftime("%m/%d/%Y"))
    review3 = Review(user_id=1, product_id=3, review='Super fresh and delicious, would order again',
                     stars=5, date_time=datetime.now().strftime("%m/%d/%Y"))
    review4 = Review(user_id=1, product_id=4, review='Super fresh and delicious, would order again',
                     stars=5, date_time=datetime.now().strftime("%m/%d/%Y"))
    review5 = Review(user_id=1, product_id=5, review='Super fresh and delicious, would order again',
                     stars=5, date_time=datetime.now().strftime("%m/%d/%Y"))
    review6 = Review(user_id=2, product_id=6, review='Super fresh and delicious, would order again',
                     stars=5, date_time=datetime.now().strftime("%m/%d/%Y"))
    review7 = Review(user_id=2, product_id=1, review='Was decent, had better',
                     stars=3, date_time=datetime.now().strftime("%m/%d/%Y"))
    review8 = Review(user_id=2, product_id=2, review='Was decent, had better',
                     stars=3, date_time=datetime.now().strftime("%m/%d/%Y"))
    review9 = Review(user_id=2, product_id=3, review='Was decent, had better',
                     stars=3, date_time=datetime.now().strftime("%m/%d/%Y"))
    review10 = Review(user_id=2, product_id=4, review='Was decent, had better',
                      stars=3, date_time=datetime.now().strftime("%m/%d/%Y"))
    review11 = Review(user_id=2, product_id=5, review='Was decent, had better',
                      stars=3, date_time=datetime.now().strftime("%m/%d/%Y"))

    reviews = [review1, review2, review3, review4, review5, review6,
               review7, review8, review9, review10, review11]

    [db.session.add(review) for review in reviews]

    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")

    db.session.commit()
