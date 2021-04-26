$(function () {
    $('.tabs .tab').on('click', function () {
        $('.tabs .tab.active').removeClass('active');
        $(this).addClass('active');
        // var $panel = $(this).closest('.tab-panels');

        // $panel.find('.tabs li.active').removeClass('active');
        // $(this).addClass('active');

        //figure out which panel to show
        var panelToShow = $(this).attr('rel');
        // alert(panelToShow);
        //hide current panel
        $('.panel.active').hide(0, function () {
            $(this).removeClass('active');
            $('#' + panelToShow).show(0, function () {
                $(this).addClass('active');
                // alert();
            });
        });
        //show next panel
    });

    $('.panel').accordion({
        collapsible: true
    });

    $('#create-rem').on('click', function () {
        if ($(".form#form1").hasClass('active')) {
            $('.form.active#form1').removeClass('active');
        }
        else {
            $('.form#form1').addClass('active');
        }
        //Codigo aqui para poblar select
    });

    $("#datepicker").datepicker();

    $('#createRecbtn').on('click', function () {

        //Codigo aqui para crear Recordatorio

        $('.form.active#form1').removeClass('active');
    })
    // $.getScript("functions.js", function () {

    // })

    $('#create-mat').on('click', function () {
        if ($(".form#form2").hasClass('active')) {
            $('.form.active#form2').removeClass('active');
        }
        else {
            $('.form#form2').addClass('active');
        }
    });

    $('#createMatbtn').on('click', function () {

        //Codigo aqui para crear Materia

        $('.form.active#form2').removeClass('active');
    })

    $('#delete-mat').on('click', function () {
        if ($(".form#form3").hasClass('active')) {
            $('.form.active#form3').removeClass('active');
        }
        else {
            $('.form#form3').addClass('active');
        }

        //Codigo aqui para poblar select
    });

    $('#deleteMatbtn').on('click', function () {

        //Codigo aqui para borrar Materia

        $('.form.active#form3').removeClass('active');
    })

    $('#csv').on('click', function () {
        //Codigo aqui para exportar a CSV
    });

    $('#pdf').on('click', function () {
        //Codigo aqui para exportar a PDF
    });
});