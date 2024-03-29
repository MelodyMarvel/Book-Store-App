# Generated by Django 4.2.6 on 2023-10-27 16:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0013_alter_book_price_alter_book_quantity'),
    ]

    operations = [
        migrations.CreateModel(
            name='Books',
            fields=[
                ('id', models.CharField(max_length=20, primary_key=True, serialize=False, unique=True)),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('published_date', models.DateField()),
                ('image_url', models.URLField()),
                ('price', models.DecimalField(decimal_places=2, default=68.94876037911166, max_digits=6)),
                ('quantity', models.PositiveIntegerField(default=7)),
                ('author', models.ManyToManyField(to='books.author')),
                ('category', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='books.category')),
            ],
        ),
        migrations.DeleteModel(
            name='Book',
        ),
    ]
