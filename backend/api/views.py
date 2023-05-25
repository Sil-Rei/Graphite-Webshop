from rest_framework.response import Response
from django.db.models import Q
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from base.models import Product, CartItem, Cart, UserReview
from django.contrib.auth.models import User
from django.shortcuts import get_list_or_404
from rest_framework import status
from .serializers import ProductSerializer, CartItemSerializer, CartSerializer

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token["username"] = user.username

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_cart(request):
    user = request.user
    cart = Cart.objects.get(user=user)
    serializer = CartSerializer(cart)
    return Response(serializer.data)


@api_view(["GET"])
def get_bestsellers(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)

    return Response(serializer.data)


@api_view(["GET"])
def get_product_by_id(request, product_id):
    product = Product.objects.get(id=product_id)
    serializer = ProductSerializer(product)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    user = request.user
    cart = Cart.objects.get(user=user)
    product = Product.objects.get(id=request.data["product_id"])
    quantity = int(request.data["quantity"])
    if quantity > product.stock_quantity:
        return Response("Not enough in stock", status=status.HTTP_400_BAD_REQUEST)
    elif quantity <= 0:
        return Response("Quantity must be positive", status=status.HTTP_400_BAD_REQUEST)
    new_cart_item = CartItem(cart=cart, product=product, quantity=quantity)
    new_cart_item.save()
    product.stock_quantity -= quantity
    product.save()
    return Response("Added to cart", status=status.HTTP_201_CREATED)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def remove_from_cart(request):
    print(request.data)
    user = request.user
    cart_item_id = request.data["itemId"]
    cart_id = request.data["cartId"]
    ownerOfCart = Cart.objects.get(id=cart_id).user
    if user != ownerOfCart:
        return Response(
            "No permissions to remove item from not owned cart",
            status=status.HTTP_403_FORBIDDEN,
        )
    cart_item = CartItem.objects.get(id=cart_item_id)
    product = cart_item.product
    product.stock_quantity += cart_item.quantity
    product.save()
    cart_item.delete()

    return Response("Removed Item", status=status.HTTP_202_ACCEPTED)


@api_view(["GET"])
def search_by_name(request, term):
    products = get_list_or_404(Product, Q(name__icontains=term))
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
def products_by_category(request, category):
    if category == "all":
        products = Product.objects.all()
    else:
        products = Product.objects.filter(category=category)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def submit_review(request):
    user = request.user
    product_id = request.data["productId"]
    product = Product.objects.get(id=product_id)
    stars = request.data["rating"]
    review = request.data["reviewText"]

    existing_review = UserReview.objects.filter(user=user, product=product).first()
    if existing_review:
        return Response(
            "You have already submitted a review for this product.",
            status=status.HTTP_400_BAD_REQUEST,
        )

    if stars > 5 or stars < 1:
        return Response("Invalid star rating", status=status.HTTP_406_NOT_ACCEPTABLE)

    if len(review) > 400:
        return Response("Review too long", status=status.HTTP_406_NOT_ACCEPTABLE)

    new_review = UserReview(user=user, product=product, stars=stars, review=review)
    new_review.save()
    return Response("Review created.", status=status.HTTP_201_CREATED)
