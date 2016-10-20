from django.db import models
from .Perfil import Perfil
from .Area import Area


class AreaPerfil(models.Model):

    perfil = models.ForeignKey(Perfil)
    area = models.ForeignKey(Area)
    ponderado = models.IntegerField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s :> %s" % (self.area, self.perfil)
