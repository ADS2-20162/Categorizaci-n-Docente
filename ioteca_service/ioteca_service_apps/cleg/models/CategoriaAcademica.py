from django.db import models
from .CampoPredefinido import CampoPredefinido

class CategoriaAcademica(models.Model):

    nombre = models.CharField(max_length=60)
    sigla = models.CharField(max_length=10)
    descripcion = models.TextField(max_length=60)
    estado =  models.BooleanField(default=True)
    campo_predefinido = models.ForeignKey(CampoPredefinido)

    class Meta:
        verbose_name = "Catergoria Academica"
        verbose_name_plural = "Catergorias Academicas"

    def __str__(self):
        return u'%s' % self.nombre
