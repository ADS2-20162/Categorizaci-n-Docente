#! coding: utf-8 -*-
import uuid
from django.db import models
from .ElementoCampo import ElementoCampo
from ioteca_service_apps.cat.models.Persona import Persona
from ioteca_service_apps.auths.Person import Person
from django.db.models.signals import pre_save
from django.dispatch import receiver


def upload_image(instance, filename):
    extension = filename.split(".")[-1]
    return("data_imagen/{0}.{1}".format(uuid.uuid4(), extension))

def upload_file(instance, filename):
    return("data_archivo/{0}".format(filename))

class ElementoCampoRegistro(models.Model):

    elemento_campo = models.ForeignKey(ElementoCampo) #related_name
    persona = models.ForeignKey(Persona, null=True, blank=True,related_name='elementocamporegistro')
    # data = models.CharField(max_length=100)
    d_string = models.CharField("Dato String",max_length=100, null=True, blank=True) #Data String
    d_texto = models.TextField("Dato Descripción",null=True,blank=True) #Data texto
    d_number = models.IntegerField("Dato Número",null=True, blank=True) #Data numero
    d_decimal = models.DecimalField("Dato Decimal",max_digits=9,decimal_places=2,null=True, blank=True) # Data decimal
    d_fecha = models.DateField("Dato Fecha", null=True, blank=True) #Data fecha
    d_imagen = models.ImageField("Dato Imagen", upload_to=upload_image,null=True, blank=True) # Data imagen
    d_archivo = models.FileField("Dato Archivo", upload_to=upload_file,null=True, blank=True) # Data archivo
    d_url = models.URLField("Dato URL",max_length=1024,null=True, blank=True) #Data url

    # d_fecha_hora = models.DateTimeField(null=True,blank=True)
    # d_opciones = models.ForeignKey() # Data opciones


    class Meta:
        verbose_name = "Elemento Campo Registro"
        verbose_name_plural = "Elemento Campo de Registros"

    def save(self,*args,**kwargs):
        if self.d_imagen:
            extension = filename.split(".")[-1]
            if extension == 'JPG' or 'jpg' or 'png' or 'PNG':
                self.d_imagen = self.d_imagen
        elif self.d_archivo:
            extension = filename.split(".")[-1]
            if extension == 'pdf' or 'PDF':
                self.d_imagen = self.d_imagen

        super(ElementoCampoRegistro,self).save(*args,**kwargs)

    def __str__(self):

        if self.d_string:
            return("{0}: {1}".format(self.elemento_campo.nombre,self.d_string))
        elif self.d_imagen:
            a = self.d_imagen.url
            x = a.split("/")
            r = x[len(x)-1]
            return("{0}: {1}".format(self.elemento_campo.nombre,r))
        elif self.d_archivo:
            a = self.d_archivo.url
            x = a.split("/")
            r = x[len(x)-1]
            return("{0}: {1}".format(self.elemento_campo.nombre,r))
        elif self.d_texto:
            return("{0}: {1}".format(self.elemento_campo.nombre,self.d_texto))
        elif self.d_number:
            return("{0}: {1}".format(self.elemento_campo.nombre,self.d_number))
        elif self.d_decimal:
            return("{0}: {1}".format(self.elemento_campo.nombre,self.d_decimal))
        elif self.d_fecha:
            return("{0}: {1}".format(self.elemento_campo.nombre,self.d_fecha))
        elif self.d_url:
            return("{0}: {1}".format(self.elemento_campo.nombre,self.d_url))
        else:
            pass

    # def save(self,*args,**kwargs):
    #     persona = Persona.objects.all()
    #     person = Person.objects.all()
        # print(self.request.user.username)
        # for i in person:
            # if i.get('person_id') == self.request.user.person.id:
            # print(i)
                # self.persona = person[0]
        # super(ElementoCampoRegistro,self).save(*args,**kwargs)

# @receiver(pre_save, sender=ElementoCampoRegistro)
# def usuario_persona(sender, instance, *args, **kwargs):
#     person = Persona.objects.get(person__id=instance.request.user.person.id)
#     instance.persona = person.id
