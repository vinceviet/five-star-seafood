from app.models import db, Review, environment, SCHEMA

def seed_reviews():

    review1 = Review(user_id = 1, product_id = 1, review = 'yummy', stars = 5, date_time = '4/5/23')
    review2 = Review(user_id = 1, product_id = 2, review = 'yummy', stars = 5, date_time = '4/5/23')
    review3 = Review(user_id = 1, product_id = 3, review = 'yummy', stars = 5, date_time = '4/5/23')
    review4 = Review(user_id = 1, product_id = 4, review = 'yummy', stars = 5, date_time = '4/5/23')
    review5 = Review(user_id = 1, product_id = 5, review = 'yummy', stars = 5, date_time = '4/5/23')
    review6 = Review(user_id = 1, product_id = 6, review = 'yummy', stars = 5, date_time = '4/5/23')
    review7 = Review(user_id = 1, product_id = 7, review = 'yummy', stars = 5, date_time = '4/5/23')
    review8 = Review(user_id = 1, product_id = 8, review = 'yummy', stars = 5, date_time = '4/5/23')
    review9 = Review(user_id = 1, product_id = 9, review = 'yummy', stars = 5, date_time = '4/5/23')
    review10 = Review(user_id = 1, product_id = 10, review = 'yummy', stars = 5, date_time = '4/5/23')
    review11 = Review(user_id = 1, product_id = 11, review = 'yummy', stars = 5, date_time = '4/5/23')
    review12 = Review(user_id = 1, product_id = 12, review = 'yummy', stars = 5, date_time = '4/5/23')
    review13 = Review(user_id = 1, product_id = 13, review = 'yummy', stars = 5, date_time = '4/5/23')
    review14 = Review(user_id = 1, product_id = 14, review = 'yummy', stars = 5, date_time = '4/5/23')
    review15 = Review(user_id = 1, product_id = 15, review = 'yummy', stars = 5, date_time = '4/5/23')
    review16 = Review(user_id = 1, product_id = 16, review = 'yummy', stars = 5, date_time = '4/5/23')
    review17 = Review(user_id = 1, product_id = 17, review = 'yummy', stars = 5, date_time = '4/5/23')
    review18 = Review(user_id = 1, product_id = 18, review = 'yummy', stars = 5, date_time = '4/5/23')
    review19 = Review(user_id = 1, product_id = 19, review = 'yummy', stars = 5, date_time = '4/5/23')
    review20 = Review(user_id = 1, product_id = 20, review = 'yummy', stars = 5, date_time = '4/5/23')
    review21 = Review(user_id = 1, product_id = 21, review = 'yummy', stars = 5, date_time = '4/5/23')
    review22 = Review(user_id = 1, product_id = 22, review = 'yummy', stars = 5, date_time = '4/5/23')
    review23 = Review(user_id = 1, product_id = 23, review = 'yummy', stars = 5, date_time = '4/5/23')
    review24 = Review(user_id = 1, product_id = 24, review = 'yummy', stars = 5, date_time = '4/5/23')
    review25 = Review(user_id = 1, product_id = 25, review = 'yummy', stars = 5, date_time = '4/5/23')
    review26 = Review(user_id = 1, product_id = 26, review = 'yummy', stars = 5, date_time = '4/5/23')
    review27 = Review(user_id = 1, product_id = 27, review = 'yummy', stars = 5, date_time = '4/5/23')
    review28 = Review(user_id = 1, product_id = 28, review = 'yummy', stars = 5, date_time = '4/5/23')
    review29 = Review(user_id = 1, product_id = 29, review = 'yummy', stars = 5, date_time = '4/5/23')
    review30 = Review(user_id = 1, product_id = 30, review = 'yummy', stars = 5, date_time = '4/5/23')
    review31 = Review(user_id = 1, product_id = 31, review = 'yummy', stars = 5, date_time = '4/5/23')
    review32 = Review(user_id = 1, product_id = 32, review = 'yummy', stars = 5, date_time = '4/5/23')
    review33 = Review(user_id = 1, product_id = 33, review = 'yummy', stars = 5, date_time = '4/5/23')
    review34 = Review(user_id = 1, product_id = 34, review = 'yummy', stars = 5, date_time = '4/5/23')
    review35 = Review(user_id = 1, product_id = 35, review = 'yummy', stars = 5, date_time = '4/5/23')
    review36 = Review(user_id = 1, product_id = 36, review = 'yummy', stars = 5, date_time = '4/5/23')

    reviews = [review1, review2, review3, review4, review5, review6, review7, review8, review9, review10, review11, review12, review13, review14, review15, review16, review17, review18, review19, review20, review21, review22, review23, review24, review25, review26, review27, review28, review29, review30, review31, review32, review33, review34, review35, review36]

    [db.session.add(review) for review in reviews]

    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")

    db.session.commit()
