from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


def add_prefix_for_prod(attr):
    if environment == "production":
        return f"{SCHEMA}.{attr}"
    else:
        return attr


# cart_products = db.Table(
#     "cart_products",
#     db.Column(
#         "product_id",
#         db.Integer,
#         db.ForeignKey("products.id"),
#         primary_key=True
#     ),
#     db.Column(
#         "cart_id",
#         db.Integer,
#         db.ForeignKey("carts.id"),
#         primary_key=True
#     )
# )

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    address = db.relationship(
        'UserAddress', back_populates='user', cascade='all, delete-orphan')
    cart = db.relationship('Cart', back_populates='user',
                           cascade='all, delete-orphan')
    order = db.relationship('Order', back_populates='user',
                            cascade='all, delete-orphan')
    review = db.relationship(
        'Review', back_populates='user', cascade='all, delete-orphan')
    wishlist = db.relationship(
        'Wishlist', back_populates='user', cascade='all, delete-orphan')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'email': self.email
        }


class UserAddress(db.Model):
    __tablename__ = 'user_addresses'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    phone = db.Column(db.String(15), nullable=False)
    address = db.Column(db.String(40), nullable=False)
    city = db.Column(db.String(40), nullable=False)
    state = db.Column(db.String(40), nullable=False)
    country = db.Column(db.String(40), default='United States', nullable=False)
    zip_code = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)

    user = db.relationship('User', back_populates='address')

    def to_dict(self):
        return {
            'id': self.id,
            'phone': self.phone,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'country': self.country,
            'zipCode': self.zip_code,
            'userId': self.user_id
        }


class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    origin = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)
    num_reviews = db.Column(db.Integer, default=0)
    avg_star_rating = db.Column(db.Float, default=0)
    category_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('categories.id')), nullable=False)

    product_images = db.relationship(
        'ProductImage', back_populates='product', cascade='all, delete-orphan')
    category = db.relationship('Category', back_populates='product')
    review = db.relationship('Review', back_populates='product')
    wishlist = db.relationship('Wishlist', back_populates='product')
    # cart = db.relationship(
    #     'Cart', secondary='cart_products', back_populates='product')
    cart_item = db.relationship('CartItem', back_populates='products')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'origin': self.origin,
            'price': self.price,
            'avgStarRating': self.avg_star_rating,
            'numReviews': self.num_reviews,
            'categoryId': self.category_id,
            'productImages': [product_images.to_dict() for product_images in self.product_images],
            # 'category': [category.to_dict() for category in self.category]
        }


class ProductImage(db.Model):
    __tablename__ = 'product_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.Text, nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('products.id')), nullable=False)

    product = db.relationship('Product', back_populates='product_images')

    def to_dict(self):
        return {
            'id': self.id,
            'imageUrl': self.image_url,
            'productId': self.product_id
        }


class Category(db.Model):
    __tablename__ = 'categories'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(55), nullable=False)
    sub_category = db.Column(db.String(55), nullable=False)

    product = db.relationship('Product', back_populates='category')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'subCategory': self.sub_category
        }


class Order(db.Model):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    date_time = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    cart_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('carts.id')), nullable=False)

    user = db.relationship('User', back_populates='order')
    cart = db.relationship('Cart', back_populates='order')

    def to_dict(self):
        return {
            'id': self.id,
            'dateTime': self.date_time,
            'userId': self.user_id,
            'cartId': self.cart_id
        }


class Cart(db.Model):
    __tablename__ = 'carts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    # product_quantity = db.Column(db.Integer, nullable=False)
    # total_item_price = db.Column(db.Float, nullable=False)
    # product_id = db.Column(db.Integer, db.ForeignKey(
    #     add_prefix_for_prod('products.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=True, unique=True)
    total_price = db.Column(db.Float, default=0)

    user = db.relationship('User', back_populates='cart')
    order = db.relationship('Order', back_populates='cart')
    # product = db.relationship(
    #     'Product', secondary='cart_products', back_populates='cart')
    cart_item = db.relationship(
        'CartItem', back_populates='cart', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            # 'productQuantity': self.product_quantity,
            # 'totalItemPrice': self.total_item_price,
            # 'productId': self.product_id,
            'totalPrice': self.total_price,
        }


class CartItem(db.Model):
    __tablename__ = 'cart_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_quantity = db.Column(db.Integer, nullable=False)
    total_item_price = db.Column(db.Float, nullable=False)
    price = db.Column(db.Float, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    item_url = db.Column(db.Text, nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('products.id')), nullable=False)
    cart_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('carts.id')), nullable=False)

    cart = db.relationship('Cart', back_populates='cart_item')
    products = db.relationship('Product', back_populates='cart_item')

    def to_dict(self):
        return {
            'id': self.id,
            'productQuantity': self.product_quantity,
            'totalItemPrice': self.total_item_price,
            'price': self.price,
            'name': self.name,
            'description': self.description,
            'itemUrl': self.item_url,
            'productId': self.product_id,
            'cartId': self.cart_id,
        }


class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('products.id')), nullable=False)
    review = db.Column(db.Text, nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    date_time = db.Column(db.String, nullable=False)

    user = db.relationship('User', back_populates='review')
    product = db.relationship('Product', back_populates='review')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'productId': self.product_id,
            'review': self.review,
            'stars': self.stars,
            'dateTime': self.date_time,
            'user': self.user.to_dict()
        }


class Wishlist(db.Model):
    __tablename__ = 'wishlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('products.id')), nullable=False)

    user = db.relationship('User', back_populates='wishlist')
    product = db.relationship('Product', back_populates='wishlist')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'productId': self.product_id,
            'product': self.product
        }
