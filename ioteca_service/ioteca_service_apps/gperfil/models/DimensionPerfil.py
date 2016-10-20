from django.db import models
import uuid
from .Perfil import Perfil
from .Dimension import Dimension

class DimensionPerfil(models.Model):

    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    perfil = models.ForeignKey(Perfil)
    dimension = models.ForeignKey(Dimension)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s ::> %s" % (self.dimension, self.perfil)
