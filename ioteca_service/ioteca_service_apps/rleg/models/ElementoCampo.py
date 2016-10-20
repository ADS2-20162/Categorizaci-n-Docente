from django.db import models
from ioteca_service_apps.cleg.models.Elemento import Elemento
from ioteca_service_apps.cleg.models.Campo import Campo


class ElementoCampo(models.Model):

    nombre = models.CharField(max_length=60)
    elemento = models.ForeignKey(Elemento)
    campo = models.ForeignKey(Campo)

    class Meta:
        verbose_name = "Elemento Campo"
        verbose_name_plural = "Elementos Campos"

    def __str__(self):
        return u'%s' % self.nombre
