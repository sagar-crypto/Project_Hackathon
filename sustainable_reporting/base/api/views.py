from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import SignupSerializer
from rest_framework import status

@api_view(['POST'])
def login_api(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        if user.user_type == 'supplier':
            return JsonResponse({'message': 'Login successful', 'user_type': 'supplier'})
        else:
            return JsonResponse({'message': 'Login successful', 'user_type': 'admin'})
    else:
        return Response({'error': 'Invalid credentials'}, status=400)

@api_view(['POST'])
def logout_api(request):
    logout(request)
    return JsonResponse({'message': 'Logout successful'})

@api_view(['POST'])
def sign_up(request):
    signupData = SignupSerializer(data = request.data)
    if signupData.is_valid():
        user = signupData.save()
        return Response({'message': 'Signup successful', 'user_id': user.id}, status=status.HTTP_201_CREATED)
    return Response(signupData.errors, status=status.HTTP_400_BAD_REQUEST)
