# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-10-07 16:12
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gdata', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='registro',
            name='estado',
            field=models.BooleanField(default=False),
        ),
    ]
