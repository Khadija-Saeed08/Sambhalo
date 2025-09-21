from django.contrib import admin

# Register your models here.
from .models import Income, Expense,Savings
admin.site.register([Income, Expense,Savings])