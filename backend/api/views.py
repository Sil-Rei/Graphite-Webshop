from rest_framework.response import Response
from django.db.models import Q, Count
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from base.models import (
    Product,
    CartItem,
    Cart,
    UserReview,
    Purchase,
    PurchaseItem,
    Coupon,
)
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.shortcuts import get_list_or_404
from .emailutils import Emailutils
from django.utils.crypto import get_random_string
from rest_framework import status
from .serializers import (
    ProductSerializer,
    CartItemSerializer,
    CartSerializer,
    RegisterSerializer,
    AddProductSerializer,
    UserSerializer,
    PurchaseSerializer,
    UserReviewSerializer,
)
from django.utils import timezone
from datetime import timedelta

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


@api_view(["POST"])
def register_user(request):
    print(request.data)
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        Cart.objects.create(user=user)
        return Response("User registered", status=status.HTTP_201_CREATED)
    return Response(
        "Failed registration, username already exists",
        status=status.HTTP_400_BAD_REQUEST,
    )


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

    # check if review is a verified purchase, if so add it
    reviews = serializer.data["reviews"]
    for review in reviews:
        username = review["user"]["username"]
        purchase = Purchase.objects.filter(
            user__username=username, items__product=product
        ).first()
        if purchase:
            review["verified_purchase"] = True
        else:
            review["verified_purchase"] = False

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


@api_view(["GET"])
@permission_classes([IsAdminUser])
def is_admin(request):
    return Response("admin", status=status.HTTP_200_OK)


@api_view(["PATCH"])
@permission_classes([IsAdminUser])
def update_product(request):
    product_id = request.data["data"]["id"]
    updated_data = request.data["data"]

    try:
        product = Product.objects.get(id=product_id)
        product.name = updated_data.get("name", product.name)
        product.price = updated_data.get("price", product.price)
        product.stock_quantity = updated_data.get(
            "stock_quantity", product.stock_quantity
        )

        product.save()
        return Response("Product updated successfully", status=status.HTTP_202_ACCEPTED)
    except Product.DoesNotExist:
        return Response("Product not found", status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response(str(e), status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def delete_product(request):
    product_id = request.query_params.get("id")

    try:
        product = Product.objects.get(id=product_id)
        product.delete()
        return Response("Product deleted successfully", status.HTTP_200_OK)
    except Product.DoesNotExist:
        return Response("Product not found", status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response(str(e), status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def make_purchase(request):
    user = request.user
    cart = get_object_or_404(Cart, user=user)
    cart_items = cart.items.all()
    purchase = Purchase.objects.create(user=user)

    for cart_item in cart_items:
        product = cart_item.product
        quantity = cart_item.quantity
        PurchaseItem.objects.create(
            purchase=purchase, product=product, quantity=quantity
        )

    cart.items.all().delete()
    return Response("Purchase successful", status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_product(request):
    print(request.data)
    serializer = AddProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def get_all_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_purchases(request):
    user = request.user
    purchases = Purchase.objects.filter(user=user)
    serializer = PurchaseSerializer(purchases, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_reviews(request):
    user = request.user
    reviews = UserReview.objects.filter(user=user)
    serializer = UserReviewSerializer(reviews, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_user_review(request):
    print(request.data)
    user = request.user
    review_id = request.query_params.get("id")

    try:
        review = UserReview.objects.get(user=user, id=review_id)
        review.delete()
        return Response(status=status.HTTP_202_ACCEPTED)
    except UserReview.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_user(request):
    username = request.query_params.get("username")
    try:
        user = User.objects.get(username=username)
        user.delete()
        return Response("User deleted successfully", status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response("User not found", status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def get_sales_data(request):
    end_date = timezone.now().date()
    start_date = end_date - timedelta(days=29)

    sales_data = (
        Purchase.objects.filter(purchase_date__range=(start_date, end_date))
        .values("purchase_date")
        .annotate(total_sales=Count("id"))
    )

    response_data = [
        {"date": item["purchase_date"], "sales": item["total_sales"]}
        for item in sales_data
    ]

    return Response(response_data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def sync_cart(request):
    user = request.user
    cart = Cart.objects.get(user=user)

    items = request.data["data"]

    cart.items.all().delete()

    for item in items:
        product_id = item.get("product").get("id")
        quantity = int(item.get("quantity"))

        product = Product.objects.get(id=product_id)

        if quantity > product.stock_quantity:
            return Response("Not enough in stock", status=status.HTTP_400_BAD_REQUEST)
        elif quantity <= 0:
            return Response(
                "Quantity must be positive", status=status.HTTP_400_BAD_REQUEST
            )

        new_cart_item = CartItem(cart=cart, product=product, quantity=quantity)
        new_cart_item.save()

        product.stock_quantity -= quantity
        product.save()

    return Response("Cart synchronized", status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def cart_update_quantity(request):
    user = request.user
    print(request.data)
    cart_item_id = request.data["id"]
    cart_item = CartItem.objects.get(id=cart_item_id)
    new_quantity = int(request.data["newQuantity"])
    if new_quantity > cart_item.product.stock_quantity or new_quantity <= 0:
        return Response("Invalid quantity", status=status.HTTP_403_FORBIDDEN)
    cart_item.quantity = new_quantity
    cart_item.save()
    return Response("Updated quantity", status.HTTP_200_OK)


@api_view(["POST"])
def subscribe_to_newsletter(request):
    print("received")
    to = request.data["email"]
    subject = "graphite - Welcome to our newsletter"

    coupon_code = get_random_string(length=8)

    # Create a new coupon
    coupon = Coupon.objects.create(email=to, code=coupon_code, discount=10)

    body = f"Hey mate,\n\nThank you for signing up for our graphite newsletter. Here is your 10% coupon code as small thank you: \n\n{coupon}\n\nBest regards,\nYour graphite Team"

    # Send the email
    print("trying send")
    Emailutils.send_email(to=to, subject=subject, body=body)
    print("send?")

    return Response(
        {"message": "Email sent and coupon generated successfully"}, status=200
    )
