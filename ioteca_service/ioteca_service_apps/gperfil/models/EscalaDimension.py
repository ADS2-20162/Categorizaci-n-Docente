from django.db import models
from .DimensionPerfil import DimensionPerfil
from .Escala import Escala


class EscalaDimension(models.Model):

    dimensionperfil = models.ForeignKey(
        DimensionPerfil, related_name='escsdims')
    escala = models.ForeignKey(Escala)
    puntaje = models.IntegerField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s :> %s" % (self.escala, self.dimensionperfil)
