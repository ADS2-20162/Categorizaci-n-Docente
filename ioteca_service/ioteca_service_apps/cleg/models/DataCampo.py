from django.db import models
from ioteca_service_apps.rleg.models.ElementoCampo import ElementoCampo


class DataCampo(models.Model):

    nombre = models.CharField(max_length=60)
    elemento_campo = models.ForeignKey(ElementoCampo)

    class Meta:
        verbose_name = "Data Campo"
        verbose_name_plural = "Data Campos"

    def __str__(self):
        return("{0}: {1}".format(self.nombre,self.elemento_campo.nombre))
