from django.urls import path
from . import views
from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path("bestsellers", views.get_bestsellers),
    path("user-cart", views.get_user_cart),
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("products/<int:product_id>/", views.get_product_by_id),
    path("add-to-cart/", views.add_to_cart),
    path("remove-from-cart/", views.remove_from_cart),
    path("search/<str:term>/", views.search_by_name),
    path("products/category/<str:category>/", views.products_by_category),
    path("submit-review", views.submit_review),
    path("register/", views.register_user),
    path("product/update/", views.update_product),
    path("product/delete/", views.delete_product),
    path("is-admin/", views.is_admin),
    path("product/add/", views.add_product),
    path("purchase/", views.make_purchase),
    path("purchases/user/", views.get_user_purchases),
    path("reviews/user/delete/", views.delete_user_review),
    path("reviews/user/", views.get_user_reviews),
    path("users/all/", views.get_all_users),
    path("data/sales/", views.get_sales_data),
    path("user/delete/", views.delete_user),
    path("sync-cart/", views.sync_cart),
    path("cart/update-quantity/", views.cart_update_quantity),
    path("newsletter/subscribe/", views.subscribe_to_newsletter),
    path("coupon/validate/", views.validate_coupon),
]
