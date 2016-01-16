/// <reference path="/JS/jquery-1.7.1.min-vsdoc.js" />

/*---------------------------
 universoNotiziePrecedenti
---------------------------*/
function universoNotiziePrecedenti()
{
    if ($(".notizie_precedenti").size() > 0)
    {
        $(".notizie_precedenti").click(function ()
        {
            return recuperaNotiziePrecedenti(this);
        });
    }

    var type = $("#currType").val();
    if (type > -1)
        $(".news_type" + type + " a").addClass("active");
}

function notizieProdottiPrecedenti() {
    if ($(".newsprodottii_precedenti").size() > 0) {
        $(".newsprodottii_precedenti").click(function () {
            return recuperaNewsProdottiPrecedenti(this);
        });
    }

    var type = $("#currType").val();
    if (type > -1)
        $(".news_type" + type + " a").addClass("active");
}

function recuperaNotiziePrecedenti(sender)
{
    $(sender).remove();
    $(sender).after("<img id='notPrecLoading' src='imgs/loading.gif' />");

    var type = $("#currType").val();
    if (type == "")
        type = -1;
    var fData = $("#currDate").val();
    var tag = $("#currTag").val();
    var nrNotizie = $("#currNrNotizie").val();

    $.ajax({
        type: "POST",
        url: "WS/wsGetContent.asmx/NotiziePrecedenti",
        cache: false,
        contentType: "application/json; charset=utf-8",
        data: JSON2.stringify({ 'type': type, 'fDate': fData, 'tag': tag, 'currNotizie': nrNotizie }),
        dataType: "json",
        success: function (data)
        {
            // rimuovo il Loading
            $("#notPrecLoading").remove();

            $("#currType").remove();
            $("#currNrNotizie").remove();

            // lista dei risultati
            //$(".cont_notizie").append(data.d.HTML);
            $(".col_02").append(data.d.HTML);
            universoNotiziePrecedenti();
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            // rimuovo il Loading
            $("#notPrecLoading").remove();

            // errore
            var msg = textStatus;
            if (errorThrown != null && errorThrown != "")
                msg = textStatus + " (" + errorThrown + ")";

            alert("Failed to Complete the Search due to this Reason:\r\n" + msg);
        }
    });
    return false;
}

function recuperaNewsProdottiPrecedenti(sender) {
    $(sender).remove();
    $(sender).after("<img id='notPrecLoading' src='imgs/loading.gif' />");

    var type = $("#currType").val();
    if (type == "")
        type = -1;
    var fData = $("#currDate").val();
    var tag = $("#currTag").val();
    var nrNotizie = $("#currNrNotizieProdotti").val();

    $.ajax({
        type: "POST",
        url: "WS/wsGetContent.asmx/NewsProdottiPrecedenti",
        cache: false,
        contentType: "application/json; charset=utf-8",
        data: JSON2.stringify({ 'currNrNotizieProdotti': nrNotizie }),
        dataType: "json",
        success: function (data) {
            // rimuovo il Loading
            $("#notPrecLoading").remove();

            $("#currType").remove();
            $("#currNrNotizieProdotti").remove();

            // lista dei risultati
            $(".col_02").append(data.d.HTML);
            notizieProdottiPrecedenti();
            $('.riga_news .notizia:nth-child(2n)').css({ "margin-right": 0 });
            //$('.elenco_news_prodotti .riga_news .notizia:nth-child(2n+1)').css({"clear":"both"});
            h = 0
            y = 0
            $('.riga_news .titolo').each(function () {
                myY = $(this).height();
                if (myY > y) {
                    y = myY
                }
            });
            $('.riga_news .abstract').each(function () {
                myH = $(this).height();
                if (myH > h) {
                    h = myH
                }
            });
            $('.riga_news .titolo').height(y);
            $('.riga_news .abstract').height(h);		

        },
        error: function (jqXHR, textStatus, errorThrown) {
            // rimuovo il Loading
            $("#notPrecLoading").remove();

            // errore
            var msg = textStatus;
            if (errorThrown != null && errorThrown != "")
                msg = textStatus + " (" + errorThrown + ")";

            alert("Failed to Complete the Search due to this Reason:\r\n" + msg);
        }
    });
    return false;
}

function loadNewsNumberByDaysAndType()
{
    var type = $("#currType").val();
    if (type == "")
        type = -1;

    $.ajax({
        type: "POST",
        url: "WS/wsGetContent.asmx/CounterNews",
        cache: false,
        contentType: "application/json; charset=utf-8",
        data: JSON2.stringify({ 'type': type }),
        dataType: "json",
        success: function (data)
        {
            var result = data.d;
            $(result).each(function ()
            {
                var data = this.Data;
                var nrTipo1 = this.nrBrands;
                var nrTipo2 = this.nrEnergy;
                var nrTipo3 = this.nrDesign;

                //alert(data + ' ' + nrTipo1 + ' ' + nrTipo2 + ' ' + nrTipo3);

                if ((type == -1 || type == 1) && nrTipo1)
                    addTriangolo(data, "rosso");

                if ((type == -1 || type == 2) && nrTipo2)
                    addTriangolo(data, "verde");

                if ((type == -1 || type == 3) && nrTipo3)
                    addTriangolo(data, "grigio");
            });
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            var msg = textStatus;
            if (errorThrown != null && errorThrown != "")
                msg = textStatus + " (" + errorThrown + ")";

            alert(msg);
        }
    });
}


function addTriangolo(data, cssClass)
{
    var splitted = data.split("/");
    var MeseAnno = "," + ((splitted[1] * 1) - 1) + "," + splitted[2] + ",";
    var Giorno = splitted[0];

    var href = $(".ui-datepicker-calendar td[onclick*='" + MeseAnno + "'][rel='" + Giorno + "'] a");
    $(href).append("<div class='triangolo_small " + cssClass + "'> </div>");
}


$(document).ready(function ()
{
    var selected_date;
    if ($(".ww").size() > 0)
        $("#datepicker").datepicker($.datepicker.regional["en-GB"]);    // WorldWide:   Calendario in Inglese
    else
        $("#datepicker").datepicker($.datepicker.regional["it"]);       // Italia:      Calendario in Italiano

    // workaround per l'evento 'onSelect' che non funziona
    //$('#datepicker .ui-datepicker-calendar td').live('focus', function ()
    $('#datepicker .ui-datepicker-calendar td').live('click mouseup', function ()
    {
        // recupero mese, anno e giorno
        var attr = $(this).attr('onclick');
        attr = attr.split("#datepicker',")[1].split(", this")[0];

        var meseAnno = attr.split(",");
        var mese = parseInt(meseAnno[0]) + 1;
        var anno = meseAnno[1];
        giorno = $.trim($(this).text());

        selected_date = giorno + '/' + mese + "/" + anno;

        // 'redirect con filtri in querystring
        var type = $("#currType").val();
        var index = location.href.indexOf("?");
        var url = location.href.substring(0, index);

        if (type > 0)
            url = url + "?type=" + type + "&date=" + selected_date;
        else
            url = url + "?date=" + selected_date;

        if (querySt("co_id") != null)
            url = url + "&co_id=" + querySt("co_id");

        location.href = url;
    });

    initTrangolini();
});


function initTrangolini()
{
    if ($("#currType").size() > 0)
    {
        $('.ui-datepicker-calendar td').each(function ()
        {
            // ad ogni td, aggiungo l'attributo rel con il giorno
            // per ritrovarlo più facilmente nella funziona addTriangolo
            $(this).attr('rel', $(this).find("a").text());
        });

        loadNewsNumberByDaysAndType();

        var onClickPrev = $("a.ui-datepicker-prev").attr("onclick");
        onClickPrev = onClickPrev + "initTrangolini();"
        $("a.ui-datepicker-prev").attr("onclick", onClickPrev);

        var onClickNext = $("a.ui-datepicker-next").attr("onclick");
        onClickNext = onClickNext + "initTrangolini();"
        $("a.ui-datepicker-next").attr("onclick", onClickNext);
    }
}


$(function ()
{
    if ($("#imgBackground").size() > 0)
    {
        var img = $("#imgBackground").val();
        if (img != "")
            $(".cont_universo").css("background-image", "url('" + img + "')");
    }
});
