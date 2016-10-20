from django.db import models
from .SubareaPerfil import SubareaPerfil
from .Competencia import Competencia

class CompetenciaPerfil(models.Model):
    """Modelo CompetenciaPerfil.
    este Modelo es un tabla intermedia entre el modelo SubareaPerfil
    y el modelo competencia
    """

    subareaperfil = models.ForeignKey(SubareaPerfil)
    competencia = models.ForeignKey(Competencia)
    ponderado = models.IntegerField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s :> %s" % (self.competencia, self.subareaperfil)
