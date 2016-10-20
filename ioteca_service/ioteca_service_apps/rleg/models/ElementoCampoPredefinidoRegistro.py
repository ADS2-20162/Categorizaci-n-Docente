from django.db import models

from .ElementoCampoPredefinido import ElementoCampoPredefinido
from ioteca_service_apps.cat.models.Persona import Persona

class ElementoCampoPredefinidoRegistro(models.Model):
    elemento_campo_pred = models.ForeignKey(ElementoCampoPredefinido)
    persona = models.ForeignKey(Persona)
    data = models.CharField(max_length=100)

    def __str__(self):
        return u'%s' % self.elemeto_campo_pred.elemento.nombre

    class Meta:
        verbose_name = "Elemento Campo Predefinido Registro"
        verbose_name_plural = "Elemento Campo Predefinido de Registros"

