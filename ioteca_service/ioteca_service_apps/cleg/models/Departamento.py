from django.db import models
from .Pais import Pais

class Departamento(models.Model):

    nombre = models.CharField(max_length=60)
    pais = models.ForeignKey(Pais)
    estado =  models.BooleanField(default=True)

    class Meta:
        verbose_name = "Departamento"
        verbose_name_plural = "Departamentos"

    def __str__(self):
        return u'%s' % self.nombre
