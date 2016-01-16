/// <reference path="/JS/jquery-1.7.1.min-vsdoc.js" />

var _searchingCat = false;
$(function ()
{
    $("#txtComune").focusin(function () { $(this).val(""); });

    $("#txtComune").blur(function ()
    {
        var currTxt = $(this).val();
        if (currTxt == "")
            $(this).removeAttr("rel");
    });

    $("#txtComune").autocomplete({
        source: function (request, response)
        {
            $.ajax({
                cache: true,
                type: "POST",
                url: "WS/wsMTSGroup.asmx/AutoCompleteComune",
                dataType: "json",
                data: JSON2.stringify({ "term": request.term }),
                contentType: "application/json; charset=utf-8",
                success: function (data)
                {
                    response($.map(data.d, function (item)
                    {
                        return { label: (item.CO_Desc + ' (' + item.CO_CAP + ')'), value: (item.CO_Desc + ' (' + item.CO_CAP + ')'), istat: item.CO_ISTAT, cap: item.CO_CAP };
                    }));
                }
            });
        },
        minLength: 3,
        select: function (event, ui)
        {
            $("#txtComune").attr("rel", ui.item.istat + "," + ui.item.cap);
        }
    });

    $("#SearchCAT").click(function ()
    {
        searchCAT(this);
        return false;
    });
});




function searchCAT(sender)
{
    if (_searchingCat)
        return;

    $(".red").removeClass("red");
    var splitted;
    var istat = null;
    var cap = null;
    var fa = $("#ddlFamiglie").val();
    var rel = $("#txtComune").attr("rel");
    if (rel != null && rel != "")
    {
        splitted = rel.split(",");
        istat = splitted[0];
        cap = splitted[1];
    }

    if (fa == -1)
        $("#ddlFamiglie").next().addClass("red");

    if (cap == null)
        $("#txtComune").addClass("red");

    if ($("#frmSearchCAT .red").size() == 0)
    {
        _searchingCat = true;

        $(sender).fadeOut(350, function () { $(sender).after("<img id='imgLoading' src='imgs/loading.gif' />"); });
        $.ajax({
            cache: false,
            type: "POST",
            url: "WS/wsMTSGroup.asmx/SearchCAT",
            dataType: "json",
            data: JSON2.stringify({ "fa": fa, "istat": istat, "cap": cap }),
            contentType: "application/json; charset=utf-8",
            success: function (data)
            {
                $("#imgLoading").remove();
                $(sender).fadeIn(350);

                if (data.d.Status)
                    $("#ElencoCentriAssistenza").html(data.d.HTML);
                else
                    $("#ElencoCentriAssistenza").html(data.d.ErrMessage);

                $("#ElencoCentriAssistenza").show();
                _searchingCat = false;
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                $("#imgLoading").remove();
                $(sender).fadeIn(350);

                // errore
                var msg = textStatus;
                if (errorThrown != null && errorThrown != "")
                    msg = textStatus + " (" + errorThrown + ")";

                alert("Failed to Complete the Search due to this Reason:\r\n" + msg);
                _searchingCat = false;
            }
        });
    }
}
