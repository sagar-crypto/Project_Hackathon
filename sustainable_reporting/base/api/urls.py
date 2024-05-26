from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_api, name='api_login'),
    path('logout/', views.logout_api, name='api_logout'),
    path('signup/basic/', views.basic_signup_api, name='basic_signup'),
    path('signup/additional/', views.additional_details_api, name='additional_details'),
    path('submitform/', views.create_shipment, name='additional_details'),
    path('getshipmentdetails/<str:pk>/', views.get_shipment_details, name='get_shipment_details'),
]
