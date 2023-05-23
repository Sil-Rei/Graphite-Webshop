from rest_framework import serializers
from base.models import Product, Cart, CartItem, UserReview
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "first_name", "last_name"]


class UserReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer()  # Use UserSerializer to include user details

    class Meta:
        model = UserReview
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    reviews = UserReviewSerializer(many=True)

    class Meta:
        model = Product
        fields = "__all__"


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = CartItem
        fields = "__all__"


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True)

    class Meta:
        model = Cart
        fields = ["user", "items"]
