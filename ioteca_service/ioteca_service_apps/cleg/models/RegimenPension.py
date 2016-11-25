from django.db import models
from .CampoPredefinido import CampoPredefinido

class RegimenPension(models.Model):

    nombre = models.CharField(max_length=60)
    sigla = models.CharField(max_length=10)
    descripcion = models.TextField()
    estado = models.BooleanField(default=True)
    campo_predefinido = models.ForeignKey(CampoPredefinido)

    class Meta:
        verbose_name = "Régimen Pension"
        verbose_name_plural = "Régimen de Pensiones"

    def __str__(self):
        return("{0}: {1}".format(self.campo_predefinido.nombre,self.nombre))
