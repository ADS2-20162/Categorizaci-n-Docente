from django.db import models
from ioteca_service_apps.cleg.models.Elemento import Elemento
from ioteca_service_apps.cleg.models.CampoPredefinido import CampoPredefinido


class ElementoCampoPredefinido(models.Model):

    elemento = models.ForeignKey(Elemento)
    campo_predefinido = models.ForeignKey(CampoPredefinido)

    class Meta:
        verbose_name = "Elemento Campo Predefinido"
        verbose_name_plural = "Elemento Campos Predefinidos"

    def __str__(self):
        return u'%s' % self.elemento
