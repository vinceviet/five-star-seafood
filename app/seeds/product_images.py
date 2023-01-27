from app.models import db, ProductImage, Product, environment, SCHEMA



def seed_product_images():

    big_glory = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/Big_Glory_Bay_King_Salmon_Portions_1000x.jpg?v=1672859838', product_id=1)
    sea_bass = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/DSC_0659_600x.jpg?v=1605091700', product_id=2)
    halibut = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/AlaskanHalibut_c6f5b5b9-c3b3-42e0-8b2c-2fc9c68cd9af_600x.jpg?v=1670881116', product_id=3)
    kampachi = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/e85fef_3cde1206fb21456dbe57d016bf3466b1_mv2_600x.jpg?v=1605092551', product_id=4)
    turbot = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/WholeSpanishTurbot_d3366bbe-1e46-447d-8082-56990f243f70_600x.jpg?v=1605093160', product_id=5)
    stripe_bass = ProductImage(image_url='https://cdn.shopify.com/s/files/1/0430/7065/2581/products/e85fef_d004cc1482d74074927f3d62371b9f3c_mv2_600x.jpg?v=1605093038', product_id=6)


    product_images = [big_glory, sea_bass, halibut, kampachi, turbot, stripe_bass]

    [db.session.add(image) for image in product_images]

    db.session.commit()


def undo_product_images():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM product_images")

    db.session.commit()
