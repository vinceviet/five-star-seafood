from app.models import db, Product, Category,ProductImage, environment, SCHEMA



def seed_products():

    finfish_cat = Category.query.filter(Category.sub_category == 'finfish').all()
    finfish_id = [category.id for category in finfish_cat]

    poultry_cat = Category.query.filter(Category.sub_category == 'poultry').all()
    poultry_id = [category.id for category in poultry_cat]

    big_glory = Product(name='Big Glory Bay King Salmon', description='(6oz) - 2 ea', origin='New Zealand', price=20.95)
    sea_bass = Product(name='Black Sea Bass', description='~1.5lb', origin='Massachusetts', price=26.95)
    halibut = Product(name='Halibut Fillet', description='Skin Off(6oz) - 2 ea', origin='Normway', price=29.95)
    kampachi = Product(name='Kampachi Fillet', description='1lb', origin='Panama', price=34.95)
    turbot = Product(name='Turbot', description='1.5-2lb', origin='Spain', price=39.95)
    stripe_bass = Product(name='True Striped Bass Fillet', description='(6oz) - 2ea', origin='Baja California', price=19.95)

    root = Product(name='Root Down Farm Whole Chicken', description='- ea', origin="Root Down Farm", price=33)
    fogline = Product(name='Fogline Farm Whole Chicken', description='- ea', origin="Fogline Farm", price=34)
    quail = Product(name='Wolfe Ranch Whole Quail', description='- 2ea', origin="Wolfe Ranch", price=36.99)
    squab = Product(name='Squab', description='- ea', origin="Squab producers", price=36.99)
    duck = Product(name='Duck Confit', description='Corvus Ranch Breast and Leg', origin="Five star kitchen", price=29.50)
    hen = Product(name='Corvus Guinea Hen', description='- ea', origin="Corvus Farms", price=64.99)


    finfish_products = [big_glory, sea_bass, halibut, kampachi, turbot, stripe_bass]
    poultry_products = [root, fogline, quail, squab, duck, hen]

    for product in finfish_products:
            product.category_id = finfish_id[0]

    for product in poultry_products:
        product.category_id = poultry_id[0]

    [db.session.add(product) for product in finfish_products]
    [db.session.add(product) for product in poultry_products]

    db.session.commit()

    root_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/RootDownChicken_400x.jpg?v=1623482531', product_id=root.id)
    fogline_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/FoglineChicken_1_400x.jpg?v=1621969706', product_id=fogline.id)
    quail_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/e85fef_a46c0d72bcd941ada03dbc7fac312fbe_mv2_400x.jpg?v=1595405914', product_id=quail.id)
    squab_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/SQUAB_654268de-0352-4905-b46f-0e8704295849_400x.jpg?v=1653088477', product_id=squab.id)
    duck_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/IMG_3551_400x.jpg?v=1643742983', product_id=duck.id)
    hen_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/guinea_400x.jpg?v=1671818749', product_id=hen.id)

    poultry_images = [root_img, fogline_img, quail_img, squab_img, duck_img, hen_img]

    [db.session.add(img) for img in poultry_images]

    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM products")

    db.session.commit()
