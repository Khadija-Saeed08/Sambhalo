from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ExpenseViewSet,IncomeViewSet,SavingsViewSet
from . import views

router = DefaultRouter()
router.register(r'expenses', ExpenseViewSet,basename='expenses')
router.register(r'income', IncomeViewSet,basename='income')
router.register(r'savings', SavingsViewSet,basename='savings')

urlpatterns = [
    path('', include(router.urls)),
    path('expenses-summary/', views.expenses_summary, name='expenses-summary'),
    path('income-summary/', views.income_summary, name='income-summary'),

]