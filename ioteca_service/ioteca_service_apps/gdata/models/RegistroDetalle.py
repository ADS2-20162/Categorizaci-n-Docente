from django.db import models
from ..models.Registro import Registro
from ..models.Adjunto import Adjunto


class RegistroDetalle(models.Model):

    registro = models.ForeignKey(Registro)
    adjunto = models.ForeignKey(Adjunto)

    class Meta:
        verbose_name = "RegistroDetalle"
        verbose_name_plural = "RegistroDetalles"

    def __str__(self):
        return "%s :> %s" % (self.registro, self.adjunto)
