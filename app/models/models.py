from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


def add_prefix_for_prod(attr):
    if environment == "production":
        return f"{SCHEMA}.{attr}"
    else:
        return attr


cart_products = db.Table(
    "cart_products",
    db.Column(
        "product_id",
        db.Integer,
        db.ForeignKey("products.id"),
        primary_key=True
    ),
    db.Column(
        "cart_id",
        db.Integer,
        db.ForeignKey("carts.id"),
        primary_key=True
    )
)


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(15))
    address = db.Column(db.String(40))
    city = db.Column(db.String(40))
    state = db.Column(db.String(40))
    country = db.Column(db.String(40), default='United States')
    zip_code = db.Column(db.Integer)

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

    phone = db.Column(db.String(15))
    address = db.Column(db.String(40))
    city = db.Column(db.String(40))
    state = db.Column(db.String(40))
    country = db.Column(db.String(40), default='United States')
    zip_code = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)

    user = db.relationship('User', back_populates='address')


class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    origin = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('categories.id')), nullable=False)

    product_images = db.relationship(
        'ProductImage', back_populates='product', cascade='all, delete-orphan')
    category = db.relationship('Category', back_populates='product')
    cart = db.relationship(
        'Cart', secondary='cart_products', back_populates='product')
    review = db.relationship('Review', back_populates='product')
    wishlist = db.relationship('Wishlist', back_populates='product')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'origin': self.origin,
            'price': self.price,
            'categoryId': self.category_id
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
            'subCategory': self. sub_category
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
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    total_price = db.Column(db.Float, nullable=False)

    user = db.relationship('User', back_populates='cart')
    order = db.relationship('Order', back_populates='cart')
    product = db.relationship(
        'Product', secondary='cart_products', back_populates='cart')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'productId': self.product_id,
            'productQuantity': self.product_quantity,
            'price': self.price,
            'totalPrice': self.total_price,
            'orderId': self.order_id
        }


class CartItem(db.Model):
    __tablename__ = 'cart_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_quantity = db.Column(db.Integer, nullable=False)
    total_item_price = db.Column(db.Float, nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('products.id')), nullable=False)
    cart_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('carts.id')), nullable=False)


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

    user = db.relationship('User', back_populates='review')
    product = db.relationship('Product', back_populates='review')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'productId': self.product_id,
            'review': self.review,
            'stars': self.stars
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
            'productId': self.product_id
        }
