from django.db import models
from django.contrib.auth.models import User


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return "Cart of " + self.user.username


class Product(models.Model):
    name = models.CharField(max_length=200)
    price = models.FloatField()
    image = models.ImageField(upload_to="product_images/", blank=True, null=True)
    stock_quantity = models.PositiveIntegerField(default=0)
    category = models.CharField(max_length=200, default="miscellaneous")

    def __str__(self):
        return self.name


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
