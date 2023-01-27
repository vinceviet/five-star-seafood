from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name="Mon", email='demo@aa.io', password='pass')
    demo2 = User(
        first_name='Demo2', last_name="Mon", email='demo2@aa.io', password='pass')
    vi = User(
        first_name='Vi', last_name="Viet", email='vviet@aa.io', password='vviet')
    david = User(
        first_name='David', last_name="Xu", email='imdavid@aa.io', password='imdavid')
    claire = User(
        first_name='Claire', last_name="Chan", email='imclaire@aa.io', password='imclaire')
    barry = User(
        first_name='Barry', last_name="Pham", email='imbarry@aa.io', password='imbarry')

    users = [demo, demo2, vi, david, claire, barry]
    [db.session.add(user) for user in users]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
