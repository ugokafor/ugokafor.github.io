/// <reference path="/JS/jquery-1.7.1.min-vsdoc.js" />

var searching = false;
$(function ()
{
    init();
    if ($("#setFilters").size())
        setTimeout("setFilters();", 500);

});

function doSearch()
{
    if (searching)
        return;

    Log("doSearch();")
    searching = true;
    var cssClass = ($(".elenco_categorie").size() > 0 ? ".elenco_categorie" : ".elenco_prodotti");
    $(cssClass).html("<img id='searchLoading' src='imgs/loading.gif' /> Loading ...");

    var data = {};
    data.tipoRicerca = ($(".elenco_categorie").size() > 0 ? "categorie" : "prodotto");
    data.Esigenze = getValues(".esigenze");
    data.PresEnergetiche = getValues(".prest_energetiche");
    data.Categorie = getValues(".categorie");

    Log("data.Esigenze = " + data.Esigenze);
    Log("data.PresEnergetiche = " + data.PresEnergetiche);
    Log("data.Categorie = " + data.Categorie);

    var filters = { 'filters': data };

    $.ajax({
        type: "POST",
        url: "WS/wsGetContent.asmx/doSearch",
        cache: false,
        contentType: "application/json; charset=utf-8",
        data: JSON2.stringify(filters),
        dataType: "json",
        success: function (data)
        {
            searching = false;
            $(cssClass).html(data.d.HTML);
            setTimeout("prodottoPaginazione();", 500);
            if ($(".elenco_categorie").size() > 0)
                contCategorie();

            $(".prodotti_trovati ul.cf li.rosso span.colore_rosso").html($(".cont_prodotto").size());
            $("#searchLoading").remove();
        },
        error: wsError
    });
	scrollFiltri();
}

/*--------------------------------------------------
Scroll Filtri
--------------------------------------------------*/
function scrollFiltri(){
	var st = Math.max($("html").scrollTop(),$("body").scrollTop());
	var windowWidth = window.innerWidth;
	if((windowWidth) <= 1280) {
		$('html, body').animate({ scrollTop: ($(".elenco_categorie").offset().top -10) }, 800, "swing");
	}
}

function doSearchByCat(sender)
{
    var idCat = $(sender).val();
    location.href = "List_by_Category?ca_id=" + idCat;
}


function getValues(mainClass)
{
    var values = new Array();

    $(mainClass + " input:checked").each(function ()
    {
        values.push($(this).val());
    });

    return values;
}




function Log(msg)
{
    try
    {
        console.debug(msg);
    }
    catch (e) { }
}


function wsError(jqXHR, textStatus, errorThrown)
{
    // rimuovo il Loading
    $("#searchLoading").remove();
    init();

    // msg errore
    var msg = textStatus;
    if (errorThrown != null && errorThrown != "")
        msg = textStatus + " (" + errorThrown + ")";

    Log("  " + msg);
    alert("Failed to Complete the Search due to this Reason:\r\n" + msg);
    searching = false;
}

function init()
{
    $(".esigenze input").click(doSearch);
    $(".prest_energetiche input").click(doSearch);
    $(".categorie input").click(doSearch);
}

function setFilters()
{
    var v, splitted;

    if ($("#setEsigenze").size())
        setValues(".esigenze", $("#setEsigenze").val());

    if ($("#setPEnergetiche").size())
        setValues(".prest_energetiche", $("#setPEnergetiche").val());

    var ca = querySt("ca_id");
    searching = true;
    $(".categorie input[value='" + ca + "']").click();
    searching = false;
    // $(".categorie label[for!='Cat" + ca + "']").addClass("gray");
    // $(".categorie input").attr("disabled", "disabled");
    $(".categorie").parent().parent().prev().click();
    $(".categorie input").unbind("click");
    $(".categorie input").click(function () { doSearchByCat(this); });

    if ($("#EsigenzeOK").size())
    {
        v = $("#EsigenzeOK").val();
        splitted = v.split(",");

        $(".esigenze label").addClass("gray");
        $(".esigenze input").attr("disabled", "disabled");
        $(splitted).each(function ()
        {
            if (this != "")
            {
                $(".esigenze label[for='Esigenza" + this + "']").removeClass("gray");
                $(".esigenze input[value='" + this + "']").removeAttr("disabled");
            }
        });
    }

    if ($("#PEnergeticheOK").size())
    {
        v = $("#PEnergeticheOK").val();
        splitted = v.split(",");

        $(".prest_energetiche label").addClass("gray");
        $(".prest_energetiche input").attr("disabled", "disabled");
        $(splitted).each(function ()
        {
            if (this != "")
            {
                $(".prest_energetiche label[for='PrestEn" + this + "']").removeClass("gray");
                $(".prest_energetiche input[value='" + this + "']").removeAttr("disabled");
            }
        });
    }

    $(".esigenze").parent().parent().prev().click();
    $(".prest_energetiche").parent().parent().prev().click();
}

function setValues(obj, values)
{
    var splitted = values.split(",");
    $(splitted).each(function ()
    {
        searching = true;
        $(obj + " input[value='" + this + "']").click();
        searching = false;
    });
}
