from django.shortcuts import render
from rest_framework import generics
from .models import Books, Author, Category
from .serializers import BookSerializer, AuthorSerializer, CategorySerializer

class BookList(generics.ListCreateAPIView):
    queryset = Books.objects.all()
    serializer_class = BookSerializer

class AuthorList(generics.ListCreateAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

class CategoryList(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
