from rest_framework import serializers
from .models import Expense,Income,Savings
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'
        extra_kwargs = {"user": {"read_only": True}}

class IncomeSerializer(serializers.ModelSerializer):
    savings_goal_name = serializers.SerializerMethodField()
    class Meta:
        model = Income
        fields = ('id', 'source', 'amount', 'date', 'allocated_amount', 'savings_goal', 'savings_goal_name','user')
        extra_kwargs = {"user": {"read_only": True}}
    
    def get_savings_goal_name(self, obj):
        if obj.savings_goal:
            return obj.savings_goal.goal
        return None

class SavingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Savings
        fields = '__all__'
        extra_kwargs = {"user": {"read_only": True}}