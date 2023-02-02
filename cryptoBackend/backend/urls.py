from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from backend.views import LogoutView, GetUserInfo, UserRegister, AddCoinPortfolio, CreatePortfolio, GetUserPortfolio, CheckIfPortfolioExists

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('get/user/info', GetUserInfo.as_view(), name='get_user_info'),
    path('register/', UserRegister.as_view(), name='register'),
    path('user/add/coin/', AddCoinPortfolio.as_view(), name='add_coin'),
    path('user/create/portfolio/', CreatePortfolio.as_view(), name='create_portfolio'),
    path('user/get/portfolio/', GetUserPortfolio.as_view(), name='get_portfolio'),
    path('user/check/portfolio/', CheckIfPortfolioExists.as_view(), name='check_portfolio')
    
]


