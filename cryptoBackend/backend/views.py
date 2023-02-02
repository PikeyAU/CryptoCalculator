from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .models import UserPortfolio, Holding

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


class AddCoinPortfolio(APIView):
     permission_classes = (IsAuthenticated,)
     def post(self, request):
          portfolio = UserPortfolio.objects.get(user=request.user)
          coin = request.data["coin"]
          amount = request.data["amount"]
          buyprice = request.data["buyprice"]
          buydate = request.data["buydate"]

          Holding.objects.create(user_portfolio = portfolio, coin_name=coin, coin_quantity = amount, coin_buy_price = buyprice, coin_buy_date = buydate)
          return Response("Coin Added to Portfolio")


class CreatePortfolio(APIView):
     permission_classes = (IsAuthenticated,)
     def post(self, request):
          user = request.user
          UserPortfolio.objects.create(user=user)
          return Response("Success")
     
class GetUserPortfolio(APIView):
     permission_classes = (IsAuthenticated,)
     def get(self, request):
          user = request.user
          data = UserPortfolio.objects.get(user=user).created_at
          return Response(data)

class CheckIfPortfolioExists(APIView):
     permission_classes = (IsAuthenticated,)
     def get(self, request):
          user = request.user
          try:
               UserPortfolio.objects.get(user=user)
               return Response("Portfolio Exists")
          except:
               return Response("Portfolio Does Not Exist")

class GetPortfolioHolding(APIView):
     permission_classes = (IsAuthenticated,)
     def get(self, request):
          user = request.user
          portfolio = UserPortfolio.objects.get(user=user)
          holdings = Holding.objects.filter(user_portfolio=portfolio)
          data = []
          for holding in holdings:
               data.append({
                    "id": holding.id,
                    "coin_name": holding.coin_name,
                    "coin_quantity": holding.coin_quantity,
                    "coin_buy_price": holding.coin_buy_price,
                    "coin_buy_date": holding.coin_buy_date,
               })
          return Response(data)