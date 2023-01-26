from app.models import db, Review, environment, SCHEMA
from datetime import datetime


def seed_reviews():
    review1 = Review(user_id=1, product_id=1, review='Super fresh and delicious, would order again',
                     stars=5, date_time=datetime.now().strftime("%m/%d/%Y %H:%M"))
    review2 = Review(user_id=1, product_id=2, review='Super fresh and delicious, would order again',
                     stars=5, date_time=datetime.now().strftime("%m/%d/%Y %H:%M"))
    review3 = Review(user_id=1, product_id=3, review='Super fresh and delicious, would order again',
                     stars=5, date_time=datetime.now().strftime("%m/%d/%Y %H:%M"))
    review4 = Review(user_id=1, product_id=4, review='Super fresh and delicious, would order again',
                     stars=5, date_time=datetime.now().strftime("%m/%d/%Y %H:%M"))
    review5 = Review(user_id=1, product_id=5, review='Super fresh and delicious, would order again',
                     stars=5, date_time=datetime.now().strftime("%m/%d/%Y %H:%M"))
    review6 = Review(user_id=2, product_id=6, review='Super fresh and delicious, would order again',
                     stars=5, date_time=datetime.now().strftime("%m/%d/%Y %H:%M"))
    review7 = Review(user_id=2, product_id=1, review='Was decent, had better',
                     stars=3, date_time=datetime.now().strftime("%m/%d/%Y %H:%M"))
    review8 = Review(user_id=2, product_id=2, review='Was decent, had better',
                     stars=3, date_time=datetime.now().strftime("%m/%d/%Y %H:%M"))
    review9 = Review(user_id=2, product_id=3, review='Was decent, had better',
                     stars=3, date_time=datetime.now().strftime("%m/%d/%Y %H:%M"))
    review10 = Review(user_id=2, product_id=4, review='Was decent, had better',
                      stars=3, date_time=datetime.now().strftime("%m/%d/%Y %H:%M"))
    review11 = Review(user_id=2, product_id=5, review='Was decent, had better',
                      stars=3, date_time=datetime.now().strftime("%m/%d/%Y %H:%M"))
    review12 = Review(user_id=2, product_id=6, review='Was decent, had better',
                      stars=3, date_time=datetime.now().strftime("%m/%d/%Y %H:%M"))

    reviews = [review1, review2, review3, review4, review5, review6,
               review7, review8, review9, review10, review11, review12]

    [db.session.add(review) for review in reviews]

    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")

    db.session.commit()
