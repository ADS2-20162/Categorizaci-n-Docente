from django.db import models
import uuid


class Dimension(models.Model):

    nombre = models.CharField(max_length=200)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Dimension"
        verbose_name_plural = "Dimensiones"

    def __str__(self):
        return self.nombre
