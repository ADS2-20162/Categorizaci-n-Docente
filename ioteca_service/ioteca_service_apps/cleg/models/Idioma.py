from django.db import models
from .CampoPredefinido import CampoPredefinido

class Idioma (models.Model):

    nombre = models.CharField(max_length=60)
    estado =  models.BooleanField(default=True)
    campo_predefinido = models.ForeignKey(CampoPredefinido)

    class Meta:
        verbose_name = "Idioma"
        verbose_name_plural = "Idiomas"

    def __str__(self):
        return u'%s' % self.nombre
