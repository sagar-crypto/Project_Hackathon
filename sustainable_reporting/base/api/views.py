from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse, HttpResponseBadRequest
from django.db import connection
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import BasicSignupSerializer, AdditionalDetailsSerializer, ShipmentSerializer
from rest_framework import status
import openai
from decouple import config
from .. import models


openai.api_key =config('OPEN_AI_KEY')

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
            return JsonResponse({'message': 'Login successful', 'user_type': 'supplier', 'user_id' : user_data[0]}, status=status.HTTP_200_OK)
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
        return Response(serializer.errors, status=status.HTTP_208_ALREADY_REPORTED)
    return Response({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


def get_last_signed_up_email():
    with connection.cursor() as cursor:
        cursor.execute("SELECT email,id  FROM custom_user ORDER BY id DESC LIMIT 1")
        row = cursor.fetchone()
    return row if row else None

@api_view(['POST'])
def additional_details_api(request):
    data = get_last_signed_up_email()
    email = data[0]
    id = data[1]
    if not email:
        return Response({'error': 'Email not found in session'}, status=status.HTTP_400_BAD_REQUEST)

    data = request.data.copy()  
    data['email'] = email
    user_id = id 

    serializer = AdditionalDetailsSerializer(data = data, context={'user_id': user_id})
    if serializer.is_valid():
        supplier = serializer.save()
        return Response({'message': 'Additional details saved', 'user_id': user_id}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def get_chat_completion(prompt):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # or another available model
        messages=[
            {"role": "system", "content": "You are a helpful assistant knowledgeable about the European Union Deforestation Regulation (EUDR)."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=150
    )
    return response['choices'][0]['message']['content'].strip()


def get_response(request):
    if request.method == 'POST':
        user_input = request.POST.get('user_input')
        response = get_chat_completion(user_input)
        return JsonResponse({'response': response})
    return JsonResponse({'response': 'Invalid request method'})


@api_view(['GET'])
def get_shipment_details(request, pk):
    user_id = pk

    try:
        supplier = models.Suplier.objects.get(user_id=user_id)
        supplier_id = supplier.supplier_id
        with connection.cursor() as cursor:
            cursor.execute(
                "select * from base_shipment where supplier_id_id = %s;",
                [supplier_id]
            )
            shipments = cursor.fetchone()
        return Response({'shipments_details': shipments}, status=status.HTTP_200_OK)
    
    except models.Suplier.DoesNotExist:
            return Response({'error': 'No supplier details found'}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST'])
def create_shipment(request):
   if request.method == 'POST':
        user_id = request.data.get('userId')
        if not user_id:
            return Response({"error": "User ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            supplier = models.Suplier.objects.get(user_id=user_id)
        except supplier.DoesNotExist:
            return Response({"error": "Supplier not found"}, status=status.HTTP_404_NOT_FOUND)

        # Copy request data and map the fields to the model's expected fields
        shipment_data = {
            'product_name': request.data.get('product_name'),
            'supplier_id': supplier.supplier_id, 
            'price': request.data.get('price'),
            'units_in_stock': request.data.get('units'),
            'country_of_production': request.data.get('country'),
            'DOP_manufacture': request.data.get('date'),
            'geolocation': request.data.get('geolocation'),
            'transport_mode': request.data.get('transport'),
            'carbon_emissions': request.data.get('carbonEmission'),
            'start_location': request.data.get('start_location'),
            'destination_location': request.data.get('destination_location'),
            'certificate_id' : request.data.get('certificate_id'),
            'proof_certificate_1': request.data.get('proof_certificate_1'),
            'proof_certificate_2': request.data.get('proof_certificate_2'),
            'self_confirmation': request.data.get('compliance'),
            'signature': request.data.get('signature'),
            'designation': request.data.get('designation'),
            'product_category': request.data.get('product_category'),
            'form_submited_date': request.data.get('form_submited_date')
        }

        serializer = ShipmentSerializer(data=shipment_data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


