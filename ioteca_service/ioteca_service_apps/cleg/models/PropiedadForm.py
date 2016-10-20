from django.db import models
from .TipoCampo import TipoCampo

class PropiedadForm(models.Model):

    nombre = models.CharField(max_length=60)
    descripcion = models.TextField(max_length=60)
    estado =  models.BooleanField(default=True)
    tipo_campo = models.ForeignKey(TipoCampo)

    class Meta:
        verbose_name = "Propiedad Form"
        verbose_name_plural = "Propiedad Forms"

    def __str__(self):
        return u'%s' % self.nombre
