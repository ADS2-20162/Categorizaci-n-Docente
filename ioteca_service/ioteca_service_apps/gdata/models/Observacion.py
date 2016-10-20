from django.db import models
from .Registro import Registro


class Observacion(models.Model):

    observacion = models.CharField(max_length=200)
    registro = models.ForeignKey(Registro)
    estado = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Observacion"
        verbose_name_plural = "Observacions"

    def __str__(self):
        return "%s :> %s" % (self.registro, self.observacion)
