# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-10-06 16:52
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('gperfil', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Adjunto',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url', models.CharField(max_length=50)),
            ],
            options={
                'verbose_name_plural': 'Adjuntos',
                'verbose_name': 'Adjunto',
            },
        ),
        migrations.CreateModel(
            name='Observacion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('observacion', models.CharField(max_length=200)),
                ('estado', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name_plural': 'Observacions',
                'verbose_name': 'Observacion',
            },
        ),
        migrations.CreateModel(
            name='Registro',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('estado_data', models.CharField(max_length=50)),
                ('estado', models.BooleanField(default=True)),
                ('competenciaperfil', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gperfil.CompetenciaPerfil')),
                ('escaladimension', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gperfil.EscalaDimension')),
            ],
            options={
                'verbose_name_plural': 'Registros',
                'verbose_name': 'Registro',
            },
        ),
        migrations.AddField(
            model_name='observacion',
            name='registro',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gdata.Registro'),
        ),
        migrations.AddField(
            model_name='adjunto',
            name='registro',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gdata.Registro'),
        ),
    ]