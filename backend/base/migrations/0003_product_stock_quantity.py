# Generated by Django 4.1.4 on 2023-05-15 12:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_cart_cartitem'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='stock_quantity',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
