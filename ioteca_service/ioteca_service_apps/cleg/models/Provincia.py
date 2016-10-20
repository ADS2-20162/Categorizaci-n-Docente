from django.db import models
from .Departamento import Departamento

class Provincia(models.Model):

    nombre = models.CharField(max_length=60)
    departamento = models.ForeignKey(Departamento)
    estado =  models.BooleanField(default=True)

    class Meta:
        verbose_name = "Provincia"
        verbose_name_plural = "Provincias"

    def __str__(self):
        return u'%s' % self.nombre
