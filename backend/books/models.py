from django.db import models
import random 
# Create your models here.

class Author(models.Model):
    name = models.CharField(max_length=500)
    

class Category(models.Model):
    name = models.CharField(max_length=100)
    
    
class Books(models.Model):
    id=models.CharField(max_length=20, unique=True, primary_key=True)
    title = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)
    author = models.ManyToManyField(Author)
    description = models.TextField()
    published_date = models.DateField(null=True, blank=True)
    image_url = models.URLField() 
    price = models.DecimalField(max_digits=6, decimal_places=2, default=random.uniform(10, 100))
    quantity = models.PositiveIntegerField(default=random.randint(1, 10))


