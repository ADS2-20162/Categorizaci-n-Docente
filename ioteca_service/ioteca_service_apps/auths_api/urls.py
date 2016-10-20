from django.conf.urls import url, include
from rest_framework import routers
from rest_framework_extensions.routers import ExtendedSimpleRouter

from .PermissionView import PermissionViewSet

from .MenuView import MenuViewSet
from .UserView import UserViewSet, LocalUserInfoView
from .PersonView import PersonViewSet
from .PhotoUserView import PhotoUserViewSet
from .api_user_menu import UserMenuView


# from .api_views import load_menu

# router = ExtendedSimpleRouter()
router = routers.DefaultRouter()

router.register(r'permissions', PermissionViewSet)

router.register(r'users', UserViewSet)

router.register(r'persons', PersonViewSet)

router.register(r'photousers', PhotoUserViewSet)

router.register(r'menus', MenuViewSet)


urlpatterns = [

    url(r'^localuserinfo/$', LocalUserInfoView.as_view()),
    # url(r'^load_menu/$', load_menu, name='load_menu'),
    url(r'^usermenu/$', UserMenuView.as_view()),

    url(r'^', include(router.urls)),
]
