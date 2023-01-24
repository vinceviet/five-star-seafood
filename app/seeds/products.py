from app.models import db, Product, Category, environment, SCHEMA



def seed_products():

    finfish_cat = Category.query.filter(Category.sub_category == 'finfish').all()
    finfish_id = [category.id for category in finfish_cat]

    big_glory = Product(name='Big Glory Bay King Salmon', description='(6oz) - 2 ea', origin='New Zealand', price=20.95)
    sea_bass = Product(name='Black Sea Bass', description='~1.5lb', origin='Massachusetts', price=26.95)
    halibut = Product(name='Halibut Fillet', description='Skin Off(6oz) - 2 ea', origin='Normway', price=29.95)
    kampachi = Product(name='Kampachi Fillet', description='1lb', origin='Panama', price=34.95)
    turbot = Product(name='Turbot', description='1.5-2lb', origin='Span', price=39.95)
    stripe_bass = Product(name='True Striped Bass Fillet', description='(6oz) - 2ea', origin='Baja California', price=19.95)


    finfish_products = [big_glory, sea_bass, halibut, kampachi, turbot, stripe_bass]
    for product in finfish_products:
            product.category_id = finfish_id[0]
    [db.session.add(product) for product in finfish_products]

    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM products")

    db.session.commit()
