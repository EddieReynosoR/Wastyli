# Generated by Django 4.2.7 on 2023-11-12 21:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_remove_user_bio'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='cover_image',
        ),
    ]
