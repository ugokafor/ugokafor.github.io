/// <reference path="/JS/jquery-1.7.1.min-vsdoc.js" />



/*--------------------------------------------------
Menu Servizio
--------------------------------------------------*/
function menuServizio()
{
    totLi = 0;
    $(".menu_servizio ul li").each(function ()
    {
        lLi = $(this).width();
        totLi = totLi + lLi
    });
    $(".menu_servizio ul li").first().addClass("primo_elemento");
    lmenu = $(".menu_servizio ul").width();
    quantiLi = $(".menu_servizio ul li").size();
    marginLi = Math.round((((lmenu - totLi) / quantiLi) / 2));
    $(".menu_servizio li").not($(".primo_elemento")).css({ "paddingLeft": marginLi, "marginLeft": marginLi });
}

/*--------------------------------------------------
Menu Principale - ALLINEA
--------------------------------------------------*/
function menuPrincipale()
{
    totLi = 0;
    $(".menu_princ li").not($(".submenu ul li")).each(function ()
    {
        lLi = $(this).width();
        totLi = totLi + lLi
    });
    $(".menu_princ li").first().addClass("primo_elemento");
    $(".menu_princ li").not($(".submenu ul li")).last().addClass("ultimo_elemento");
    lmenu = $(".menu_princ").width();
    quantiLi = $(".menu_princ li").not($(".submenu ul li")).size();
    lfirst = $(".menu_princ .primo_elemento").width();
    marginLi = Math.round((((lmenu - totLi) / (quantiLi - 1)) / 2) - quantiLi);
    $(".menu_princ li a").not($(".primo_elemento a")).css({ "paddingLeft": marginLi });
    $(".menu_princ li a").not($(".ultimo_elemento a")).css({ "paddingRight": marginLi });
    $(".menu_princ .primo_elemento a").css({ "paddingRight": marginLi - 20 });
    $(".menu_princ .ultimo_elemento a").css({ "paddingLeft": marginLi - 20 });
}

/*--------------------------------------------------
SubMenu
--------------------------------------------------*/
function subMenu()
{
    var closeTimeout;
    var openTimeout;
    var over = false;
    var speed = 400;

    $('.cont_menu_princ ul').hover(function ()
    {
        over = true;
    }, function ()
    {
        over = false;
    });

    $('.cont_menu_princ ul li a').mouseover(function ()
    {
        $(this).addClass('menuover');
        openMenu($(this).parents('li'));
    });

    $('.cont_submenu .submenu').mouseover(function ()
    {
        $('a:eq(0)', $(this).parents('li')).addClass('menuover on');
        openMenu($(this).parents('li'));
    });

    function openMenu($li)
    {
        if (typeof closeTimeout != 'undefined')
        {
            clearTimeout(closeTimeout);
        }
        if (typeof openTimeout != 'undefined')
        {
            clearTimeout(openTimeout);
        }
        $('.roundmenu').remove();
        $a = $('a:eq(0)', $li).addClass('menuover');
        $sub = $('.cont_submenu', $li);
        if ($sub.size())
        {
            h = $(document).height() - $('#top').height();
            if ($('.cont_submenu:visible').size())
            {
                $sub.height(h).show();
                $('.cont_menu_princ a.on').not($a).removeClass('on');
                $('.cont_submenu').not($sub).hide();
            } else
            {
                openTimeout = setTimeout(function ()
                {
                    if (over)
                    {
                        $('.cont_menu_princ a.on').not($a).removeClass('on');
                        $sub.height(h).fadeIn(speed);
                    }
                }, 500);
            }
            $('body').append('<div class="roundmenu roundmenu1"></div><div class="roundmenu roundmenu2"></div><div class="roundmenu roundmenu3"></div><div class="roundmenu roundmenu4"></div>');
            $('.roundmenu1').css({ left: ($(window).width() / 2 - 520), top: ($sub.offset().top - 36), height: $sub.height(), opacity: 0 });
            $('.roundmenu2').css({ left: ($(window).width() / 2 + 470), top: ($sub.offset().top - 36), height: $sub.height(), opacity: 0 });
            $('.roundmenu3').css({ width: '100%', height: 50, top: ($sub.offset().top + $('.submenu', $sub).height() + 40), left: 0, opacity: 0 });
            $('.roundmenu4').css({ width: '100%', height: 50, top: ($sub.offset().top - 86), left: 0, opacity: 0 });
        } else
        {
            $('.cont_submenu').fadeOut(200);
        }
    }

    function closeMenu($li)
    {
        if (typeof openTimeout != 'undefined')
        {
            clearTimeout(openTimeout);
        }
        if (typeof closeTimeout != 'undefined')
        {
            clearTimeout(closeTimeout);
        }
        $a = $('a:eq(0)', $li);
        $sub = $('.cont_submenu', $li);

        closeTimeout = setTimeout(function ()
        {
            if ($a.is(':not(".menuover")'))
            {
                $sub.stop().fadeOut(speed);
                $a.removeClass('on');
            }
        }, 500);
    }

    $('.roundmenu').live('mouseover', function ()
    {
        $('.cont_menu_princ ul li a').removeClass('on menuover');
        $('.roundmenu').remove();
        $('.cont_submenu').fadeOut(200);
    });


}


/*--------------------------------------------------
Scrollable HP
--------------------------------------------------*/
var larghezzaFinestra = $(window).width();
function scrollHp()
{
    larghezzaFinestra = $(window).width();
    $(".showrell_hp .scrollable_hp").css({ "width": larghezzaFinestra });
    $(".showrell_hp .cont_scroll_hp").css({ "width": larghezzaFinestra });
    $(window).resize(function ()
    {
        larghezzaFinestra = $(window).width();
        $(".showrell_hp .scrollable_hp").css({ "width": larghezzaFinestra });
        $(".showrell_hp .cont_scroll_hp").css({ "width": larghezzaFinestra });
    });

    $(".showrell_hp .scrollable_hp").scrollable({ circular: true }).navigator().autoscroll({ interval: 5000 });
    $(".cont_scroll_hp").each(function ()
    {
        percorsoImmagine = $(this).find("img").attr('src');
        $(this).find("img").hide();
        $(this).css({ "background": "url(" + percorsoImmagine + ")" });
    });

    nNavi_hp = 0
    $(".showrell_hp .navi a").each(function ()
    {
        numberNavi_hp = nNavi_hp + 1
        if (numberNavi_hp >= nNavi_hp)
        {
            nNavi_hp = numberNavi_hp
        }
        $(this).addClass("numnavi_hp_" + nNavi_hp + "");
    });
}

/*--------------------------------------------------
Scrollable Evidenza
--------------------------------------------------*/
function scrollEvidenza()
{
    $(".scroll_evidenza .scrollable_evidenza").scrollable({ next: '.next_mini', prev: '.prev_mini' }).navigator();

    $(".blocco_evidenza_scroll:nth-child(3n)").addClass("ultimo_elemento");

    hTitolo = 0
    $(".cont_evidenza .titolo").each(function ()
    {
        altTitolo = $(this).height();
        if (altTitolo >= hTitolo)
        {
            hTitolo = altTitolo
        }
    });
    $(".cont_evidenza .titolo").css({ "height": hTitolo });

    hAbstract = 0
    $(".cont_evidenza .abstract").each(function ()
    {
        altAbstract = $(this).height();
        if (altAbstract >= hAbstract)
        {
            hAbstract = altAbstract
        }
    });
    $(".cont_evidenza .abstract").css({ "height": hAbstract });

    nNavi = 0
    $(".set_navigazione .navi a").each(function ()
    {
        numberNavi = nNavi + 1
        if (numberNavi >= nNavi)
        {
            nNavi = numberNavi
        }
        $(this).addClass("numnavi_" + nNavi + "");
    });
}

/*--------------------------------------------------
Navigator HP
--------------------------------------------------*/
function navigatorHP()
{
    larg = $('.universo_dx .set_navigazione').width();
    leftPos = (670 - (larg + 50)) / 2
    $('.universo_dx .set_navigazione').css({ 'left': leftPos });
}

/*--------------------------------------------------
Roundabout
--------------------------------------------------*/
function scrollRound()
{
    //$('ul#myRoundabout').roundabout();

    $('ul#myRoundabout_sx').roundabout({
        btnNext: '.next_sx1',
        btnPrev: '.previous_sx1',
        autoplay: true,
        autoplayDuration: 5000,
        autoplayPauseOnHover: true
        //reflect: true
    });

    $('ul#myRoundabout_dx').roundabout({
        btnNext: '.next_dx2',
        btnPrev: '.previous_dx2',
        autoplay: true,
        autoplayDuration: 5000,
        autoplayPauseOnHover: true
        //reflect: true
    });
}



/*--------------------------------------------------
Sezioni
--------------------------------------------------*/
function sezioniAltezza()
{
    $(".prodotti_riassunto .sezione").last().addClass("ultimo_elemento");

    htitolo = 0
    $(".sezione .titolo_grigio").each(function ()
    {
        altTitolo = $(this).height();
        if (altTitolo >= htitolo)
        {
            htitolo = altTitolo
        }
    });
    habstract = 0
    $(".cont_sezione .abstract").each(function ()
    {
        altAbstract = $(this).height();
        if (altAbstract >= habstract)
        {
            habstract = altAbstract
        }
    });
    hsezione = 0
    $(".cont_sezione").each(function ()
    {
        altSez = $(this).height();
        if (altSez >= hsezione)
        {
            hsezione = altSez
        }
    });
    $(".sezione .titolo_grigio").css({ "height": htitolo });
    $(".cont_sezione .abstract").css({ "height": habstract });
    $(".cont_sezione").css({ "height": hsezione });
}




/*--------------------------------------------------
Blocco richiesta
--------------------------------------------------*/
function bloccoRichiesta()
{
    var h = 0
    $(".blocco_richiesta .descrizione").each(function ()
    {
        hdesc = $(this).height();
        if (hdesc >= h)
        {
            h = hdesc
        }
    });
    $(".blocco_richiesta .descrizione").css({ "height": h });
}





/*--------------------------------------------------
Tabs
--------------------------------------------------*/
function tabsProdotti()
{
    //alert("test");
    $("ul.tabs").tabs("div.panes > div");

    $("ul.tabs_prodotto").tabs("div.panes_prodotto > div", function (event, index)
    {
        var markup = $.trim($(".panes_prodotto .cont_pane_prodotto:eq(" + index + ")").html());
        return (markup != "");
    });

    var index = 0;
    $("ul.tabs_prodotto li").each(function ()
    {
        var markup = $.trim($(".panes_prodotto .cont_pane_prodotto:eq(" + (index++) + ")").html());
        if (markup == "")
            $(this).addClass("disabled");
    });

    //scommentare nel caso in cui l'etichetta della tab caratteristiche prende 2 righe e non una sola
    //$("ul.tabs_prodotto a:eq(1)").addClass('long_word');

}




/*--------------------------------------------------
Disabilita i Filtri non clicabili
--------------------------------------------------*/
function DisableFilters(tab, step)
{
    var value;
    var splitted;
    var tab_id;
    var control_id;

    step = step + 1;


    if ($("#list_esigenze").size())
    {

        value = $("#list_esigenze").val();

        splitted = value.split(",");

        control_id = "tab_" + tab + "_" + step;

        $("label[for^='" + control_id + "']").addClass("gray");
        //console.log(splitted);

        $(splitted).each(function ()
        {
            var n;
            if (this != "")
            {
                n = parseInt(this, 10);

                $("label[for^=" + control_id + '_' + "]").each(function (i, e)
                {
                    //console.log(n);
                    var myparent = $(e).parent();
                    $('label[for$=_' + n + ']', myparent).removeClass("gray");
                });
                //console.log($("label[for^='"+ control_id +"']").size());     
            }
        });

    }
}








/*--------------------------------------------------
checkbox  GESTIONE Click Filtri
--------------------------------------------------*/
function hiddenCheckbox()
{


    $(".spunta_hidden").live("click", function ()
    {
        if ($(this).next("label").hasClass("gray")) { } else
        {

            var t = $(this);
            var id;
            var str_array;
            var tab_id;
            var step;
            var ca_ord;
            var ca_id;
            var car_id;
            var id;
            var class_val;
            var step_id;

            var filtro_categorie = "";
            var filtro_esigenze0 = "";
            var filtro_esigenze1 = "";
            var filtro_soluzioni = "";
            var nextstep;
            var cur_step;


            id = $(this).attr('id');
            if (id != null)
            {
                str_array = id.split("_");

                tab_id = parseInt(str_array[1]);
                step = parseInt(str_array[2]);
                //ca_id = parseInt(str_array[3]);

                //ca_ord = $(this).attr("rel");

                ca_id = $(this).attr("rel");

                cur_step = step;

            }



            try
            {
                // Ripulisco i div degli step successivi a quello su cui ho cliccato
                nextstep = parseInt(step) + 1;
                for (var i = nextstep; i <= 4; i++)
                {
                    step_id = "#step" + tab_id + "_" + i;
                    $(step_id).hide('slow');
                    $(step_id).html('');
                }
            } catch (err)
            {
            }




            if ($(this).hasClass("checked"))
            {

                $(this).removeClass("checked")

            } else
            {

                $(this).addClass("checked");


                //Tab "Esisgenze"
                if (tab_id == 0)
                {
                    esclusioneSpunta(t);
                    if (step <= 4)
                    {
                        step = step + 1;
                        get_esigenze(ca_id, tab_id, step);
                    }
                }


                //Tab "categorie"
                if (tab_id == 1)
                {
                    esclusioneSpunta(t);
                    if (step < 2)
                    {
                        step = step + 1;
                        get_categorie(ca_id, tab_id, step);
                    }
                }


                //Tab "Soluzioni Complete"
                if (tab_id == 2)
                {
                    esclusioneSpunta(t);
                }

            }




            // Tab "Esigenze"
            if (tab_id == 0)
            {
                filtro_esigenze0 = "";
                $('.spunta_hidden[id^="tab_0"]').each(function ()
                {
                    id = $(this).attr('id');
                    if ($(this).hasClass("checked"))
                    {
                        str_array = id.split("_");
                        car_id = parseInt(str_array[4]);
                        filtro_esigenze0 = filtro_esigenze0 + "," + car_id;
                    }
                });

                filtro_esigenze0 = filtro_esigenze0.substring(1, filtro_esigenze0.length);


                // eseguo la ricerca con i filtri impostati
                do_search(0, "", filtro_esigenze0, 0);


                DisableFilters(0, cur_step);

            }





            //Tab "Categorie"
            if (tab_id == 1)
            {
                filtro_esigenze1 = "";
                filtro_categorie = "";


                $('.spunta_hidden[id^="tab_1"]').each(function ()
                {
                    id = $(this).attr('id');
                    if ($(this).hasClass("checked"))
                    {
                        str_array = id.split("_");
                        ca_id = parseInt(str_array[3]);
                        step = parseInt(str_array[2]);
                        car_id = parseInt(str_array[4]);

                        if (step == 1)
                        {
                            filtro_categorie = filtro_categorie + "," + ca_id;
                        }
                        if (step == 2)
                        {
                            filtro_esigenze1 = filtro_esigenze1 + "," + car_id;
                        }
                    }
                });

                filtro_categorie = filtro_categorie.substring(1, filtro_categorie.length);
                filtro_esigenze1 = filtro_esigenze1.substring(1, filtro_esigenze1.length);

                // eseguo la ricerca con i filtri impostati
                do_search(0, filtro_categorie, filtro_esigenze1, 1)


                DisableFilters(1, cur_step);
            }



            //Tab "Soluzioni Complete"
            if (tab_id == 2)
            {
                filtro_soluzioni = "";

                $('.spunta_hidden[id^="tab_2"]').each(function ()
                {
                    id = $(this).attr('id');
                    if ($(this).hasClass("checked"))
                    {
                        str_array = id.split("_");
                        car_id = parseInt(str_array[4]);
                        filtro_soluzioni = filtro_soluzioni + "," + car_id;
                    }
                });


                filtro_soluzioni = filtro_soluzioni.substring(1, filtro_soluzioni.length);


                // eseguo la ricerca con i filtri impostati
                if (filtro_soluzioni.length == 0)
                {
                    // Selezione di Default

                    do_search(0, "114", "", 2, 1)
                } else
                {
                    do_search(0, "", filtro_soluzioni, 2, 1)
                }


            }


            scrollFiltri();


        }
		

    });



    $(".spunta_hidden").click(function ()
    {
        $tab = $('.panes .cont_pane').index($(this).parents('.cont_pane'));
    });



    $(".blocco_check label").live("click", function ()
    {
        if ($(this).hasClass("gray")) { } else
        {
            $(this).prev(".spunta_hidden").trigger("click");
        }
    });

}





/*--------------------------------------------------
classTab   GESTIONE EVENTI SUI TABS
--------------------------------------------------*/
function classTab()
{

    var step_id;

    if ($(".tabs li:eq(0) a").is(".current"))
    {
        $(".panes").children("div").eq(0).addClass("tab0");
    }



    $(".tabs li").click(function ()
    {
        var ca_ord;
        var ca_id;
        var car_id;
        var id;
        var step_id;
        var filtro_esigenze0 = "";
        var filtro_categorie = "";
        var filtro_esigenze1 = "";
        var filtro_soluzioni = "";

        $(".panes").children("div").each(function (i, e)
        {
            $(".panes div").removeClass("tab" + i);
        });

        index = $(".tabs li").index(this);


        $(".panes").children("div").eq(index).addClass("tab" + index);



        if (index == 0)
        {
            filtro_esigenze0 = "";
            $('.spunta_hidden[id^="tab_0"]').each(function ()
            {
                id = $(this).attr('id');
                if ($(this).hasClass("checked"))
                {
                    str_array = id.split("_");
                    tab_id = parseInt(str_array[1]);
                    step = parseInt(str_array[2]);
                    ca_id = parseInt(str_array[3]);
                    car_id = parseInt(str_array[4]);
                    ca_ord = $(this).attr("rel");
                    filtro_esigenze0 = filtro_esigenze0 + "," + car_id;
                }
            });

            filtro_esigenze0 = filtro_esigenze0.substring(1, filtro_esigenze0.length);
            // Chiamo la funzione che filtra i risultati


            do_search(0, "", filtro_esigenze0, 0);
        }




        if (index == 1)
        {

            filtro_esigenze1 = "";
            filtro_categorie = "";

            $('.spunta_hidden[id^="tab_1"]').each(function ()
            {
                id = $(this).attr('id');
                if ($(this).hasClass("checked"))
                {
                    str_array = id.split("_");
                    tab_id = parseInt(str_array[1]);
                    step = parseInt(str_array[2]);
                    ca_id = parseInt(str_array[3]);
                    car_id = parseInt(str_array[4]);
                    ca_ord = $(this).attr("rel");
                    //console.log(ca_ord);	

                    if (step == 1)
                    {
                        filtro_categorie = filtro_categorie + "," + ca_id;
                    }
                    if (step == 2)
                    {
                        filtro_esigenze1 = filtro_esigenze1 + "," + car_id;
                    }

                }
            });

            filtro_categorie = filtro_categorie.substring(1, filtro_categorie.length);
            filtro_esigenze1 = filtro_esigenze1.substring(1, filtro_esigenze1.length);


            /*
            // Rimuovo le le opzioni selezionate
            $('.spunta_hidden[id^="tab_1"]').each(function () {
            id = $(this).attr('id');
            $(this).removeClass("checked");
            });
            */



            // Chiamo la funzione che filtra i risultati
            do_search(0, filtro_categorie, filtro_esigenze1, 1)

        }




        if (index == 2)
        {


            /*
            filtro_soluzioni = "";
            filtro_categorie = "";
            $('.spunta_hidden[id^="tab_2"]').each(function () {
            id = $(this).attr('id');
            if ($(this).hasClass("checked")) {
            str_array = id.split("_");
            tab_id = parseInt(str_array[1]);
            step = parseInt(str_array[2]);
            ca_id = parseInt(str_array[3]);
            ca_ord = $(this).attr("rel");
            filtro_soluzioni = filtro_soluzioni + "," + ca_id;
            }
            });
	        


            $('.spunta_hidden[id^="tab_2"]').each(function () {
            id = $(this).attr('id');
            $(this).removeClass("checked");
            });
            */



            // Chiamo la funzione che filtra i risultati
            do_search(0, "114", "", 2, 1);

        }




        if (index == 3)
        {
            $("#lista_categorie").html("");

            //do_search(15, "15", "", 3, 1);
        }


    });

}






function attivaTab()
{
    $(".tabs li a").one("click", function ()
    {

        myTab = $(this).parent().index();

        var step_id;


        try
        {
            // Ripulisco i div degli step successivi al primo 
            for (var i = 2; i <= 4; i++)
            {
                step_id = "#step" + myTab + "_" + i;
                $(step_id).hide('');
                $(step_id).html('');
            }
        } catch (err)
        {
        }


        if (myTab == 0)
        {
            if ($(".cont_pane:empty", myTab))
            {
                get_esigenze(56, 0, 1);
            }
        }


        if (myTab == 1)
        {
            if ($(".cont_pane:empty", myTab))
            {

                get_categorie(3, 1, 1);
            }
        }


        if (myTab == 2)
        {
            if ($(".cont_pane:empty", myTab))
            {
                get_soluzioni_complete(114, 2, 1);
            }
        }

    });
}




/*--------------------------------------------------
Esclusione Spunta
--------------------------------------------------*/
function esclusioneSpunta(a)
{
    //$("body").data("menuesclusivo",e);
    var bloc = a.parents(".blocco_check:eq(0)");
    if ($(".spunta_hidden", bloc).hasClass("checked"))
    {
        $(".spunta_hidden", bloc).removeClass("checked");
        //console.log(a.attr("id"));
        $(a).addClass("checked");
        //console.log("add2");
    } else
    {
        //e.addClass("checked");
        //console.log("add2");
    }
}



/*--------------------------------------------------
Select Trasform
--------------------------------------------------*/
function beautifySelect()
{
    $("div.select_cont").each(function ()
    {
        $(this).append('<div class="select_mod select"><span>' + $(this).find("option:selected").html() + '</span></div>').find("select").css({ opacity: 0 }).change(function ()
        {
            $(this).parent().find("div.select span").html($(this).find(':selected').html());
        });
    });
};

/*--------------------------------------------------
Scroll Filtri
--------------------------------------------------*/
function scrollFiltri(){
	var st = Math.max($("html").scrollTop(),$("body").scrollTop());
	var windowWidth = window.innerWidth;
	if((windowWidth) <= 1280) {
		$('html, body').animate({ scrollTop: ($("#lista_categorie").offset().top -10) }, 800, "swing");
	}
}

/*--------------------------------------------------
Paginazione prodotti
--------------------------------------------------*/
function paginazioneProdotti()
{
    //lcolonna = $(".barra_navigazione_categorie .visualizza_prodotti").width();
    //alert (lcolonna)
    totV = 0
    $(".barra_navigazione_categorie .visualizza_prodotti").each(function ()
    {
        v = $(this).find("li").width();
        totV = totV + v
    });
    mLeft = Math.round(((408 - totV) / 4) - 8);
    $(".visualizza_prodotti ul").css({ "marginLeft": mLeft });
}




/*--------------------------------------------------
Contenitore categorie
--------------------------------------------------*/
function contCategorie()
{
    $(".elenco_categorie .cont_categoria:nth-child(2n+1)").addClass("nomargin");
    $(".cont_immagini").each(function ()
    {
        $(".preview_cat:nth-child(2n)").addClass("nomargin");
    });

    var x = 1;
    $(".cont_categoria:even").each(function ()
    {
        var hT = $(this).find(".titolo").height();
        hT = Math.max(hT, $(this).next('.cont_categoria').find(".titolo").height());
        //$(this).attr('title',$(this).next('.cont_categoria').find(".titolo").height());
        $(this).find(".titolo").height(hT + x);
        $(this).next('.cont_categoria').find(".titolo").height(hT + x);
        //x+=1;
    });

    var y = 1;
    $(".cont_categoria:even").each(function ()
    {
        var hT = $(this).find(".descrizione").height();
        hT = Math.max(hT, $(this).next('.cont_categoria').find(".descrizione").height());
        //$(this).attr('title',$(this).next('.cont_categoria').find(".descrizione").height());
        $(this).find(".descrizione").height(hT + y);
        $(this).next('.cont_categoria').find(".descrizione").height(hT + y);
        //y+=1;
    });
}



/*--------------------------------------------------
Copertina Prodotto
--------------------------------------------------*/
function prodottoPaginazione()
{

    $(".elenco_prodotti .wrapProdotto:nth-child(4n)").addClass("nomargin");
    $(".elenco_prodotti .cont_prodotto:nth-child(4n+1)").css({ "clear": "both" });
    /*$(".cont_prodotto").each(function () {
    imageHeight = $(this).find(".himg").height();
    //imageHeight = $(".himg").height();
    hCont = $(this).find(".cont_immagine").height();
    mTop = Math.round((hCont - imageHeight) / 2);
    //alert (hCont);
    $(this).find(".himg").css({ "marginTop": mTop });
    });*/



    var $pArr = $('.wrapProdotto');
    var pArrLen = $pArr.length;
    //    for (var i = 0; i < pArrLen; i += 4) {
    //        $pArr.filter(':eq(' + i + '),:eq(' + (i + 1) + '),:eq(' + (i + 2) + '),:eq(' + (i + 3) + ')').wrapAll('<div class="wrapBox cf"></div>');
    //    };

    $(".row_prodotti").each(function ()
    {
        h = 0
        y = 0
        z = 0
        $(".cont_prodotto", this).each(function ()
        {
            hTitolo = $(".titolo", this).height();
            if (hTitolo >= h)
            {
                h = hTitolo
            }
        });
        $(".cont_prodotto", this).each(function ()
        {
            hDesc = $(".descrizione", this).height();
            if (hDesc >= y)
            {
                y = hDesc
            }
        });
        $(".cont_prodotto", this).each(function ()
        {
            hDesc02 = $(".descrizione02", this).height();
            if (hDesc02 >= z)
            {
                z = hDesc02
            }
        });
        //$(".titolo", this).height(h);
        //$(".descrizione", this).height(y);
        //$(".descrizione02", this).height(z);
    });

    $(".wrapProdotto .cont_prodotto").each(function ()
    {

        //console.log("paginazione");

        $(this).hover(function ()
        {
            $(this).parent('.wrapProdotto').css({ 'z-index': 10 });
            $(this).addClass("prodotto_hover rd_15");
            $(".abstract", this).show();
        }, function ()
        {
            $(this).parent('.wrapProdotto').css({ 'z-index': 1 });
            $(this).removeClass("prodotto_hover rd_15");
            $(".abstract", this).hide();
        });

    });

}


$(window).load(prodottoPaginazione);


/*--------------------------------------------------
Prodotto Gallery
--------------------------------------------------*/
function prodottoGallery()
{
    $(".scrollable_prodotto").scrollable({ next: '.next_prodotto', prev: '.prev_prodotto' });
    $(".scrollable_prodotto .cont_img_gallery .img_gallery:nth-child(4n)").addClass("no_margin");
    $(".scrollable_prodotto .cont_img_gallery .img_gallery a.fancy_video").prepend('<div class="play_video">');
    //	$(".scrollable_prodotto .items .cont_img_gallery img").click(function() {
    //		if ($(this).hasClass("active")) { return; }
    //		var url = $(this).attr("src").replace("_t", "");
    //		var wrap = $("#image_wrap").fadeTo("medium", 0.5);
    //		var img = new Image();
    //		img.onload = function() {
    //			wrap.fadeTo("fast", 1);
    //			wrap.find("img").attr("src", url);
    //		};
    //		img.src = url;
    //		$(".scrollable_prodotto .items .cont_img_gallery img").removeClass("active");
    //		$(this).addClass("active");
    //	}).filter(":first").click();

    $(".scrollable_interesse").scrollable({ next: '.next_interesse', prev: '.prev_interesse' }).navigator();
    nNavi_hp = 0
    $(".cont_gallery_interesse .navi a").each(function ()
    {
        numberNavi_hp = nNavi_hp + 1
        if (numberNavi_hp >= nNavi_hp)
        {
            nNavi_hp = numberNavi_hp
        }
        $(this).addClass("numnavi_prodotto_" + nNavi_hp + "");
    });

    $(".scrollable_correlati").scrollable({ next: '.next_correlati', prev: '.prev_correlati' }).navigator();
    nNavi_hp = 0
    $(".cont_gallery_correlati .navi a").each(function ()
    {
        numberNavi_hp = nNavi_hp + 1
        if (numberNavi_hp >= nNavi_hp)
        {
            nNavi_hp = numberNavi_hp
        }
        $(this).addClass("numnavi_prodotto_" + nNavi_hp + "");
    });

    hBS = $(".cont_classe_energetica .blocco_dx_ico img").height();
    hBd = $(".cont_classe_energetica_desc .blocco_sx").outerHeight();
    $(".cont_classe_energetica .blocco_sx").height(hBS - 26);
    //$(".cont_classe_energetica_desc .blocco_dx_ico").height(hBd+36);
    $(".cont_classe_energetica_desc .blocco_sx li:nth-child(2n+1)").css({ "clear": "both", "width": "208", "margin-right": "10px" });
    $(".cont_classe_energetica_desc .blocco_dx_ico .icone ul li").hover(function ()
    {
        $(".desc_icona").hide();
        $(this).find(".desc_icona").show();
    }, function ()
    {
        $(".desc_icona").hide();
    });

    $(".info li").addClass("cf");

}



/*--------------------------------------------------
Intestazione ON
--------------------------------------------------*/
function intestazioneOn()
{

    $(".intestazione .blocco_dx_man a").click(function ()
    {
        $(".manuali_documentazione").hide();
        $(".tua_ricerca").hide();
        $(".freccia_giu").remove();
    });

    $(".intestazione .blocco_dx_man a.puls_manuali_documentazione").click(function ()
    {
        $(".intestazione .blocco_dx_man a").removeClass("on");
        $(this).addClass("on").append('<div class="freccia_giu">');

        login("", "");

        $(".fancyLink").fancybox({ "type": "iframe", "autoDimensions": false, "height": 430 });
        $(".fancyRegistra").fancybox({ "type": "iframe", "autoDimensions": false, "height": 600 });
        $(".fancyPrivacy").fancybox({ "type": "iframe", "autoDimensions": false, "height": 300 });
        $(".manuali_documentazione").show();

        $(".manuali_documentazione .chiudi").click(function ()
        {
            $(".manuali_documentazione").hide();
            $(".puls_manuali_documentazione").removeClass("on");
            $(".freccia_giu").remove();
            return false;
        });

        return false;
    });


    $(".intestazione .blocco_dx_man a.puls_tua_ricerca").click(function ()
    {
        $(".intestazione .blocco_dx_man a").removeClass("on");
        $(this).addClass("on").append('<div class="freccia_giu">');
        $(".tua_ricerca").show();
        $(".tua_ricerca .chiudi").click(function ()
        {
            $(".tua_ricerca").hide();
            $(".puls_tua_ricerca").removeClass("on");
            $(".freccia_giu").remove();
            return false;
        });
    });

    $(".scrollable_ris_ric").scrollable({ next: '.next_ris_ric', prev: '.prev_ris_ric' });
    $(".scrollable_ris_ric .cont_img_gallery .img_gallery:nth-child(4n)").addClass("no_margin");
}




/*--------------------------------------------------
Universo Ariston
--------------------------------------------------*/
function universoAriston()
{
    $(".menu_universo .brand").append('<div class="tringolo rosso">');
    $(".notizia .cont_titolo.brand").append('<div class="tringolo rosso">');
    $(".articoli_evidenza li.brand .cont_immagine").append('<div class="libro rosso">');
    $(".video_evidenza li.brand .cont_immagine").append('<div class="camera rosso">');

    $(".menu_universo .eff_ene").append('<div class="tringolo verde">');
    $(".notizia .cont_titolo.eff_ene").append('<div class="tringolo verde">');
    $(".articoli_evidenza li.eff_ene .cont_immagine").append('<div class="libro verde">');
    $(".video_evidenza li.eff_ene .cont_immagine").append('<div class="camera verde">');

    $(".menu_universo .tec_inn").append('<div class="tringolo grigio">');
    $(".notizia .cont_titolo.tec_inn").append('<div class="tringolo grigio">');
    $(".articoli_evidenza li.tec_inn .cont_immagine").append('<div class="libro grigio">');
    $(".video_evidenza li.tec_inn .cont_immagine").append('<div class="camera grigio">');

    $(".cont_colonne_universo .rd_15").each(function ()
    {
        $(this).addClass("pos_rel").append('<div class="sfondo">');
    });
    $(".twitter ul li").last().addClass("ultimo_elemento");

    $(".articoli_evidenza ul").each(function ()
    {
        $(this).find("li:last").addClass("ultimo_elemento");
    });

    $(".col_03 .articoli_evidenza .play_video").each(function ()
    {
        hCont = $(this).height();
        $(this).append('<div class="ico_video">');
        $(".ico_video").height(hCont);
    });
	$('.riga_news .notizia:nth-child(2n)').css({"margin-right":0});
	//$('.elenco_news_prodotti .riga_news .notizia:nth-child(2n+1)').css({"clear":"both"});
	h=0
	y=0
	$('.riga_news .titolo').each(function(){
		myY = $(this).height();
		if(myY>y){
			y=myY
		}
	});
	$('.riga_news .abstract').each(function(){
		myH = $(this).height();
		if(myH>h){
			h=myH
		}
	});
	$('.riga_news .titolo').height(y);		
	$('.riga_news .abstract').height(h);		
}



/*--------------------------------------------------
Lancia fancybox
--------------------------------------------------*/
function lanciaFancy()
{
    $(".fancy").fancybox({ "titleShow": false, "overlayShow": false });
    $(".fancy_video").fancybox({ "type": "swf" });
}

/*--------------------------------------------------
Calendario News
--------------------------------------------------*/
//function calendarioNews(){
//	$( "#datepicker" ).datepicker();
//}



/*--------------------------------------------------
Copertina Servizi
--------------------------------------------------*/
function copServizi()
{
    var $pArr = $('.cont_elenco_servizi .servizio');
    var pArrLen = $pArr.length;
    for (var i = 0; i < pArrLen; i += 3)
    {
        $pArr.filter(':eq(' + i + '),:eq(' + (i + 1) + '),:eq(' + (i + 2) + ')').wrapAll('<div class="wrapBox cf"></div>');
    };

    $(".cont_elenco_servizi .wrapBox").each(function ()
    {
        h = 0
        y = 0
        $(".servizio", this).each(function ()
        {
            hTitolo = $(".titolo_grigio", this).height();
            if (hTitolo >= h)
            {
                h = hTitolo
            }
        });
        $(".servizio", this).each(function ()
        {
            hDesc = $(".descrizione", this).height();
            if (hDesc >= y)
            {
                y = hDesc
            }
        });
        $(".titolo_grigio", this).height(h);
        $(".descrizione", this).height(y);
    });

    $(".cont_interno .rd_15").each(function ()
    {
        $(this).addClass("pos_rel").append('<div class="sfondo">');
    });
    $(".cont_interno .blocco_sx .interesse li:last").addClass("ultimo_elemento");


}



/*--------------------------------------------------
Footer
--------------------------------------------------*/
function altezzaFooter()
{
    var h = 0
    $(".footer_mappa ul").children("li").each(function ()
    {
        altezzaUl = $(this).height();
        //alert (altezzaUl)
        if (altezzaUl >= h)
        {
            h = altezzaUl
        }
    });
    $(".footer_mappa ul li").not(".footer_mappa ul li ul li").css({ "height": h });
    c = h - ($(".footer_mappa ul li.AG").height()) - ($(".footer_mappa ul li.AH").height());
    $(".footer_mappa ul li.AI").not(".footer_mappa ul li ul li").css({ "height": c });
    $(".firma ul li").first().addClass("primo_elemento");
}



/*--------------------------------------------------
Blocchi Espandibili
--------------------------------------------------*/
function blocchiespandibili()
{
    $('.scrollable.dettaglio .item .img').hover(function ()
    {
        $('img', this).stop().animate({ 'height': '105%', 'width': '105%' }, 300);
    }, function ()
    {
        $('img', this).animate({ 'height': '100%', 'width': '100%' }, 300);
    });
}


function initAddThis()
{
    var addthis_config = { ui_use_css: false }
    addthis.init()
}



/*--------------------------------------------------
Altezza Uguale
--------------------------------------------------*/
function equalHeight(group)
{
    tallest = 0;
    group.each(function ()
    {
        thisHeight = $(this).height();
        if (thisHeight > tallest)
        {
            tallest = thisHeight;
        }
    });
    group.height(tallest);
}

/*--------------------------------------------------
Controlla GREEN AND BLACK  SCHEDA PRODOTTO
--------------------------------------------------*/
function greenBlack()
{
    if ($.trim($('.blocco_sx .corpo3').text()) == "")
    {
        $('.blocco_sx .corpo3').hide();
    }
    if ($.trim($('.green').html()) == "")
    {
        $('.green').hide();
    }
    if ($.trim($('.banner').html()) == "")
    {
        $('.banner').hide();
    }
}


/*--------------------------------------------------
Controlla quali filti ingrigire
--------------------------------------------------*/

function setFilters()
{
    if ($("#list_esigenze").size())
    {
        v = $("#list_esigenze").val();
        splitted = v.split(",");

        $(".tab0 label").addClass("gray");

        $(splitted).each(function ()
        {
            if (this != "")
            {
                $(".tab0 label[for$='_" + this + "']").removeClass("gray");
            }
        });
    }
}



function setMyfilter()
{
    filter = $('#list_categorie').val().split(',');

    $.each(filter, function (i, val)
    {
        if (val != "")
        {
            $('[rel="' + val + '"]').addClass('checked').parents('.blocco_check').show();
        }
    });
}



function cursorDefault() {
    $('a').each(function () {
        if ($(this).attr("href") == "#") {
            $(this).css({ "cursor": "default" });
        }
    });
}

//rework
function mySlick() {
    if ($('.my_slick').size()) {
        $('.my_slick').slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1
        });
    }
}

function titoliSlick() {
    hTitolo = 0;
    $('.servizi_dx strong').each(function () {
        myh = $(this).height();
        if (myh > hTitolo) {
            hTitolo = myh
        }
    });
    $('.servizi_dx strong').height(hTitolo);
}

function openManuali() {
    $('.descrizione_prodotto .blocco_dx .manuali').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 500, "swing");
        $(".intestazione .blocco_dx_man a").click();
        return false;
    });

}
//rework

/*--------------------------------------------------
INIT
--------------------------------------------------*/
$(function () {
  
    cursorDefault();
    //menuServizio();
    window.setTimeout(menuServizio, 500);
    //menuPrincipale();
    subMenu();
    window.setTimeout(scrollHp, 500);
    //scrollHp();
    scrollEvidenza();
    sezioniAltezza();
    bloccoRichiesta();
    tabsProdotti();
    hiddenCheckbox();
    beautifySelect();
    window.setTimeout(paginazioneProdotti, 1000);
    window.setTimeout(contCategorie, 500);
    window.setTimeout(prodottoGallery, 500);
    intestazioneOn();
    window.setTimeout(universoAriston, 1000);
    window.setTimeout(navigatorHP, 500);
    lanciaFancy();
    //	calendarioNews();

    copServizi();

    //altezzaFooter();

    //window.setTimeout(altezzaFooter, 1000);
    universoNotiziePrecedenti();
    notizieProdottiPrecedenti();
    blocchiespandibili();
    classTab();
    ImageGallery();
    greenBlack();
    //setFilters();
    attivaTab();
    //setMyfilter();	

    if ($("#srvDwlDocs").size() > 0)
        srvDwlDocs();

    if (querySt("dwlDoc") == "1")
        setTimeout("$('.puls_manuali_documentazione').click();", 750);


    scrollRound();
    //initAddThis();


});

$(window).load(function ()
{
    mySlick();
    //titoliSlick();
    openManuali();

    altezzaFooter();
    //equalHeight($(".box_det_height"));
});