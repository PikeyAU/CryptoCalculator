from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
import json

# Create your views here.
@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data['username']
        password = data['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'User logged in successfully'})
        else:
            return JsonResponse({'message': 'Invalid credentials'})
    else:
        return JsonResponse({'message': 'Invalid request method'})

@csrf_exempt
def register_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data['username']
        password = data['password']
        email = data['email']
        user = User.objects.create_user(username, email, password)
        user.save()
        return JsonResponse({'message': 'User registered successfully'})
    else:
        return JsonResponse({'message': 'Invalid request method'})

def logout_view(request):
    logout(request)
    return JsonResponse({'message': 'User logged out successfully'})
