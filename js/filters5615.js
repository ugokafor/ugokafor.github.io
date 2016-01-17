var from_session = false;


$(document).ready(function () {
    var panes_contens;
    var result_content;

    preset_options();


    $(".test").live("click", function () {
        panes_contens = $(".panes").html();
        result_content = $(".elenco_categorie").html();
        save_status(panes_contens, result_content);
        from_session = true;
    });

  
});







var index = 0;
var cur_page = 1;
var n_pages;
var test;


$.extend({
    getUrlVars: function () {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function (name) {
        return $.getUrlVars()[name];
    }
});





// Mi sposto nella ricerca per prodotti 
// mantenedo i filtri di ricerca impostati
$(".link").live("click", function () {
    var id;
    var ca_id;
    var car_id;
    var filtro_soluzioni = "";



    if ((index === undefined) || (isNaN(index))) {
        index = 0;
    }

    ca_id = $(this).attr('rel');
    // La ricerca si basa solamente sul valore del ca_id


    if (index == 2) {

        $('.spunta_hidden[id^="tab_2"]').each(function () {
            id = $(this).attr('id');
            if ($(this).hasClass("checked")) {
                str_array = id.split("_");
                car_id = parseInt(str_array[4]);
                filtro_soluzioni = filtro_soluzioni + "," + car_id;
            }
        });

        filtro_soluzioni = filtro_soluzioni.substring(1, filtro_soluzioni.length);

        // eseguo la ricerca con i filtri impostati
        if (filtro_soluzioni.length == 0) {
            // Selezione di Default
            do_search(114, "114", "", 2, 2)
        } else {
            do_search(0, "", filtro_soluzioni, 2, 2);
        }

    } else {
        do_search(ca_id, '', '', index, 2);
    }

    setTimeout("prodottoPaginazione();", 500);

});




// Ritorno nella ricerca per categoria
// mantenendo i filtri di ricerca impostati
$(".back").live("click", function () {
    var id;
    var str_array;
    var tab_id;
    var step;
    var ca_ord;
    var ca_id;
    var car_id;
    var id;
    var filtro_esigenze = "";
    var filtro_categorie = "";
    var filtro_soluzioni = "";

    if (index === undefined) {
        index = 0;
    }



    // Tab  "Soluzioni"
    if (index == 0) {
        filtro_esigenze = "";
        $('.spunta_hidden[id^="tab_0"]').each(function () {
            id = $(this).attr('id');
            if ($(this).hasClass("checked")) {
                str_array = id.split("_");
                car_id = parseInt(str_array[4]);
                filtro_esigenze = filtro_esigenze + "," + car_id;
            }
        });

        filtro_esigenze = filtro_esigenze.substring(1, filtro_esigenze.length)
        filtro_categorie = "";

        do_search(0, filtro_categorie, filtro_esigenze, 0, 1);

    }



    // Tab  "Categorie"
    if (index == 1) {
        filtro_esigenze = "";
        filtro_categorie = "";
        $('.spunta_hidden[id^="tab_1"]').each(function () {
            id = $(this).attr('id');
            if ($(this).hasClass("checked")) {

                str_array = id.split("_");
                ca_id = parseInt(str_array[3]);
                car_id = parseInt(str_array[4]);
                step = parseInt(str_array[2]);

                if (step == 1) {
                    filtro_categorie = filtro_categorie + "," + ca_id;
                }

                if (step == 2) {
                    filtro_esigenze = filtro_esigenze + "," + car_id;
                }
            }
        });

        filtro_esigenze = filtro_esigenze.substring(1, filtro_esigenze.length)
        filtro_categorie = filtro_categorie.substring(1, filtro_categorie.length)

        // al ritorno rieseguo la ricerca con i filtri aggiornati
        do_search(0, filtro_categorie, filtro_esigenze, 1, 1);

    }




    if (index == 2) {

        $('.spunta_hidden[id^="tab_2"]').each(function () {
            id = $(this).attr('id');
            if ($(this).hasClass("checked")) {
                str_array = id.split("_");
                car_id = parseInt(str_array[4]);
                filtro_soluzioni = filtro_soluzioni + "," + car_id;
            }
        });

        filtro_soluzioni = filtro_soluzioni.substring(1, filtro_soluzioni.length);

        // eseguo la ricerca con i filtri impostati
        if (filtro_soluzioni.length == 0) {
            // Selezione di Default
            do_search(114, "114", "", 2, 1)
        } else {
            do_search(114, "", filtro_soluzioni, 2, 1);
        }

    }




});









/*********************
Paginazione
**********************/

$(".avanti").live("click", function () {
    n_pages = $("#n_pages").val();
    n_pages = parseInt(n_pages);

    cur_page = $(".cur_page").val();
    cur_page = parseInt(cur_page);

    if (cur_page < n_pages) {
        cur_page = cur_page + 1;
        $('#[id^="page_"]').each(function () {
            $(this).hide();
        });
        $('#page_' + cur_page).show('slow');
        $('.cur_page').val(cur_page);
        $('#cur_page_bottom').val(cur_page);
        prodottoPaginazione();
    }

});


$(".indietro").live("click", function () {
    n_pages = $("#n_pages").val();
    n_pages = parseInt(n_pages);

    cur_page = $(".cur_page").val();
    cur_page = parseInt(cur_page);

    if (cur_page > 1) {
        cur_page = cur_page - 1;
        $('#[id^="page_"]').each(function () {
            $(this).hide();
        });
        $('#page_' + cur_page).show('slow');
        $('.cur_page').val(cur_page);
        prodottoPaginazione();
    }

});


$(".cur_page").live("change", function () {
    n_pages = $("#n_pages").val();
    n_pages = parseInt(n_pages);

    cur_page = $(this).val();

    $("#cur_page").val(cur_page);
    $("#cur_page_bottom").val(cur_page);
   
    cur_page = parseInt(cur_page);

    try {
        cur_page = parseInt(cur_page);
    } catch (e) {
        cur_page = 1
    }

    if ((cur_page >= 1) && (cur_page <= n_pages)) {
        $('#[id^="page_"]').each(function () {
            $(this).hide();
        });
        $('#page_' + cur_page).show('slow');
    } else {

        $("#cur_page").val(1);
        $("#cur_page_bottom").val(1);

    }

    prodottoPaginazione();
});













/*********************
Esigenze
**********************/
function get_esigenze(ca_id, tab, step) {
    var retValue = false;
    var method;
    var values = {};
    var userData;
    var step_id;
    var max_step = 4;
    var request_pending = false;

    
    method = 'GetListaEsigenze';
    values['ca_id'] = ($.trim(ca_id) =="" ? 0 : ca_id);
    values['tab_value'] = tab;
    values['step_value'] = step;
    userData = { 'parameters': values };
    step_id = "#step0_" + step;


    if (!request_pending) {

        request_pending = true;

        $.ajax({
            async: false,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "/me/WS/wsGetContent.asmx/" + method,
            data: JSON2.stringify(userData),
            dataType: "json",
            timeout: 5000,
            success:
                        function (a) {
                            retValue = a.d.Status;
                            if (!retValue) {
                                //$(step_id).html("errore");
                            } else {
                                $(step_id).html(a.d.HTML);

                            };
                            request_pending = false;
                        },
            error:
                            function (e) {
                                $(step_id).html(e);
                                request_pending = false;
                                retValue = false;
                            }
        });

        $(step_id).show('slow');

    }

    return retValue;

}




/*********************
Categorie
**********************/
function get_categorie(ca_id, tab, step) {
    var retValue = false;
    var method;
    var values = {};
    var userData;
    var step_id;
    var max_step = 2;
    var request_pending = false;


    method = 'GetListaCategorie';
    values['ca_id'] = ca_id;
    values['tab_value'] = tab;
    values['step_value'] = step;
    userData = { 'parameters': values };
    step_id = "#step1_" + step;


    if (!request_pending) {

        request_pending = true;

        $.ajax({
            async: false,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "/me/WS/wsGetContent.asmx/" + method,
            data: JSON2.stringify(userData),
            dataType: "json",
            timeout: 5000,
            success:
                        function (a) {
                            retValue = a.d.Status;
                            if (!retValue) {
                                //$(step_id).html("errore");
                            } else {
                                $(step_id).html(a.d.HTML);
                                $('html,body').animate({ scrollTop: $("#top").offset().top }, 'slow');
                                $(step_id).show('slow');
                            };
                            request_pending = false;
                        },
            error:
                            function (e) {
                                $(step_id).html(e);
                                retValue = false;
                                request_pending = false;
                            }
        });
    }

    return retValue;

}



/*********************
Soluzioni Complete e rinnovabili
**********************/
function get_soluzioni_complete(ca_id, tab, step) {
    var retValue = false;
    var method;
    var values = {};
    var userData;
    var step_id;
    var max_step = 1;
    var request_pending = false;


    method = 'GetListaSoluzioniComplete';
    values['ca_id'] = ca_id;
    values['tab_value'] = tab;
    values['step_value'] = step;

    userData = { 'parameters': values };

    step_id = "#step2_" + step;

  
    if (!request_pending) {

        request_pending = true;

        $.ajax({
            async: false,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "/me/WS/wsGetContent.asmx/" + method,
            data: JSON2.stringify(userData),
            dataType: "json",
            timeout: 5000,
            success:
                            function (a) {
                                retValue = a.d.Status;
                                if (!retValue) {
                                    //$(step_id).html("errore");
                                } else {
                                    $(step_id).html(a.d.HTML);
                                };
                                request_pending = false;
                            },
            error:
                                function (e) {
                                    $(step_id).html(e);
                                    retValue = false;
                                    request_pending = false;
                                }
        });


        $('html,body').animate({ scrollTop: $("#top").offset().top }, 'slow');

        $(step_id).show('slow');

    }


    return retValue;


}







/*********************
do_search
**********************/
function do_search(ca_id, filter_categorie, filter_esigenze, tab, search_type) {
    var retValue = false;
    var method;
    var values = {};
    var userData;
    var request_pending = false;

    // se il parametro  "search_type" non è stato passato lo setto a 0 
    if (search_type === undefined) {
        search_type = 0;
    }

    values['tab_value'] = tab;
    values['filter_categorie'] = filter_categorie;
    values['filter_esigenze'] = filter_esigenze;
    values['ca_id'] = ca_id;
    values['search_type'] = search_type;

    userData = { 'parameters': values };

    method = 'doSearchItaly';

    $("#lista_categorie").hide('slow');


    if (!request_pending) {

        $.ajax({
            async: false,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "/me/WS/wsGetContent.asmx/" + method,
            data: JSON2.stringify(userData),
            dataType: "json",
            timeout: 5000,
            success:
                            function (a) {
                                retValue = a.d.Status;
                                if (!retValue) {
                                    $("#lista_categorie").html("errore");
                                } else {

                                    $("#lista_categorie").html(a.d.HTML);
                                    contCategorie();
                                };
                                request_pending = false;
                            },
            error:
                                function (e) {
                                    $("#lista_categorie").html(e);
                                    retValue = false;
                                    request_pending = false;
                                }
        });

        $("#lista_categorie").show('slow');

    }


    setTimeout("prodottoPaginazione();", 500);


    return retValue;
}








/*********************
save_status
**********************/
function save_status(tabs_content, result_content) {
    var retValue = false;
    var method;
    var values = {};
    var userData;
    var request_pending = false;

    values['tabs_content'] = tabs_content;
    values['result_content'] = result_content;

    userData = { 'parameters': values };

    method = 'Save_status';


    if (!request_pending) {

        $.ajax({
            async: false,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "/me/WS/wsGetContent.asmx/" + method,
            data: JSON2.stringify(userData),
            dataType: "json",
            timeout: 5000,
            success:
                            function (a) {
                                retValue = a.d.Status;
                                if (!retValue) {
                                } else {   
                                };
                                request_pending = false;
                            },
            error:
                                function (e) {
                                    retValue = false;
                                    request_pending = false;
                                }
        });

       

    }



    return retValue;
}







/*********************
retrieve_status
**********************/
function retrieve_status() {
    var retValue = false;
    var method;
    var values = {};
    var userData;
    var request_pending = false;

    values['tabs_content'] = "";

    userData = { 'parameters': values };

    method = 'Retrieve_status';

    if (!request_pending) {

        $.ajax({
            async: false,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "/me/WS/wsGetContent.asmx/" + method,
            data: JSON2.stringify(userData),
            dataType: "json",
            timeout: 5000,
            success:
                            function (a) {
                                retValue = a.d.Status;
                                if (!retValue) {

                                } else {

                                    if (a.d.HTML.length != 0) {

                                        //alert(!from_session);
                                            $(".panes").html(a.d.HTML);
                                            $(".elenco_categorie").html(a.d.HTML2);
                                            from_session = true;

                                         } else {
                                             get_esigenze(56, 0, 1);
                                        }
                                };
                                request_pending = false;
                            },
            error:
                                function (e) {

                                    retValue = false;
                                    request_pending = false;
                                }
        });


    }



    return retValue;
}










/*--------------------------------------------------
preset_options()   
setta le voci dei filtri prodotti sulla base delle scelte fatte nel menu
--------------------------------------------------*/
function preset_options() {
    var api;
    var tab_from_qs = 0;
    var ca_id_from_qs = 0;
    var id_esigenza_from_qs = 0;
    var cur_id_esigenza = 0;
    var cur_ca_id = 0;
    var ca_id = 0;
    var id = "";
    var str_array;
    var filtro_esigenze = "";
    var ca_ord;

    //$("#lista_categorie").html('');

   
    // Ricavo i valori dei selettori in qs

    /* NEW */

    


    if ($.getUrlVar('tab') !== undefined) {
        tab_from_qs = parseInt($.getUrlVar('tab'));
    } else {

        if ($("#hfTab").val() != '') {
            tab_from_qs = parseInt($("#hfTab").val());
        }

    }





    if ($.getUrlVar('ca_id') !== undefined) {
        ca_id_from_qs = parseInt($.getUrlVar('ca_id'));
    }
    else {
        if (tab_from_qs == 1)
            ca_id_from_qs = parseInt($("#hfCa").val());
    }


    if ($.getUrlVar('id_esigenza') !== undefined) {
        id_esigenza_from_qs = parseInt($.getUrlVar('id_esigenza'));
    }
    else {
        if (tab_from_qs == 0)
            id_esigenza_from_qs = parseInt($("#hfCa").val());
    }

    /* NEW */

    /*
    if ($.getUrlVar('tab') !== undefined) {
    tab_from_qs = parseInt($.getUrlVar('tab'));
    }


    if ($.getUrlVar('ca_id') !== undefined) {
    ca_id_from_qs = parseInt($.getUrlVar('ca_id'));
    }


    if ($.getUrlVar('id_esigenza') !== undefined) {
    id_esigenza_from_qs = parseInt($.getUrlVar('id_esigenza'));
    }*/


    index = tab_from_qs;

    api = $("ul.tabs").data("tabs");


    api.click(tab_from_qs);



    if (tab_from_qs == 0) {
        get_esigenze( 56, 0, 1);
    }

    if (tab_from_qs == 1) {
        get_categorie( 3 , 1, 1);
    }

    if (tab_from_qs == 2) {
        get_soluzioni_complete(114, 2, 1);
    }


   


    // Tab Naviga "Esigenze"
    if (tab_from_qs == 0) {
        $('.spunta_hidden[id^="tab_0"]').each(function () {

            id = $(this).attr('id');
            str_array = id.split("_");
            cur_id_esigenza = parseInt(str_array[4]);

            if (cur_id_esigenza == id_esigenza_from_qs) {
                $(this).addClass("checked");
                ca_id = $(this).attr("rel");  
            }
        });

        // apro l'eventuale sotto nodo
        get_esigenze( ca_id, 0, 2);
 
    }

    //var selected_ca_id;


    // Tab  "Categorie"
    if (tab_from_qs == 1) {

        $('.spunta_hidden[id^="tab_1"]').each(function () {

            id = $(this).attr('id');
            str_array = id.split("_");
            cur_ca_id = parseInt(str_array[3]);

            if (cur_ca_id == ca_id_from_qs) {
                $(this).addClass("checked");

                //ca_ord = $(this).attr("rel");
                ca_id = $(this).attr("rel");
                //selected_ca_id = ca_id_from_qs;
            }

        });

        // apro l'eventuale sotto nodo
        get_categorie(ca_id, 1, 2);

    }



    // Tab "Soluzioni Complete"
    if (tab_from_qs == 2) {
        $('.spunta_hidden[id^="tab_2"]').each(function () {
            id = $(this).attr('id');
            str_array = id.split("_");
            cur_id_esigenza = parseInt(str_array[4]);
            if (cur_id_esigenza == id_esigenza_from_qs) {
                $(this).addClass("checked");
            }
        });


            
        // Chiamo la funzione che filtra i risultati
        if (id_esigenza_from_qs == 0) {
           
            do_search(0, "114", "", 2, 1);

        } else {
            //do_search(144, "", id_esigenza_from_qs , 2, 1)
        }


    }



    // Tab  "Accessori"
    if (tab_from_qs == 3) {
        do_search(15, "15", "", 3, 1);
    }

}






//// Valorizzo i vari tab di ricerca
//if (!from_session) {
//    alert("in:" + from_session);
//    get_esigenze(56, 0, 1);
//}
//else
//    from_session = false;