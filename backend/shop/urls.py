from django.urls import path, include
from . import views


urlpatterns = [
    path('users/', include ([
        path('', views.get_users, name='users'),
        path('login/', views.MyTokenObtainPairView.as_view(), name='my-token-obtain-pair'),
        path('register/', views.register_user, name='register'),
        path('update/<str:pk>/', views.update_user, name='update-user'),
        path('delete/<str:pk>/', views.delete_user, name='delete-user'),
        path('profile/', views.get_user_profile, name='user-profile'),
        path('profile/update/', views.update_user_profile, name='update-profile'),
        path('<str:pk>/', views.get_user_by_id, name='get-user'),
    ])),

    path('products/', include([
        path('', views.get_products, name='products'),
        path('create/', views.create_product, name='create-product'),
        path('upload/', views.update_image, name='upload-image'),
        path('top/', views.get_top_products, name='top-products'),
        path('<str:pk>/', views.get_product, name='product'),
        path('reviews/<str:pk>/', views.create_product_review, name='review-product'),
        path('update/<str:pk>/', views.update_product, name='update-product'),
        path('delete/<str:pk>/', views.delete_product, name='delete-product'),
    ])),
    
    path('orders/', include([
        path('', views.orders, name='orders'),
        path('add/', views.add_order_items, name='add-order-items'),
        path('myorders/', views.my_orders, name='my-orders'),
        path('deliver/<str:pk>/', views.update_order_to_delivered, name='delivered-order'),
        path('<str:pk>/', views.get_order_by_id, name='user-order'),
        path('<str:pk>/pay/', views.update_order_to_paid, name='pay-order'),
    ])),
]


   