from django.db import models
from .ElementoCampo import ElementoCampo
from ioteca_service_apps.cat.models.Persona import Persona
from ioteca_service_apps.auths.Person import Person
from django.db.models.signals import pre_save
from django.dispatch import receiver

class ElementoCampoRegistro(models.Model):

    elemento_campo = models.ForeignKey(ElementoCampo) #related_name
    persona = models.ForeignKey(Persona, null=True, blank=True,related_name='elementocamporegistro')
    data = models.CharField(max_length=100)

    class Meta:
        verbose_name = "Elemento Campo Registro"
        verbose_name_plural = "Elemento campo de Registros"

    def __str__(self):
        return "{0}: {1}".format(self.elemento_campo.nombre,self.data)

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
