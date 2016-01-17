/// <reference path="/JS/jquery-1.7.1.min-vsdoc.js" />

/*  INIT
----------*/
$(function () {
    $("#divNotify").hide();
    $("#divValidationSummary").hide();
    $(".validator").hide();
    $("#loadingContainer").hide();

});


/* Log Console
---------------*/
function LogToConsole(msg) {
    try { console.info(msg); }
    catch (e) { }
}

/*   Register Form
---------------------*/
function RegisterForm(sender) {
    var count = 0;
    $("#divNotify").hide();

    // validazioni
    if (FormValidation()) {
        Register(sender);
    } else {
        $(".mf").show()
    }
}


/*   Register
----------------*/
function Register(sender) {

    var count = 0;
    showLoading(sender);

    // recupero il metodo del web service da chiamare
    var wsMethod = $("#hfWsMethod").val();
    LogToConsole("WS Method: '" + wsMethod + "'");
    // recupero i dati inseriti
    var jsonData = GetJsonData();
    for (o in jsonData) { count++; }
    LogToConsole("jsonData Length: " + count);
    // json da passare al webservice
    var mData = { "data": jsonData };
    $(".mf").hide()

    // POST AJAX
    $.ajax({
        type: "POST",
        url: "WS/wsForms.asmx/" + wsMethod,
        cache: false,
        contentType: "application/json; charset=utf-8",
        data: JSON2.stringify(mData),
        dataType: "json",
        success: function (data) {
            if (data != null) {
                LogToConsole("AJAX Result: " + data.d.Status)

                $("#divNotify").html("<span class=\"red\"> " + data.d.HTML + "</span>");
                $("#divNotify").fadeIn(800);
                if ($("#hfGA_Track").size() > 0) {
                    try {
                        gaTrackPage($("#hfGA_Track").val());
                    }
                    catch (e) {
                        LogToConsole("GA Track Failed: " + e.message);
                    }
                }
                if(data.d.Status && ($("#hfWsMethod").val() == "reqContattoLanding")) {
                    $("#form1").hide()
                    $(".blocco_form .titolo").hide()
                    $(".blocco_form .mandatory").hide()
                    $(".mf").hide()
                    $(".thx").show()
                    var axel = Math.random() + "";
                    var a = axel * 10000000000000;
                    $(".thx").append('<iframe src="http://4251577.fls.doubleclick.net/activityi;src=4251577;type=visit0;cat=arist00;ord=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');
                }
            }
            else {
                LogToConsole("AJAX Result: null");

                $(sender).fadeIn(400);
            }
            $("#loadingContainer").remove();
        },
        error: function (data) {
            alert("Web-Service Error!!");
            removeLoading(sender);
        }
    });
}


/*   Get Json Data
----------------------*/
function GetJsonData() {
    var d = {};
    $("#form1:not(.formNewsletter) input[type=text], #form1:not(.formNewsletter) input[type=password], #form1:not(.formNewsletter) input[type=checkbox], #form1:not(.formNewsletter) input[type=radio], #form1:not(.formNewsletter) input[type=hidden]").each(function () {
        var type = $(this).attr("type");
        if (type != "submit") {
            var id = $(this).attr("id");
            var value = GetValueFromInput(this);
            if (id != "") {
                if ($(this).attr("type") == 'text')
                //su IE se il campo non viene compilato salverebbe il placeholder
                    d[id] = (value == $.trim($(this).attr("placeholder")) ? "" : value);
                else
                d[id] = value;
            }
        }
    });
    $("#form1:not(.formNewsletter) select").each(function () {
        var id = $(this).attr("id");
        var value = $(this).val();
        if (id != "")
            d[id] = value;
    });

    $("#form1:not(.formNewsletter) textarea").each(function () {
        var id = $(this).attr("id");
        var value = $(this).val();
        if (id != "")
        //d[id] = value;
        //su IE se il campo non viene compilato salverebbe il placeholder
            d[id] = (value == $.trim($(this).attr("placeholder")) ? "" : value);
    });
    if ($("#hfWsMethod").val() == "reqContattoLanding"){
        if ($("select[name='day'] option:selected").val() != -1 && $("select[name='month'] option:selected").val() != -1 && $("select[name='year'] option:selected").val() != -1) {
            d["txtDataNascita"] = $("select[name='day'] option:selected").val() + '/' + $("select[name='month'] option:selected").val() + '/' + $("select[name='year'] option:selected").val();
        }
        d["txtEmail"] = $("input[name='email']").val()
        d["txtTel"] = $("input[name='phone']").val()
    }
    return d;
}



/*  Get Value From Input
---------------------------*/
function GetValueFromInput(input) {

    var value = null;
    var id = $(input).attr("id");
    var type = $(input).attr("type");

    switch (type) {

        case "text":
        case "password":
        case "hidden":
            {
                value = $.trim($(input).val());
                break;
            }

        case "checkbox":
        case "radio":
            {
                value = ($("#" + id + ":checked").size() > 0);
                break;
            }
    }
    return value;
}



/* showLoading
----------------*/
function showLoading(sender) {
    //$("#divNotify").html("<div id=\"loadingContainer\"> <img src='imgs/loading.gif' /> <span class=\"red\"> Registrazione in Corso ... </span> </div>");
    //$("#divNotify").show();
    //$(sender).fadeOut(350);

    $("#loadingContainer").show();
    $(sender).fadeOut(350);
}


function showLoadingText(sender, txt) {
    $("#divNotify").html("<div id=\"loadingContainer\"><img src='imgs/loading.gif' /><span class=\"red\">" + txt + " </span> </div>");
    $("#divNotify").show();
    $(sender).fadeOut(350);
}


/* removeLoading
-----------------*/
function removeLoading(sender) {
    $("#loadingContainer").remove();
    $(sender).fadeIn(400);
}





/*  Form Validation
------------------------*/
function FormValidation() {
    // nascondo il summary
    $("#divValidationSummary").hide();
    var showFancy = false; // ($("#hfNoFancy").size() <= 0);
    var singleField;
    var validationResult = true; 

    // per ogni campo obbligatorio ...
    $("#form1:not(.formNewsletter) .required").each(function () {

        // valido il singolo campo
        try {
            singleField = ValidateSingleField(this);
        }
        catch (e) {
            LogToConsole("Validation '" + $(this).attr("id") + "' Exception: " + e);
            singleField = false;
        }
        validationResult = validationResult && singleField;
    });


    // validazione Consenso Privacy
    // var consenso = $("#chSiConsenso").is(":checked");
    consenso = true;

    validationResult = validationResult && consenso;

    if (!consenso)
        $("#chSiConsenso").addClass("red");

    // se non ha superato tutte le validazioni, mostro il summary
    if (!validationResult) {

        $("#divValidationSummary").fadeIn(800);

        if (showFancy) {
            var content = "<div class='notificationFancy'>" + $("#divValidationSummary").html() + "</div>";
            $.fancybox({ 'content': content });
        }

    }
    if ($("#hfWsMethod").val() == "reqContattoLanding") {
        //data di nascita
        if ($("select[name='day'] option:selected").val() != -1 && $("select[name='month'] option:selected").val() != -1 && $("select[name='year'] option:selected").val() != -1) {
            var year = $("select[name='year'] option:selected").val()
            var month = $("select[name='month'] option:selected").val()
            var day = $("select[name='day'] option:selected").val()
            var myDate = new Date(year, parseInt(month) - 1, day);
            if ((myDate.getMonth() + 1 != parseInt(month)) || (myDate.getDate() != parseInt(day)) || (myDate.getFullYear() != parseInt(year))) {
                alert("Invalid Date.");
                validationResult = false;
            } else {
                //validationResult = true;
            }
        } else {
            if (($("select[name='day'] option:selected").val() == -1 || $("select[name='month'] option:selected").val() == -1 || $("select[name='year'] option:selected").val() == -1) &&
             $("select[name='day'] option:selected").val() != -1 || $("select[name='month'] option:selected").val() != -1 || $("select[name='year'] option:selected").val() != -1) {
                alert("Invalid Date.");
                validationResult = false;
            } else {
                //nessun campo data di nascita selezionato
                //validationResult = true;
            }

        }

        if (($("input[name='email']").val() == "") && ($("input[name='phone']").val() == "")) {
            alert("Missing phone or email")
            validationResult = false;
        }
        else {
            if ($("input[name='phone']").val() != "") {
                var pattern = new RegExp(/^([0-9\+]{1})([0-9])*$/);
                validationResult = validationResult & pattern.test($("input[name='phone']").val())
            }

            if ($("input[name='email']").val() != "") {
                //var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                validationResult = validationResult & pattern.test($("input[name='email']").val())
            }

        }
        //validationResult = validationResult && ($("input[@name='you_are']:checked").val() != "")
	validationResult = validationResult && ($("input[@name='you_are']:checked").val() != undefined)


    }
    LogToConsole("Validation Result: " + validationResult);

    return validationResult;
}

function FormValidationNewsletter() {
    // nascondo il summary
    $("#divValidationSummary").hide();
    var showFancy = ($("#hfNoFancy").size() <= 0);
    var singleField;
    var validationResult = true;

    // per ogni campo obbligatorio ...
    $(".formNewsletter .required").each(function () {

        // valido il singolo campo
        try {
            singleField = ValidateSingleField(this);
        }
        catch (e) {
            LogToConsole("Validation '" + $(this).attr("id") + "' Exception: " + e);
            singleField = false;
        }
        validationResult = validationResult && singleField;
    });

    // se non ha superato tutte le validazioni, mostro il summary
    if (!validationResult) {
        $("#divValidationSummary").fadeIn(800);
        if (showFancy) {
            var content = "<div class='notificationFancy'>" + $("#divValidationSummary").html() + "</div>";
            $.fancybox({ 'content': content });
        }
    }

    LogToConsole("Validation Result: " + validationResult);
    return validationResult;
}


/*  Validate Single Field
----------------------------------*/
function ValidateSingleField(field) {
    var isValid = false;

    isValid = ValidateText(field);
    // prendo l'attributo 'type' del campo
    var type = $(field).attr("type");

    if (type != null && type.length > 0 && type != 'textarea') {
        // se il 'type' esiste, è un input, valido in base al tipo
        switch (type) {
            case "text":

            case "password":

            case "file":
                {
                    // <input type="text" ...
                    var id = $(field).attr("id");

                    if (id == "txtEmail" || id == "Email") {
                        isValid = ValidateTextEmail(field);
                    } else if (id == "txtTelefono" || id == "Telefono") {

                        isValid = ValidateTextPhoneNumber(field);

                    } else if (id == "txtCap" || id == "CAP") {

                        isValid = ValidateTextCAP(field);

                    } else {
                        isValid = ValidateText(field);
                    }

                    break;
                }
            case "radio":
                {
                    isValid = ValidateRadio(field);     // <input type="radio" ... <input type="radio" ...
                    break;
                }
            case "checkbox":
                {
                    isValid = ValidateCheckbox(field);  // <input type="checkbox" ...
                    break;
                }
            case "select-one":
                {
                    isValid = ValidateSelect(field);    // <select ...
                    break;
                }
        }
    }
    else {
        if ($(field).is("textarea")) {
            isValid = ValidateText(field);
        }
        else if ($(field).is("select")) {
            isValid = ValidateSelect(field);
        }
    }

    LogToConsole("FIELD: '" + $(field).attr("id") + "' VALID: " + isValid);
    return isValid;
}


/*  Validate Text
-----------------------*/
function ValidateText(o) {
    var isValid = true;
    var id = $(o).attr("id");
    var idVal = "#" + id + "Req";

    //var v = $.trim($(o).val());
    var v = $.trim($(o).val()) == $.trim($(o).attr("placeholder")) ? "":$.trim($(o).val());

    $(idVal).hide();
    if (v.length <= 0) {
        isValid = false;
        $(idVal).show();
    }
    return isValid;
}



/*
---------------------*/
function ValidateTextEmail(o) {
    var isValid = true;
    isValid = ValidateText(o);

    if (isValid) {
        var id = $(o).attr("id");
        var idVal = "#" + id + "Req";
        var email = $(o).val();
        isValid = ValidateEmail(email);

        if (!isValid)
            $(idVal).show();
    }
    return isValid;
}



/*
---------------------*/
function ValidateTextPhoneNumber(o) {
    var isValid = true;
    isValid = ValidateText(o);

    if (isValid) {
        var id = $(o).attr("id");
        var idVal = "#" + id + "Req";
        var phone = $(o).val();

        isValid = ValidatePhone(phone);

        if (!isValid)
            $(idVal).show();
    }
    return isValid;
}




/*
---------------------*/
function ValidateTextCAP(o) {
    var isValid = true;
    isValid = ValidateText(o);

    if (isValid) {
        var id = $(o).attr("id");
        var idVal = "#" + id + "Req";
        var cap = $(o).val();

        isValid = ValidateCAP(cap);

        if (!isValid)
            $(idVal).show();
    }
    return isValid;
}





/*  Validate Checkbox
---------------------------*/
function ValidateCheckbox(o) {
    var isValid = true;
    var id = $(o).attr("id");
    var idVal = "#" + id + "Req";
    var v = $("#" + id + ":checked").size();

    $(idVal).hide();
    if (v <= 0) {
        isValid = false;
        $(idVal).show();
    }
    return isValid;
}


function ValidateSelect(o) {
    var isValid = true;
    var id = $(o).attr("id");
    var idVal = "#" + id + "Req";
    $(idVal).hide();

    var val = $(o).val();
    var intVal = parseInt(val);
    if (!isNaN(intVal)) {
        if (intVal < 0) {
            isValid = false;
            $(idVal).show();
        }
    }
    else {
        if (intVal == null || intVal == "") {
            isValid = false;
            $(idVal).show();
        }
    }
    return isValid;
}


/* Validate Radio
-------------------*/
function ValidateRadio(sender) {
    // field
    var ok = false;
    var name = $(sender).attr("name");
    var id = $(sender).attr("id");
    var idVal = "#" + id + "Req";

    $(idVal).hide();

    ok = ($("input[type='radio'][name='" + name + "']").filter(":checked").size() > 0);

    if (!ok)
        $(idVal).show();

    return ok;
}

/*  Reset Form
-------------------*/
function resetForm() {
    $("#form1 input").each(function () {
        var type = $(this).attr("type");
        switch (type) {
            case "text":
            case "password":
            case "file":
                {
                    $(this).val("");
                    break;
                }
            case "radio":
            case "checkbox":
                {
                    $(this).removeAttr("checked");
                    break;
                }
            case "select-one":
                {
                    $(this).val(-1);
                    break;
                }
        }
    });
}




/* Validate Email
---------------------*/
function ValidateEmail(email) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return reg.test(email);
}



/* Validate Phone
---------------------*/
function ValidatePhone(phone) {
    var pattern = new RegExp(/^([0-9\+]{1})([0-9])*$/);
    return pattern.test(phone);
}



/* Validate CAP
---------------------*/
function ValidateCAP(value) {
    //var pattern = new RegExp(/^\w{5}*$/);
    var pattern = new RegExp(/^\d{5}$/);
    return pattern.test(value);
}

$("#rbEmail").change(function () {
    $("#txtEmail").prop('disabled', false);
    $("#txtTel").val("");
    $("#txtTel").prop('disabled', true);
})

$("#rbPhome").change(function () {
    $("#txtTel").prop('disabled', false);
    $("#txtEmail").val("");
    $("#txtEmail").prop('disabled', true);
})