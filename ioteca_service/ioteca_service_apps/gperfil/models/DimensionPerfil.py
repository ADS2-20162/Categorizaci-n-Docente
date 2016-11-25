from django.db import models
from .Perfil import Perfil
from .Dimension import Dimension


class DimensionPerfil(models.Model):

    perfil = models.ForeignKey(Perfil)
    dimension = models.ForeignKey(Dimension, related_name='dimperfils')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s ::> %s" % (self.dimension, self.perfil)
