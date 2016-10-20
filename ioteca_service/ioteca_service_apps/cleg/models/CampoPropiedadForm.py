from django.db import models
from .Campo import Campo
from .PropiedadForm import PropiedadForm

class CampoPropiedadForm(models.Model):

    nombre = models.CharField(max_length=60)
    campo = models.ForeignKey(Campo)
    propiedad_form = models.ForeignKey(PropiedadForm)

    class Meta:
        verbose_name = "Campo Propiedad Form"
        verbose_name_plural = "Campos Propiedades Forms"

    def __str__(self):
        return u'%s' % self.nombre
