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
    crackers = Category(name='bakery',sub_category='crackers')
    asian = Category(name='pantry',sub_category='asian')
    coffee = Category(name='pantry',sub_category='coffee')
    grain = Category(name='pantry',sub_category='grain')
    honey = Category(name='pantry',sub_category='honey')

    categories = [finfish, oysters, shellfish, caviar, poultry, beef, lamb, pork, game, fruit, vegtables, mushrooms, seaweed, milk, butter, cheese, boxes, comal, cochon, pizza, pies, crackers, asian, coffee, grain, honey]
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
    turkey = Product(name='Joyce Farms Naked White Turkey', description='- ea', origin="Joyce Farms", price=158, category_id=poultry.id)
    hen = Product(name='Corvus Guinea Hen', description='- ea', origin="Corvus Farms", price=64.99, category_id=poultry.id)

    blueberries = Product(name='Blueberries', description='(Organic) - 6oz', origin="Central West", price=8.25, category_id=fruit.id)
    kiwi = Product(name='Hayward Kiwi', description='- lb', origin="Brokaw Ranch", price=4, category_id=fruit.id)
    orange = Product(name='Cara Cara Orange', description='(Organic) - 2lb', origin="Fruit World", price=8, category_id=fruit.id)
    apples = Product(name='Fuji Apples', description='(Organic) - 1lb', origin="K & J Orchards", price=5.50, category_id=fruit.id)
    lemons = Product(name='Eureka Lemons', description='(Organic) - 2lb', origin="Brokaw Ranch", price=10, category_id=fruit.id)
    blood = Product(name='Moro Blood Oranges', description='- 2lb', origin="Brokaw Ranch", price=8.25, category_id=fruit.id)

    straus = Product(name='Straus European Whole Milk Yogurt', description='(Organic) - Quart', origin="Straus Creamery", price=6.50, category_id=milk.id)
    peach = Product(name='Peach Apricot Yogurt', description='- 5.6oz', origin="La Fermiere", price=4, category_id=milk.id)
    bean = Product(name='Vanilla Bean Yogurt', description='- 5.6oz', origin="La Fermiere", price=4, category_id=milk.id)
    strawberry = Product(name='Strawberry Pomegranate Yogurt', description='- 5.6oz', origin="La Fermiere", price=4, category_id=milk.id)
    rasberry = Product(name='Raspberry Blueberry Yogurt', description='- 5.6oz', origin="La Fermiere", price=4, category_id=milk.id)
    mango = Product(name='Mango Passionfruit Yogurt', description='- 5.6oz', origin="La Fermiere", price=4, category_id=milk.id)

    cioppino = Product(name='Cioppino Kit for Two', description='', origin="Five Star Seafood", price=80, category_id=boxes.id)
    citrus = Product(name='California Citrus Box', description='', origin="Five Star Seafood", price=49.95, category_id=boxes.id)
    sashimi = Product(name='Grand Sushi/Sashimi Kit', description='', origin="Five Star Seafood", price=125, category_id=boxes.id)

    pecan = Product(name='Bourbon Pecan Pie', description='(Frozen)', origin="Three Babes Bakeshop", price=49.90, category_id=pies.id)
    pumpkin = Product(name='Classic Pumpkin Pie', description='(Frozen)', origin="Three Babes Bakeshop", price=49.90, category_id=pies.id)
    applep = Product(name='Classic Apple Pie', description='(Frozen)', origin="Three Babes Bakeshop", price=49.90, category_id=pies.id)
    choco = Product(name='Bittersweet Chocolate Pecan', description='(Frozen)', origin="Three Babes Bakeshop", price=49.90, category_id=pies.id)
    crumble = Product(name='Blackberry Crumble Pie', description='(Frozen)', origin="Three Babes Bakeshop", price=49.90, category_id=pies.id)
    vegan = Product(name='Vegan Blackberry Crumble Pie', description='(Frozen)', origin="Three Babes Bakeshop", price=49.90, category_id=pies.id)

    dashi = Product(name='Dashi Kombu', description='- 2lb', origin="Five Star Provisions", price=42, category_id=asian.id)
    wasabi = Product(name='Wasabi Root', description='- ea', origin="Half Moon Bay Wasabi Company", price=42, category_id=asian.id)
    miso = Product(name='Aedan Kyoto Sweet Miso', description='- 8oz', origin="Aeden Fermented Foods", price=14, category_id=asian.id)
    fish_sauce = Product(name='Iwashi Whiskey Barrel Aged Fish Sauce', description='- 750ml', origin="Haku", price=33.50, category_id=asian.id)
    yuzu = Product(name='Yuzu Juice', description='- 750ml', origin="Yakami Orchards", price=42, category_id=asian.id)
    yuzu_kosho = Product(name='Yuzu Kosho', description='- Red(2oz)', origin="Five Star Seafood", price=7.50, category_id=asian.id)


    finfish_products = [big_glory, sea_bass, halibut, kampachi, turbot, stripe_bass]
    poultry_products = [root, fogline, quail, squab, turkey, hen]
    fruit_products = [blueberries, kiwi, orange, apples, lemons, blood]
    milk_products = [straus, peach, bean, strawberry, rasberry, mango]
    box_products = [cioppino, citrus, sashimi]
    pie_products = [pecan, pumpkin, applep, choco, crumble, vegan]
    asian_products = [dashi, wasabi, miso, fish_sauce, yuzu, yuzu_kosho]

    [db.session.add(product) for product in finfish_products]
    [db.session.add(product) for product in poultry_products]
    [db.session.add(product) for product in fruit_products]
    [db.session.add(product) for product in milk_products]
    [db.session.add(product) for product in box_products]
    [db.session.add(product) for product in pie_products]
    [db.session.add(product) for product in asian_products]


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
    turkey_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/shutterstock_1396161521_400x.jpg?v=1668283423', product_id=turkey.id)
    hen_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/guinea_400x.jpg?v=1671818749', product_id=hen.id)

    blueberries_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/FS_Blueberries-44_819bebe1-148e-4d30-9e3a-2493d8f4efc7_400x.jpg?v=1617982371', product_id=blueberries.id)
    kiwi_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/HaywardKiwiw_9ef46c12-465e-475a-a435-58d0d8bcd15f_400x.jpg?v=1614387294', product_id=kiwi.id)
    oranges_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/CaraCara_400x.jpg?v=1614356089', product_id=orange.id)
    apples_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/fuji_400x.png?v=1632432185', product_id=apples.id)
    lemons_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/Lemon_a6ad003c-a7b4-4f9a-a976-cb316027fa0f_400x.jpg?v=1614356235', product_id=lemons.id)
    blood_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/MoroBloodOrange_400x.jpg?v=1675569869', product_id=blood.id)

    straus_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/FSS_web-19_400x.jpg?v=1612978983', product_id=straus.id)
    peach_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/FS_Provisions-084_400x.jpg?v=1612978623', product_id=peach.id)
    bean_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/FS_Provisions-086_400x.jpg?v=1612978756', product_id=bean.id)
    strawberry_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/FS_Provisions-085_400x.jpg?v=1612978716', product_id=strawberry.id)
    rasberry_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/FS_Provisions-087_400x.jpg?v=1612978690', product_id=rasberry.id)
    mango_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/FS_-208_400x.jpg?v=1623718357', product_id=mango.id)

    cioppino_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/FS_Cioppino-2_600x.jpg?v=1606173473', product_id=cioppino.id)
    citrus_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/CitrusBox_2a13fa25-cb75-42a0-ac5c-1bd0a09a62ec_400x.jpg?v=1614356049', product_id=citrus.id)
    sashimi_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/newsushikit_a094a99d-5554-4396-9440-0b5c03ed62a9_400x.jpg?v=1653776959', product_id=sashimi.id)

    pecan_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/Bourbon-Pecan-ThreeBabes_400x.jpg?v=1667820805', product_id=pecan.id)
    pumpkin_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/pumpkin-pie-threebabes_400x.jpg?v=1667821027', product_id=pumpkin.id)
    applep_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/apple-pie-threebabes_400x.jpg?v=1667821219', product_id=applep.id)
    choco_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/Chocolate-Pecan-ThreeBabes_400x.jpg?v=1667821415', product_id=choco.id)
    crumble_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/blackberry-crumble-threebabes_400x.jpg?v=1667821623', product_id=crumble.id)
    vegan_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/vegan-blackberry-threebabes_400x.jpg?v=1667821749', product_id=vegan.id)

    dashi_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/Kombu_1_200x.jpg?v=1612811897', product_id=dashi.id)
    wasabi_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/HMB_Wasabi_200x.jpg?v=1612832295', product_id=wasabi.id)
    miso_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/FS_provisions-118_200x.jpg?v=1612831129', product_id=miso.id)
    fish_sauce_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/FS_VG-14_50f30b1f-08be-4e5a-9ef8-6717aa11913c_200x.jpg?v=1612832838', product_id=fish_sauce.id)
    yuzu_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/MarugotoShibori_2_200x.jpg?v=1612833078', product_id=yuzu.id)
    yuzu_kosho_img = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/RedYuzoKosho_200x.jpg?v=1612833236', product_id=yuzu_kosho.id)

    finfish_images = [big_glory_img, sea_bass_img, halibut_img, kampachi_img, turbot_img, stripe_bass_img]
    poultry_images = [root_img, fogline_img, quail_img, squab_img, turkey_img, hen_img]
    fruit_images = [blueberries_img, kiwi_img, oranges_img, apples_img, lemons_img, blood_img]
    milk_images = [straus_img, peach_img, bean_img, strawberry_img, rasberry_img, mango_img]
    box_images = [cioppino_img, citrus_img, sashimi_img]
    pie_images = [pecan_img, pumpkin_img, applep_img,choco_img, crumble_img, vegan_img]
    asian_images = [dashi_img, wasabi_img, miso_img, fish_sauce_img, yuzu_img, yuzu_kosho_img]

    [db.session.add(img) for img in finfish_images]
    [db.session.add(img) for img in poultry_images]
    [db.session.add(img) for img in fruit_images]
    [db.session.add(img) for img in milk_images]
    [db.session.add(img) for img in box_images]
    [db.session.add(img) for img in pie_images]
    [db.session.add(img) for img in asian_images]


    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM products")

    db.session.commit()
