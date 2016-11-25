from django.db import models
from .CampoPredefinido import CampoPredefinido
from django_countries.fields import CountryField

class Pais(models.Model):

    code = CountryField()
    nombre = models.CharField('Nombre',max_length=30,null=True, blank=True)
    estado =  models.BooleanField(default=True)
    campo_predefinido = models.ForeignKey(CampoPredefinido)

    class Meta:
        verbose_name = "Pais"
        verbose_name_plural = "Paises"

    def save(self,*args,**kwargs):
        self.nombre = self.code.name
        super(Pais,self).save(*args,**kwargs)

    def __str__(self):
        return('{0}'.format(self.nombre))
