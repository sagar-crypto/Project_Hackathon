from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse, HttpResponseBadRequest
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
    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT * FROM custom_user WHERE username = %s AND password = %s",
            [username, password]
        )
        user_data = cursor.fetchone()

    if user_data:
        if user_data[4] == 'supplier':
            return JsonResponse({'message': 'Login successful', 'user_type': 'supplier'}, status=status.HTTP_200_OK)
        else:
            return JsonResponse({'message': 'Login successful', 'user_type': 'admin'})
    else:
        return HttpResponseBadRequest('Invalid credentials')

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


def get_last_signed_up_email():
    with connection.cursor() as cursor:
        cursor.execute("SELECT email FROM custom_user ORDER BY id DESC LIMIT 1")
        row = cursor.fetchone()
    return row[0] if row else None

@api_view(['POST'])
def additional_details_api(request):
    email = get_last_signed_up_email()
    if not email:
        return Response({'error': 'Email not found in session'}, status=status.HTTP_400_BAD_REQUEST)

    data = request.data.copy()  
    data['email'] = email  

    serializer = AdditionalDetailsSerializer(data=data)
    if serializer.is_valid():
        supplier = serializer.save()
        return Response({'message': 'Additional details saved'}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
