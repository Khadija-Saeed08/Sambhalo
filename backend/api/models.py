from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class Expense(models.Model):
    CATEGORY_CHOICES = [
        ('Food', 'Food'),
        ('Transport', 'Transport'),
        ('Entertainment', 'Entertainment'),
        ('Bills', 'Bills'),
        ('Other', 'Other'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="expense")
    title = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='Other')
    date = models.DateField(default=timezone.now)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.category})"
    
class Income(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="income")
    source=models.CharField(max_length=100)
    amount=models.DecimalField(max_digits=10,decimal_places=2)
    date = models.DateField(default=timezone.now)
    savings_goal = models.ForeignKey(
        'Savings', on_delete=models.SET_NULL, null=True, blank=True,default='none'
    )
    allocated_amount = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True, default=0
    )

    def __str__(self):
        return f"{self.source} - {self.amount}"
    
class Savings(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="savings")
    goal=models.CharField(max_length=100)
    amount=models.DecimalField(max_digits=10,decimal_places=2)
    startDate=models.DateField(default=timezone.now)
    endDate=models.DateField(default=timezone.now)
    amountSaved=models.DecimalField(max_digits=10,decimal_places=2)

    def __str__(self):
        return f"{self.goal} - {self.amount}"
