from app.models import db, Category, Product, environment, SCHEMA


def seed_categories():
    finfish = Category(name='seafood', sub_category='finfish')
    oysters = Category(name='seafood', sub_category='oysters')
    shellfish = Category(name='seafood', sub_category='shellfish')
    caviar = Category(name='seafood', sub_category='caviar')
    poultry = Category(name='meat', sub_category='poultry')
    beef = Category(name='meat', sub_category='beef')
    lamb = Category(name='meat', sub_category='lamb')
    pork = Category(name='meat', sub_category='pork')
    game = Category(name='meat', sub_category='game')
    fruit = Category(name='produce', sub_category='fruit')
    vegtables = Category(name='produce', sub_category='vegtables')
    mushrooms = Category(name='produce', sub_category='mushrooms')
    seaweed = Category(name='produce', sub_category='seaweed')
    milk = Category(name='dairy', sub_category='milk')
    butter = Category(name='dairy', sub_category='butter')
    cheese = Category(name='dairy', sub_category='cheese')
    boxes = Category(name='meals', sub_category='boxes')
    comal = Category(name='meals', sub_category='comal')
    cochon = Category(name='meals', sub_category='cochon')
    pizza = Category(name='meals', sub_category='pizza')
    pies = Category(name='bakery',sub_category='pies')
    flour = Category(name='bakery',sub_category='flour')
    crackers = Category(name='bakery',sub_category='crackers')
    asian = Category(name='pantry',sub_category='asian')
    coffee = Category(name='pantry',sub_category='coffee')
    grain = Category(name='pantry',sub_category='grain')
    honey = Category(name='pantry',sub_category='honey')

    categories = [finfish, oysters, shellfish, caviar, poultry, beef, lamb, pork, game, fruit, vegtables, mushrooms, seaweed, milk, butter, cheese, boxes, comal, cochon, pizza, pies, flour, crackers, asian, coffee, grain, honey]
    [db.session.add(category) for category in categories]
    db.session.commit()

    # big_glory = Product(name='Big Glory Bay King Salmon', description='(6oz) - 2 ea', origin='New Zealand', price=20.95, category_id=finfish.id)
    # sea_bass = Product(name='Black Sea Bass', description='~1.5lb', origin='Massachusetts', price=26.95, category_id=finfish.id)
    # halibut = Product(name='Halibut Fillet', description='Skin Off(6oz) - 2 ea', origin='Normway', price=29.95, category_id=finfish.id)
    # kampachi = Product(name='Kampachi Fillet', description='1lb', origin='Panama', price=34.95, category_id=finfish.id)
    # turbot = Product(name='Turbot', description='1.5-2lb', origin='Spain', price=39.95, category_id=finfish.id)
    # stripe_bass = Product(name='True Striped Bass Fillet', description='(6oz) - 2ea', origin='Baja California', price=19.95, category_id=finfish.id)

    # finfish_products = [big_glory, sea_bass, halibut, kampachi, turbot, stripe_bass]
    # [db.session.add(product) for product in finfish_products]
    # db.session.commit()


def undo_categories():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM categories")

    db.session.commit()
