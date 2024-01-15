from django.core.management.base import BaseCommand
from books.models import Category


class Command(BaseCommand):
    help = "Populate the database with unique categories"

    def handle(self, *args, **options):
        categories = [
            "Fiction",
            "Mystery",
            "Romance",
            "Science Fiction",
            "Fantasy",
            "Thriller",
            "Historical Fiction",
            "Non-Fiction",
            "Biography",
            "Self-Help",
            "Science",
            "Business",
            "Travel",
            "Cookbooks",
            "Poetry",
            "Religion",
            "Philosophy",
            "Psychology",
            "Health and Wellness",
            "Parenting",
            "Art and Photography",
            "History",
            "Biography",
            "True Crime",
            "Adventure",
            "Young Adult",
            "Children's Picture Books",
            "Graphic Novels",
            "Science Fiction and Fantasy",
            "Horror",
            "Classics",
            "Memoir",
            "Mystery and Detective",
            "Romance",
            "Contemporary Fiction",
            "Literary Fiction",
            "Political Science",
            "Economics",
            "Reference",
            "Technology",
            "Science and Nature",
            "Home and Garden",
            "Fitness",
            "Crafts and Hobbies",
            "Education",
            "Sociology",
            "Music",
            "Sports",
            "Parenting,",
            "Biographies and Memoirs of Celebrities",
        ]  # List of unique categories
        for category in categories:
            Category.objects.get_or_create(name=category)
            self.stdout.write(
                self.style.SUCCESS(f"Successfully created category: {category}")
            )