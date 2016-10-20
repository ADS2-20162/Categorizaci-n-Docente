from django.db import models
from .Idioma import Idioma

class Dimension(models.Model):

    nombre = models.CharField(max_length=60)
    descripcion = models.TextField(max_length=60)
    idioma = models.ForeignKey(Idioma)
    estado =  models.BooleanField(default=True)

    class Meta:
        verbose_name = "Dimension"
        verbose_name_plural = "Dimensiones"

    def __str__(self):
        return u'%s' % self.nombre
