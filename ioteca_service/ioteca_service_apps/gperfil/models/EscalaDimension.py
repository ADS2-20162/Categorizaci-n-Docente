from django.db import models
import uuid
from .DimensionPerfil import DimensionPerfil
from .Escala import Escala

class EscalaDimension(models.Model):

    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    dimensionperfil = models.ForeignKey(DimensionPerfil)
    escala = models.ForeignKey(Escala)
    puntaje = models.IntegerField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s :> %s" % (self.escala, self.dimensionperfil)
