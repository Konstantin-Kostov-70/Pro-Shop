from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework import status

from .models import Product, Order, OrderItem, ShippingAddress, Review
from .serializers import ProductSerializer, UserSerializer, UserSerializerWithToken, OrderSerializer
from datetime import datetime


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
   def validate(self, attrs):
       data = super().validate(attrs)

       serializer = UserSerializerWithToken(self.user).data
       for k, v in serializer.items():
           data[k] = v
       
       return data
    

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# =============== USER VIEWS =========================

@api_view(['POST'])
def register_user(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name = data['name'],
             username = data['email'],
             email = data['email'],
             password = make_password(data['password']),
        ) 

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exist'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
   user = request.user
   serializer = UserSerializer(user, many=False)
   return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']

    if data['password']:
        user.password = make_password(data['password'])
    user.save()

    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_user(request, pk):
    user = User.objects.get(id=pk)
    user.delete()

    return Response('User was Deleted!')


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_user_by_id(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_user(request, pk):
    user = User.objects.get(id=pk)

    data = request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    user.is_staff = data['is_admin']
   
    user.save()

    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)


# =============== PRODUCT VIEWS =========================


@api_view(['GET'])
def get_products(request):
    query = request.query_params.get('keyword')
    if query :
        products = Product.objects.filter(name__icontains=query)
    else:
        products = Product.objects.all()
    
    page = request.query_params.get('page')
    paginator = Paginator(products, 4)
 
    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1
    
    page = int(page)
    
    serializer = ProductSerializer(products, many=True)
    return Response({
        'products': serializer.data,
        'page': page, 
        'pages': paginator.num_pages
        })


@api_view(['GET'])
def get_top_products(request):
    products = Product.objects.filter(rating__gte=4).order_by('rating')[0:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_product(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_product(request):
    user = request.user
    product = Product.objects.create(
        user = user,
        name = 'Sample name',
        price = 0,
        brand = 'Sample brand',
        countInStock = 0,
        category = 'Sample Category', 
        description = '',
        specification = ''
    )
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)



@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_product(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']
    product.specification = data['specification']

    product.save()
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_product(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Product was deleted')


@api_view(['POST'])
@permission_classes([IsAdminUser])
def update_image(request):
    data = request.data
    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)
    product.image = request.FILES.get('image')
    product.save()
    return Response('Image was uploaded')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_product_review(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    already_exist = product.review_set.filter(user=user).exists()

    if already_exist :
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    elif data['rating'] == 0 :
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    else :
        review = Review.objects.create(
            user = user,
            product = product,
            name = user.first_name,
            rating = data['rating'],
            comment = data['comment'],
        )
        reviews = product.review_set.all()
        total = sum(review.rating for review in reviews)

        product.numReviews = len(reviews)
        product.rating = total / len(reviews)

        product.save()
        
        return Response('Review Added')


# =============== ORDER VIEWS =========================


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_order_items(request):
    user = request.user
    data = request.data

    order_items = data['orderItems']

    if order_items and len(order_items) == 0:
       return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
       
        order = Order.objects.create(
            user = user,
            paymentMethod = data['paymentMethod'],
            taxPrice = data['taxPrice'],
            shippingPrice = data['shippingPrice'],
            totalPrice = data['totalPrice'],
        )

        shippingAddress = ShippingAddress.objects.create(
            order = order,
            address = data['shippingAddress']['address'],
            city = data['shippingAddress']['city'],
            postalCode = data['shippingAddress']['postalCode'],
            country = data['shippingAddress']['country'], 
        )

        for x in order_items:
            product = Product.objects.get(_id=x['product'])

            item = OrderItem.objects.create(
                product = product,
                order = order,
                name = product.name,
                qty = x['qty'],
                price = x['price'],
                image = product.image.url,
            )
           
            product.countInStock -= int(item.qty)
            product.save()
        serializer = OrderSerializer(order, many=False)

    return Response(serializer.data)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_order_by_id(request, pk):
    user = request.user

    try:
        order = Order.objects.get(_id=pk)

        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        
        return Response({'detail': 'Not authorized view this order'}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return  Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_order_to_paid(request, pk):
    order = Order.objects.get(_id=pk )
    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()

    return Response('Order is paid')


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_order_to_delivered(request, pk):
    order = Order.objects.get(_id=pk )
    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()

    return Response('Order is delivered')


@api_view(['GET'])
@permission_classes([IsAdminUser])
def orders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_orders(request):
    user = request.user
    order = user.order_set.all()
    serializer = OrderSerializer(order, many=True)

    return Response(serializer.data)


