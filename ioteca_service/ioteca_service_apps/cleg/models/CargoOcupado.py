from django.db import models
from .CampoPredefinido import CampoPredefinido

class CargoOcupado(models.Model):

    nombre = models.CharField(max_length=60)
    descripcion = models.TextField(max_length=100)
    estado = models.BooleanField(default=True)
    campo_predefinido = models.ForeignKey(CampoPredefinido)

    class Meta:
        verbose_name = "Cargo Ocupado"
        verbose_name_plural = "Cargos Ocupados"

    def __str__(self):
        return u'%s' % self.nombre
