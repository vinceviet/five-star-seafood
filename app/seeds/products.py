from app.models import db, Product, Category,ProductImage, environment, SCHEMA



def seed_products():

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

    big_glory = Product(name='Big Glory Bay King Salmon', description='(6oz) - 2 ea', origin='New Zealand', price=20.95, category_id=finfish.id)
    sea_bass = Product(name='Black Sea Bass', description='~1.5lb', origin='Massachusetts', price=26.95, category_id=finfish.id)
    halibut = Product(name='Halibut Fillet', description='Skin Off(6oz) - 2 ea', origin='Normway', price=29.95, category_id=finfish.id)
    kampachi = Product(name='Kampachi Fillet', description='1lb', origin='Panama', price=34.95, category_id=finfish.id)
    turbot = Product(name='Turbot', description='1.5-2lb', origin='Spain', price=39.95, category_id=finfish.id)
    stripe_bass = Product(name='True Striped Bass Fillet', description='(6oz) - 2ea', origin='Baja California', price=19.95, category_id=finfish.id)

    root = Product(name='Root Down Farm Whole Chicken', description='- ea', origin="Root Down Farm", price=33, category_id=poultry.id)
    fogline = Product(name='Fogline Farm Whole Chicken', description='- ea', origin="Fogline Farm", price=34, category_id=poultry.id)
    quail = Product(name='Wolfe Ranch Whole Quail', description='- 2ea', origin="Wolfe Ranch", price=36.99, category_id=poultry.id)
    squab = Product(name='Squab', description='- ea', origin="Squab producers", price=36.99, category_id=poultry.id)
    duck = Product(name='Duck Confit', description='Corvus Ranch Breast and Leg', origin="Five star kitchen", price=29.50, category_id=poultry.id)
    hen = Product(name='Corvus Guinea Hen', description='- ea', origin="Corvus Farms", price=64.99, category_id=poultry.id)


    finfish_products = [big_glory, sea_bass, halibut, kampachi, turbot, stripe_bass]
    poultry_products = [root, fogline, quail, squab, duck, hen]

    [db.session.add(product) for product in finfish_products]
    [db.session.add(product) for product in poultry_products]

    db.session.commit()

    big_glory_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/Big_Glory_Bay_King_Salmon_Portions_1000x.jpg?v=1672859838', product_id=big_glory.id)
    sea_bass_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/DSC_0659_600x.jpg?v=1605091700', product_id=sea_bass.id)
    halibut_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/AlaskanHalibut_c6f5b5b9-c3b3-42e0-8b2c-2fc9c68cd9af_600x.jpg?v=1670881116', product_id=halibut.id)
    kampachi_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/e85fef_3cde1206fb21456dbe57d016bf3466b1_mv2_600x.jpg?v=1605092551', product_id=kampachi.id)
    turbot_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/WholeSpanishTurbot_d3366bbe-1e46-447d-8082-56990f243f70_600x.jpg?v=1605093160', product_id=turbot.id)
    stripe_bass_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/e85fef_d004cc1482d74074927f3d62371b9f3c_mv2_600x.jpg?v=1605093038', product_id=stripe_bass.id)

    root_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/RootDownChicken_400x.jpg?v=1623482531', product_id=root.id)
    fogline_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/FoglineChicken_1_400x.jpg?v=1621969706', product_id=fogline.id)
    quail_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/e85fef_a46c0d72bcd941ada03dbc7fac312fbe_mv2_400x.jpg?v=1595405914', product_id=quail.id)
    squab_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/SQUAB_654268de-0352-4905-b46f-0e8704295849_400x.jpg?v=1653088477', product_id=squab.id)
    duck_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/IMG_3551_400x.jpg?v=1643742983', product_id=duck.id)
    hen_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/guinea_400x.jpg?v=1671818749', product_id=hen.id)

    finfish_images = [big_glory_img, sea_bass_img, halibut_img, kampachi_img, turbot_img, stripe_bass_img]
    poultry_images = [root_img, fogline_img, quail_img, squab_img, duck_img, hen_img]

    [db.session.add(image) for image in finfish_images]
    [db.session.add(img) for img in poultry_images]


    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM products")

    db.session.commit()
