# Generated by Django 4.2.6 on 2023-10-27 13:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0002_book_delete_booklist'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='price',
            field=models.DecimalField(decimal_places=2, default=16.601553968571594, max_digits=6),
        ),
        migrations.AlterField(
            model_name='book',
            name='quantity',
            field=models.PositiveIntegerField(default=9),
        ),
    ]
