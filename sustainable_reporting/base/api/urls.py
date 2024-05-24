from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_api, name='api_login'),
    path('logout/', views.logout_api, name='api_logout'),
    path('signup/', views.sign_up, name='signup'),
]
