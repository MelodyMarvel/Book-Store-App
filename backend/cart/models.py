# from django.db import models
# from books.models import Book  

# class Cart(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)  # melody create a user model
#     items = models.ManyToManyField(Book, through='CartItem')

# class CartItem(models.Model):
#     cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
#     book = models.ForeignKey(Book, on_delete=models.CASCADE)
#     quantity = models.PositiveIntegerField(default=1)

