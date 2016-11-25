# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-11-21 23:07
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('cleg', '0001_initial'),
        ('rleg', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='datacampo',
            name='elemento_campo',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='rleg.ElementoCampo'),
        ),
        migrations.AddField(
            model_name='codigopostal',
            name='campo_predefinido',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cleg.CampoPredefinido'),
        ),
        migrations.AddField(
            model_name='categoriaacademica',
            name='campo_predefinido',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cleg.CampoPredefinido'),
        ),
        migrations.AddField(
            model_name='cargoocupado',
            name='campo_predefinido',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cleg.CampoPredefinido'),
        ),
        migrations.AddField(
            model_name='campopropiedadform',
            name='campo',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cleg.Campo'),
        ),
        migrations.AddField(
            model_name='campopropiedadform',
            name='propiedad_form',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cleg.PropiedadForm'),
        ),
        migrations.AddField(
            model_name='campopredefinido',
            name='tipo_campo',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cleg.TipoCampo'),
        ),
        migrations.AddField(
            model_name='campo',
            name='tipo_campo',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cleg.TipoCampo'),
        ),
    ]
