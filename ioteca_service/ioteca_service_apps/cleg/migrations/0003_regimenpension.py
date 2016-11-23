# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-11-22 04:10
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cleg', '0002_auto_20160908_1541'),
    ]

    operations = [
        migrations.CreateModel(
            name='RegimenPension',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=60)),
                ('sigla', models.CharField(max_length=10)),
                ('descripcion', models.TextField()),
                ('estado', models.BooleanField(default=True)),
                ('campo_predefinido', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cleg.CampoPredefinido')),
            ],
            options={
                'verbose_name': 'R\xe9gimen Pension',
                'verbose_name_plural': 'R\xe9gimen de Pensiones',
            },
        ),
    ]
