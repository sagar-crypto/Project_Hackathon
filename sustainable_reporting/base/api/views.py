from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.db import connection
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import BasicSignupSerializer, AdditionalDetailsSerializer
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
def basic_signup_api(request):
    if request.method == 'POST':
        serializer = BasicSignupSerializer(data=request.data)
        if serializer.is_valid():
            request.session['email'] = serializer.validated_data.get('email')
            user = serializer.save()
            return Response({'message': 'Basic signup successful'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['POST'])
def additional_details_api(request):
    if request.method == 'POST':
        serializer = AdditionalDetailsSerializer(data=request.data)
        if serializer.is_valid():
            email = request.session.get('email')
            serializer.validated_data['email'] = email
            supplier = serializer.save()
            return Response({'message': 'Additional details saved'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
