from django.db import models
from .AreaPerfil import AreaPerfil
from .Subarea import Subarea


class SubareaPerfil(models.Model):

    areaperfil = models.ForeignKey(AreaPerfil)
    subarea = models.ForeignKey(Subarea)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "SubareaPerfil"
        verbose_name_plural = "SubareaPerfiles"

    def __str__(self):
        return "%s :> %s" % (self.subarea, self.areaperfil)
