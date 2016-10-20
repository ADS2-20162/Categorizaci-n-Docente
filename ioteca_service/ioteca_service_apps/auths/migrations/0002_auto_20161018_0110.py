# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-10-18 01:10
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('auths', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='PhotoUser',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('photo', models.ImageField(blank=True, default='photouser/default.png', null=True, upload_to='photousers', verbose_name='Photo')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='created at')),
                ('updated_at', models.DateTimeField(auto_now=True, null=True, verbose_name='updated at')),
            ],
            options={
                'verbose_name_plural': 'Fotos de Usuarios',
                'verbose_name': 'Photouser',
            },
        ),
        migrations.RemoveField(
            model_name='person',
            name='photo',
        ),
        migrations.AlterField(
            model_name='user',
            name='person',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user', to='auths.Person', verbose_name='Person'),
        ),
        migrations.AddField(
            model_name='photouser',
            name='user',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='photouser', to=settings.AUTH_USER_MODEL),
        ),
    ]
