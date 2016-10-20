from django.db import models
from ioteca_service_apps.gperfil.models.EscalaDimension import EscalaDimension
from ioteca_service_apps.gperfil.models.CompetenciaPerfil import CompetenciaPerfil


class Registro(models.Model):

    estado_data = models.CharField(max_length=50)
    escaladimension = models.ForeignKey(EscalaDimension)
    competenciaperfil = models.ForeignKey(CompetenciaPerfil)
    estado = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Registro"
        verbose_name_plural = "Registros"

    def __str__(self):
        return self.estado_data
