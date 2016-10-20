from django.db import models
from .CampoPropiedadForm import CampoPropiedadForm

class DataPropiedad(models.Model):

    nombre = models.CharField(max_length=60)
    data_propiedad = models.ForeignKey(CampoPropiedadForm)

    class Meta:
        verbose_name = "Data Propiedad"
        verbose_name_plural = "Data Propiedades"

    def __str__(self):
        return u'%s' % self.nombre
