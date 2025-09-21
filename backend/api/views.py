from django.shortcuts import render
from rest_framework import viewsets
from .models import Expense,Income,Savings
from .serializers import ExpenseSerializer,IncomeSerializer,SavingsSerializer,UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Sum
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics

class ExpenseViewSet(viewsets.ModelViewSet):
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Return only expenses for the logged-in user
        return Expense.objects.filter(user=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        # Automatically assign the logged-in user when creating
        serializer.save(user=self.request.user)

class IncomeViewSet(viewsets.ModelViewSet):
    serializer_class = IncomeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Income.objects.filter(user=self.request.user).order_by('-date')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class SavingsViewSet(viewsets.ModelViewSet):
    serializer_class = SavingsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Savings.objects.filter(user=self.request.user).order_by('-startDate')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


@api_view(['GET'])
def expenses_summary(request):
    # Optional date filters
    start_date = request.GET.get('start_date')
    end_date = request.GET.get('end_date')

    expenses = Expense.objects.filter(user=request.user)
    if start_date and end_date:
        expenses = expenses.filter(date__range=[start_date, end_date])

    # Group by category and sum amounts
    totals = expenses.values('category').annotate(total=Sum('amount'))

    return Response(totals)

@api_view(['GET'])
def income_summary(request):
    # Optional date filters
    start_date = request.GET.get('start_date')
    end_date = request.GET.get('end_date')

    income = Income.objects.filter(user=request.user)
    if start_date and end_date:
        income = income.filter(date__range=[start_date, end_date])

    # Group by category and sum amounts
    totals = income.values('source').annotate(total=Sum('amount'))

    return Response(totals)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]