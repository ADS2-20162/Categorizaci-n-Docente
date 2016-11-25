app

//------------------------------
// lps temas que se puede seleccionar.
//------------------------------
    .controller('ThemeCtrl', function() {
      this.selectedMode = 'md-fling';
      this.selectedDirection = 'right';
      this.isOpen = true;
      this.hidden = false;
      this.hover = false;
    })

//------------------------------
// por lo pronto colocar aqui el menu para su Modelo, vease test1
//------------------------------
    .factory("menuService", function(authService) {

    var sections = [];

    var tabs = [];

    sections.push({
        menu: [{
            title: 'Configurar',
            type: 'toggle',
            icon: 'settings',
            // state: 'gperfil',
            menu_items: [{
                title: 'Perfil',
                state: 'gperfil.perfil',
                icon: 'account_circle',
                type: 'link'
            }, 
            {
                title: 'Legajo',
                state: 'gperfil.legajo',
                icon: 'assignment',
                type: 'link'
            }, 
            ]
        }]
    });

    //menu para Gperfil
    sections.push({
        menu: [{
            title: 'Administrar',
            type: 'toggle',
            icon: 'assignment_turned_in',
            // state: 'gperfil',
            menu_items: [{
                title: 'Area',
                state: 'gperfil.area',
                icon: 'account_balance',
                type: 'link'
            },{
                title: 'Area Perfil',
                state: 'gperfil.areaperfil',
                icon: 'folder_shared',
                type: 'link'
            },{
                title: 'Competencia',
                state: 'gperfil.competencia',
                icon: 'work',
                type: 'link'
            },{
                title: 'Dimension',
                state: 'gperfil.dimension',
                icon: 'poll',
                type: 'link'
            },{
                title: 'Dim Perfil',
                state: 'gperfil.dimensionperfil',
                icon: 'switch_camera',
                type: 'link'
            },{
                title: 'Escala',
                state: 'gperfil.escala',
                icon: 'trending_up',
                type: 'link'
            },{
                title: 'Subarea',
                state: 'gperfil.subarea',
                icon: 'account_balance_wallet',
                type: 'link'
            }, 
            ]
        }]
    });

    //menu para Cleg
    sections.push({
        menu: [{
            title: 'Cleg',
            type: 'toggle',
            icon: 'description',
            menu_items: [{
                title: 'Item',
                state: 'gperfil.item',
                icon: 'format_list_numbered',
                type: 'link'
            },{
                title: 'SubItem',
                state: 'gperfil.subitem',
                icon: 'format_list_bulleted',
                type: 'link'
            },{
                title: 'Seccion',
                state: 'gperfil.seccion',
                icon: 'dehaze',
                type: 'link'
            },{
                title: 'Elemento',
                state: 'gperfil.elemento',
                icon: '',
                type: 'link'
             },
            ]
        }]
    });

    //menu para Reportes
    sections.push({
        menu: [{
            title: 'Reportes',
            type: 'toggle',
            icon: 'content_paste',
            menu_items: [{
                title: 'Resumen',
                state: 'gperfil.resumen',
                icon: 'poll',
                type: 'link'
            },{
                title: 'Static',
                state: 'gperfil.statistic',
                icon: 'trending_up',
                type: 'link'
            },
            ]
        }]
    });

    tabs.push({
        children: [{
            title: 'Inicio',
            type: 'toggle',
            group: 'user',
            icon: 'home',
            pages: [{
                    title:'Anuncios',
                    state:'appUser.inicio',
                    type:'link'
                }, ]
            }]
    });

    tabs.push({
        children: [{
            title: 'Cuenta',
            type: 'toggle',
            group: 'user',
            icon: 'person',
            pages: [{
                    title:'Mi Perfil',
                    state:'appUser.miperfil',
                    type:'link'
                }, {
                    title:'Seguridad',
                    state:'appUser.seguridad',
                    type:'link'
                }, ]
            }]
    });

    tabs.push({
        children: [{
            title: 'Legajo',
            type: 'toggle',
            group: 'user',
            icon: 'description',
            pages: [{
                    title:'Informacion',
                    state:'appUser.perfil',
                    type:'link'
                }, ]
            }]
    });

    tabs.push({
        children: [{
            title: 'Catalogo',
            type: 'toggle',
            group: 'user',
            icon: 'portrait',
            pages: [{
                    title:'Inform',
                    state:'appUser.catalogo',
                    type:'link'
                }, ]
            }]
    });


    authService.getMenu().then(function(r) {
        menu = r.data;
        console.log("menuService.authService.getMenu():" + JSON.stringify(menu));
        sections.push(

            menu
        );

    }, function(error) {
        console.log("error in menuService.authService.getMenu():" + JSON.stringify(error));
    });


    return {
        sections: sections,
        tabs: tabs,
    };

});
    
