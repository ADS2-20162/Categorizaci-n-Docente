# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-10-07 01:18
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auths', '0001_initial'),
        ('cat', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='persona',
            name='person',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='auths.Person', verbose_name='Person'),
        ),
        migrations.AlterField(
            model_name='persona',
            name='ap_materno',
            field=models.CharField(blank=True, max_length=60, null=True),
        ),
        migrations.AlterField(
            model_name='persona',
            name='ap_paterno',
            field=models.CharField(blank=True, max_length=60, null=True),
        ),
        migrations.AlterField(
            model_name='persona',
            name='doc_ident',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='persona',
            name='fecha_nac',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='persona',
            name='foto',
            field=models.ImageField(blank=True, null=True, upload_to='img'),
        ),
        migrations.AlterField(
            model_name='persona',
            name='nombres',
            field=models.CharField(blank=True, max_length=60, null=True),
        ),
    ]
