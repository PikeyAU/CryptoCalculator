from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class UserPortfolio(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.CharField(null = True, blank = True, max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Holding(models.Model):
    user_portfolio = models.ForeignKey(UserPortfolio, on_delete=models.CASCADE)
    coin_name = models.CharField(max_length=100)
    coin_symbol = models.CharField(max_length=100)
    coin_quantity = models.FloatField()
    coin_buy_price = models.FloatField()
    coin_buy_date = models.DateTimeField()

    