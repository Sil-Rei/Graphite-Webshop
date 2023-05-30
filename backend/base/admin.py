from django.contrib import admin
from .models import Product, Cart, CartItem, UserReview, Purchase, PurchaseItem

# Register your models here.
admin.site.register(Product)
admin.site.register(Cart)
admin.site.register(CartItem)
admin.site.register(UserReview)
admin.site.register(PurchaseItem)
admin.site.register(Purchase)
