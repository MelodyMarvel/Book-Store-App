from django.core.management.base import BaseCommand
from books.models import Category, Books, Author
import requests
from random import randint,uniform
from datetime import datetime


class Command(BaseCommand):
    help = "Populate the database with books from Google Books based on categories"

    def handle(self, *args, **options):
        categories = Category.objects.all()

        for category in categories:
            self.stdout.write(self.style.SUCCESS(f"Fetching books for category: {category.name}"))
            self.fetch_books_for_category(category)

    def fetch_books_for_category(self, category):
        # Define your Google Books API URL with the 'q' parameter set to the category name
        api_url = "https://www.googleapis.com/books/v1/volumes"
        params = {
            "q": f"subject:{category.name}",
            "maxResults": 20,  # Adjust as needed
            "key": "AIzaSyC2RBDtMq163rcWyIULTXC8Us1KGIxVJpg"
        }

        
        response = requests.get(api_url, params=params)

        if response.status_code == 200:
            data = response.json().get("items", [])
            for book_data in data:
                self.process_book_data(category, book_data)
        else:
            self.stdout.write(self.style.ERROR(f"Failed to fetch books for category: {category.name}"))

    def process_book_data(self, category, book_data):
        volume_info = book_data.get("volumeInfo")
        # Convert the received date string to a datetime.date object
        published_date_str = volume_info.get("publishedDate", "")
        try:
            published_date = datetime.strptime(published_date_str, "%Y-%m-%d").date()
        except ValueError:
            published_date = None  # Handle the case where the date format is invalid or missing
        id = book_data["id"]
        title = book_data["volumeInfo"]["title"]
        description = book_data["volumeInfo"].get("description", "")
        author = book_data["volumeInfo"].get("authors", [])
        image_url = book_data["volumeInfo"].get("imageLinks", {})
        image = image_url.get("thumbnail", "")
        quantity= randint(1,20)
        price = round(uniform(10, 100), 2)
        
        print(book_data)
        
        authors = []
        
        for author_name in authors:
            author = Author.objects.create(name=author_name)
            authors.append(author)
      
      
        try:
            Books.objects.get(id=id)
        except Books.DoesNotExist:
            book = Books.objects.create(
            id=id,
            title=title,
            description=description,
            category=category,
            image_url=image,
            published_date=published_date,
            quantity=quantity,
            price=price,
        )

            if book:
                book.author.set(authors)
                self.stdout.write(self.style.SUCCESS(f"Successfully created book: {book.title}"))