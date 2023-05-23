# Generated by Django 4.1.4 on 2023-05-22 17:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0006_userreview'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userreview',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to='base.product'),
        ),
    ]
