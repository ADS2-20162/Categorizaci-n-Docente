from django.db import models
from .TipoCampo import TipoCampo

class CampoPredefinido(models.Model):

    nombre = models.CharField(max_length=60)
    descripcion = models.TextField(max_length=100)
    estado = models.BooleanField(default=True)
    tipo_campo= models.ForeignKey(TipoCampo)

    class Meta:
        verbose_name = "Campo Prefefinido"
        verbose_name_plural = "Campos Prefefinidos"

    def __str__(self):
        return u'%s' % self.nombre
