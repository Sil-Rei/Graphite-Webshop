from django.urls import path
from . import views
from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path("all-products", views.get_all_products),
    path("user-cart", views.get_user_cart),
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("products/<int:product_id>/", views.get_product_by_id),
    path("add-to-cart/", views.add_to_cart),
    path("remove-from-cart/", views.remove_from_cart),
    path("search/<str:term>/", views.search_by_name),
    path("products/category/<str:category>/", views.products_by_category),
]
