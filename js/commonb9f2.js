/// <reference path="/JS/jquery-1.7.1.min-vsdoc.js" />

//
// cambioPaese
// 
function cambioPaese(sender)
{
    var attrId = $(sender).attr("id");
    if (attrId != null && attrId != "")
    {
        var meId = attrId.substring(2);
        $.ajax({
            type: "POST",
            url: "WS/wsGetContent.asmx/changePaese",
            cache: false,
            contentType: "application/json; charset=utf-8",
            data: JSON2.stringify({ 'changeTo': meId }),
            dataType: "json",
            success: function (data)
            {
                if (data.d.Status)
                    location.href = data.d.HTML;
                else
                    alert(data.d.ErrMessage);
            },
            error: wsError
        });
        return false;
    }
    else
        return true;
}

//
// setMenuOn
//
function setMenuOn()
{
    if ($("#setCoInMenu").size() > 0)
    {
        var curr = $("#setCoInMenu").val();
        $("#co_" + curr).addClass("on");
    }
}


//
// QueryString
//
function querySt(ji)
{
    hu = window.location.search.substring(1);
    gy = hu.split("&");
    for (i = 0; i < gy.length; i++)
    {
        ft = gy[i].split("=");
        if (ft[0] == ji)
        {
            return ft[1];
        }
    }
}


/*--------------------------------------------------
menu PAESI
--------------------------------------------------*/

function menuPaesi()
{
    $('.head .paese a').click(function ()
    {
		if($('.ie7').size() != 1) {
			var m = $('#contMenuPaesi:visible').size();
			if (m == 0)
			{
			    //$('#contMenuPaesi').show().animate({ height: "90px" }, 800);
			    $('#contMenuPaesi').show().animate({ height: "135px" }, 800);
				$('#wrapMenuPaesi').delay(800).fadeIn(500);
			} else
			{
				$('#wrapMenuPaesi').fadeOut(500, function ()
				{
					closeMenuPaesi();
				});
			}
		}
        return false;
    });
}

function closeMenuPaesi()
{
    $('#contMenuPaesi').animate({ height: "0px" }, 800, function ()
    {
        $('#contMenuPaesi').hide();
    });
}

/*-----------------------------------------------
Scroller Image Gallery
------------------------------------------------*/
function ImageGallery()
{

    $(".scrollable").scrollable();
    $(".scrollable.dettaglio .items img").click(function ()
    {
        // see if same thumb is being clicked
        if ($(this).hasClass("active")) { return; }
        // calclulate large image's URL based on the thumbnail URL (flickr specific)
        var url = $(this).attr("rel");
        // get handle to element that wraps the image and make it semi-transparent
        var wrap = $("#image_wrap").fadeTo("medium", 0.5);
        // the large image from www.flickr.com
        var img = new Image();
        // call this function after it's loaded
        img.onload = function ()
        {
            // make wrapper fully visible
            wrap.fadeTo("fast", 1);
            // change the image
            if (wrap.find("img").size() == 0)
                wrap.append("<img src='" + url + "' />");
            else
                wrap.find("img").attr("src", url);
        };
        // begin loading the image from www.flickr.com
        img.src = url;
        // activate item
        $(".items img").removeClass("active");
        $(this).addClass("active");
        // when page loads simulate a "click" on the first image
    });

    if ($(".video_container").size() == 0)
        $(".scrollable.dettaglio .items img:eq(0)").click();
}

// CERCA nel SITO
function cercaNelSito()
{
    $("#search_top").click(function () { doSiteSearch(this); return false; });
    $("#ricerca input").keyup(function (e)
    {
        if (e.keyCode == 13) // INVIO
        {
            $("#search_top").click();
            return false;
        }
    });
}

// CERCA nel SITO
function doSiteSearch(sender)
{
    var txt = $.trim($("#txt_cerca").val());
    var url = $("#txt_url").val();

    if (txt.length > 0)
        location.href = url + "?search=" + unescape(txt);
}


//
// Init
//
$(function () {
    menuPaesi();
    setMenuOn();
    srvDwlDocs();
    cercaNelSito();

   
        if ($(".dettaglio .items img").size() <= 0)
        $(".wrap_scrol_dettaglio .gallery").remove();

        if ($("#setMenuOn").size() > 0) {
        var caOrdine = $("#setMenuOn").val();

         if (caOrdine != "")  {

            if (caOrdine == "AJ") {
                $(".cont_menu_princ .AD a").addClass("active");
            } else {
                $(".cont_menu_princ ." + caOrdine + " a").addClass("active");
            }
     
         }

    }

});


/*----------------
srvDwlDocs
-----------------*/
function srvDwlDocs()
{
    // AUTOCOMPLETE PRODOTTO

    $("#txtNomeProdotto").autocomplete({
        source: autocompleteProdottiSource,
        minLength: 2,
        select: function (event, ui)
        {
           setTimeout("$('#btnSearchDocs').click();", 100);
        }
    });

    $("#txtNomeProdotto1").autocomplete({
        source: autocompleteProdottiSource,
        minLength: 2,
        select: function (event, ui)
        {
           setTimeout("$('#btnSearchDocs1').click();", 100);
        }
    });

    $("#txtNomeProdotto2").autocomplete({
        source: autocompleteProdottiSource,
        minLength: 2,
        select: function (event, ui)
        {
            setTimeout("$('#btnSearchDocs2').click();", 100);
        }
    });

    $("#txtNomeProdottoMenu").autocomplete({
        source: autocompleteProdottiSource,
        minLength: 2,
        select: function (event, ui)
        {
            setTimeout("$('#btnSearchDocsMenu').click();", 100);
        }
    });

    // CLICK SU btnSearchDocs
    $(".btnSearchProd").click(function ()
    {
        var myId = $(this).attr("id");
        var v;
        var t;

        switch (myId)
        {
            case "btnSearchDocs1":
                {

                    t = "1";
                    break;
                }

            case "btnSearchDocs2":
                {
                    t = "2";
                    break;
                }

            case "btnSearchDocsMenu":
                {
                    t = "3";
                    break;
                }

            default:
                {
                    t = "";
                    break;
                }
        }
        if ($("#txtNomeProdotto" + t).size() > 0)
            v = $.trim($("#txtNomeProdotto" + t).val());
        else
            v = $.trim($("#txtNomeProdottoMenu").val());

        if (v.length > 0)
        {
            $.ajax({
                cache: false,
                type: "POST",
                url: "WS/wsGetContent.asmx/DwlDocsProdotti",
                dataType: "json",
                data: JSON2.stringify({ "nome": v, "t": t }),
                contentType: "application/json; charset=utf-8",
                success: function (data)
                {
                    if (t == "3")
                    {
                        if (data.d.Status)
                        {
                            var result = data.d.HTML;
                            if (result.indexOf("<span ") == -1)
                                location.href = result;
                            else
                            {
                                $("#" + myId).next().remove();
                                $("#" + myId).after(result);
                            }
                        }
                        else
                            alert(data.d.ErrMessage);
                    }
                    else
                    {
                        if (data.d.Status)
                            $("#searchResult" + t).html(data.d.HTML);
                        else
                            $("#searchResult" + t).html(data.d.ErrMessage);
                    }
                },
                error: function () {
                    //alert("ws error!");
                 }
            });
        }
    });
}

function autocompleteProdottiSource(request, response)
{
    $.ajax({
        cache: true,
        type: "POST",
        url: "WS/wsGetContent.asmx/AutoCompleteProdotti",
        dataType: "json",
        data: JSON2.stringify({ "term": request.term }),
        contentType: "application/json; charset=utf-8",
        success: function (data)
        {
            response($.map(data.d, function (item)
            {
                return { label: item.Titolo, value: item.Titolo };
            }));
        }
    });
}

var _okSubmit = false;
function searchProdRework(sender)
{
    if (_okSubmit)
    {
        _okSubmit = false;
        return true;
    }

    var v = $.trim($("#txtNomeProdottoMenu").val());
    //var myId = $(sender).attr("id");
    if (v.length > 0)
    {
        var t = "3";
        $.ajax({
            cache: false,
            type: "POST",
            url: "WS/wsGetContent.asmx/DwlDocsProdotti",
            dataType: "json",
            data: JSON2.stringify({ "nome": v, "t": t }),
            contentType: "application/json; charset=utf-8",
            success: function (data)
            {
                if (data.d.Status)
                {
                    var result = data.d.HTML;
                    if (result.indexOf("<span ") == -1)
                        setTimeout(function () { location.href = result; }, 250);
                    else
                    {
                        _okSubmit = true;
                        $(".vai_direttamente").submit();
                    }
                }
                else
                    alert(data.d.ErrMessage);
            }
        });
    }
    return false;
}