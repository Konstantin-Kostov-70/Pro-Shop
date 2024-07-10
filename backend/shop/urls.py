from django.urls import path, include
from . import views


urlpatterns = [
    path('users/', include ([
        path('', views.get_users, name='users'),
        path('login/', views.MyTokenObtainPairView.as_view(), name='my_token_obtain_pair'),
        path('register/', views.register_user, name='register'),
        path('profile/', views.get_user_profile, name='user-profile'),
        path('profile/update/', views.update_user_profile, name='update-profile'),
    ])),

    path('products/', include([
        path('', views.get_products, name='products'),
        path('<str:pk>/', views.get_product, name='product'),
    ])),
    
    path('orders/', include([
        path('myorders/', views.my_orders, name='my_orders'),
        path('add/', views.add_order_items, name='add-order-items'),
        path('<str:pk>/', views.get_order_by_id, name='user_order'),
        path('<str:pk>/pay/', views.update_order_to_paid, name='pay_order'),
    ])),
]


   