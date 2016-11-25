from django.db import models
from ..models.DataCampo import DataCampo

class DataCampoOpcion(models.Model):

    nombre = models.CharField(max_length=60)
    data_campo = models.ForeignKey(DataCampo)

    def __str__(self):
        return("{0}: {1}".format(self.data_campo.nombre,self.nombre))

    class Meta:
        verbose_name = "Data Campo Opción"
        verbose_name_plural = "Data Campos Opciones"

