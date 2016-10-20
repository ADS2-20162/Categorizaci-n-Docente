from django.db import models
from .Provincia import Provincia

class Distrito(models.Model):

    nombre = models.CharField(max_length=60)
    provincia = models.ForeignKey(Provincia)
    estado =  models.BooleanField(default=True)

    class Meta:
        verbose_name = "Distrito"
        verbose_name_plural = "Distritos"

    def __str__(self):
        return u'%s' % self.nombre
