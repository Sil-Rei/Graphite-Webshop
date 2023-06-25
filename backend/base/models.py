from django.db import models
from django.contrib.auth.models import User


class Product(models.Model):
    name = models.CharField(max_length=200)
    price = models.FloatField()
    image = models.ImageField(upload_to="product_images/", blank=True, null=True)
    stock_quantity = models.PositiveIntegerField(default=0)
    category = models.CharField(max_length=200, default="miscellaneous")

    def __str__(self):
        return self.name


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return "Cart of " + self.user.username


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name="items", on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)


class UserReview(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="reviews"
    )
    stars = models.IntegerField()
    review = models.TextField()
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Review of {self.product.name} by {self.user.username}"


class Purchase(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    purchase_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Purchase {self.id} by {self.user.username}"


class PurchaseItem(models.Model):
    purchase = models.ForeignKey(
        Purchase, on_delete=models.CASCADE, related_name="items"
    )
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"Purchase Item {self.id} (Purchase: {self.purchase.id})"


class Coupon(models.Model):
    code = models.CharField(max_length=50, unique=True)
    discount = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    email = models.EmailField(unique=True)
    is_used = models.BooleanField(default=False)

    def __str__(self):
        return self.code
