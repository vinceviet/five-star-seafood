from app.models import db, Review, environment, SCHEMA

def seed_reviews():

    review1 = Review(user_id = 1, product_id = 1, review = 'yummy', stars = 5, date_time = '4/5/23')
    review2 = Review(user_id = 1, product_id = 2, review = 'yummy', stars = 5, date_time = '4/5/23')

    reviews = [review1, review2]

    [db.session.add(review) for review in reviews]

    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM products")

    db.session.commit()
