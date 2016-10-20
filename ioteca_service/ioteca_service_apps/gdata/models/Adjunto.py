from django.db import models
from .Registro import Registro


class Adjunto(models.Model):

    url = models.CharField(max_length=50)
    registro = models.ForeignKey(Registro)

    class Meta:
        verbose_name = "Adjunto"
        verbose_name_plural = "Adjuntos"

    def __str__(self):
        return "%s :> %s" % (self.registro, self.url)
