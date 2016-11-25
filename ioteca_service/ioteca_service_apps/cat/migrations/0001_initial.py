# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-11-21 23:07
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auths', '0001_initial'),
        ('cgen', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CategoriaLegajo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre_categoria', models.CharField(max_length=50)),
                ('descripcion', models.CharField(max_length=100)),
                ('estado', models.BooleanField(default=True)),
            ],
            options={
                'verbose_name_plural': 'Categorias de Legajos',
                'verbose_name': 'Categoria de Legajo',
            },
        ),
        migrations.CreateModel(
            name='CategoriaLegajoDetalle',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('categoria_legajo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cat.CategoriaLegajo')),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cgen.Item')),
                ('seccion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cgen.Seccion')),
                ('sub_item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cgen.SubItem')),
            ],
            options={
                'verbose_name_plural': 'Categorias de Legajos Detalles',
                'verbose_name': 'Categoria de Legajo Detalle',
            },
        ),
        migrations.CreateModel(
            name='EstadoCivil',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=60)),
                ('estado', models.BooleanField(default=True)),
            ],
            options={
                'verbose_name_plural': 'Estados Civiles',
                'verbose_name': 'Estado Civil',
            },
        ),
        migrations.CreateModel(
            name='Nacionalidad',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=60)),
                ('estado', models.BooleanField(default=True)),
            ],
            options={
                'verbose_name_plural': 'Nacionalidades',
                'verbose_name': 'Nacionalidad',
            },
        ),
        migrations.CreateModel(
            name='Persona',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombres', models.CharField(blank=True, max_length=60, null=True)),
                ('ap_paterno', models.CharField(blank=True, max_length=60, null=True)),
                ('ap_materno', models.CharField(blank=True, max_length=60, null=True)),
                ('direccion', models.CharField(max_length=200)),
                ('doc_ident', models.CharField(blank=True, max_length=10, null=True)),
                ('celular', models.CharField(max_length=10)),
                ('email', models.EmailField(max_length=254)),
                ('fecha_nac', models.DateField(blank=True, null=True)),
                ('lugar_nac', models.CharField(max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('estado_civil', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cat.EstadoCivil')),
                ('nacionalidad', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cat.Nacionalidad')),
                ('person', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='auths.Person', verbose_name='Person')),
            ],
            options={
                'verbose_name_plural': 'Personas',
                'verbose_name': 'Persona',
            },
        ),
        migrations.CreateModel(
            name='PersonaCategoria',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('estado', models.BooleanField(default=True)),
                ('categoria_legajo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cat.CategoriaLegajo')),
                ('persona', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cat.Persona')),
            ],
            options={
                'verbose_name_plural': 'Personas Categorias',
                'verbose_name': 'Persona Categoria',
            },
        ),
    ]
