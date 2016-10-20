from django.conf.urls import url, include
from rest_framework import routers
from .views.Item import ItemViewSet
from .views.SubItem import SubItemViewSet
from .views.Seccion import SeccionViewSet

router = routers.DefaultRouter()
router.register(r'items', ItemViewSet)
router.register(r'subItems', SubItemViewSet)
router.register(r'seccions', SeccionViewSet)
urlpatterns = [
    url(r'^', include(router.urls)),
]
