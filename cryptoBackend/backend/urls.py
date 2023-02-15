from django.contrib import admin
from django.urls import path, include

from backend.views import LogoutView, GetUserInfo, UserRegister, AddCoinPortfolio, CreatePortfolio, GetUserPortfolio, CheckIfPortfolioExists, GetPortfolioHolding, DeleteHolding, EditHolding

urlpatterns = [
    path('logout/', LogoutView.as_view(), name='logout'),
    path('get/user/info', GetUserInfo.as_view(), name='get_user_info'),
    path('register/', UserRegister.as_view(), name='register'),
    path('user/add/coin/', AddCoinPortfolio.as_view(), name='add_coin'),
    path('user/create/portfolio/', CreatePortfolio.as_view(), name='create_portfolio'),
    path('user/get/portfolio/', GetUserPortfolio.as_view(), name='get_portfolio'),
    path('user/check/portfolio/', CheckIfPortfolioExists.as_view(), name='check_portfolio'),
    path('user/get/holdings/', GetPortfolioHolding.as_view(), name='get_holdings' ),
    path('user/delete/holding/', DeleteHolding.as_view(), name='delete_holding'),
    path('user/edit/holding/', EditHolding.as_view(), name='edit_holding')
    
]


