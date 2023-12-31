# Generated by Django 4.2.7 on 2023-11-13 04:04

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_remove_user_cover_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='following',
        ),
        migrations.AddField(
            model_name='user',
            name='publications',
            field=models.ManyToManyField(blank=True, related_name='publication', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='user',
            name='groups',
            field=models.ManyToManyField(blank=True, related_name='group', to=settings.AUTH_USER_MODEL),
        ),
    ]
