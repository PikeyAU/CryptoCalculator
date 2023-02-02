from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User

class LogoutView(APIView):
     permission_classes = (IsAuthenticated,)
     def post(self, request):
          
          try:
               refresh_token = request.data["refresh_token"]
               token = RefreshToken(refresh_token)
               token.blacklist()
               return Response(status=status.HTTP_205_RESET_CONTENT)
          except Exception as e:
               return Response(status=status.HTTP_400_BAD_REQUEST)

class GetUserInfo(APIView):
     permission_classes = (IsAuthenticated,)
     def get(self, request):
          user = request.user
          data = {
               "id": user.id,
               "username": user.username,
               "email": user.email,
               "first_name": user.first_name,
               "last_name": user.last_name,
          }
          return Response(data)

class UserRegister(APIView):
     def post(self, request):
          user = User.objects.create_user(
               username=request.data["username"],
               email=request.data["email"],
               first_name=request.data["first_name"],
               last_name=request.data["last_name"],
               password=request.data["password"],   
          )
          return Response(status=status.HTTP_201_CREATED)
