$(function () {
    $('.tabs .tab').on('click', function () {
        $('.tabs .tab.active').removeClass('active');
        $(this).addClass('active');

        //figure out which panel to show
        var panelToShow = $(this).attr('rel');

        //hide current panel
        $('.panel.active').hide(0, function () {
            $(this).removeClass('active');
            $('#' + panelToShow).show(0, function () {
                $(this).addClass('active');
            });
        });
    });

    //Codigo para crear Accordion de JQueryUI
    $('.panel').accordion({
        collapsible: true,
        active: false
    });

    //Codigo para la creacion de un datepicker de JQueryUI
    $("#datepicker").datepicker();

    //Codigo para extender input de Crear Recordatorio
    $('#create-rem').on('click', function () {
        if ($(".form#form1").hasClass('active')) {
            $('.form.active#form1').removeClass('active');
        }
        else {
            $('.form#form1').addClass('active');
        }
        //Codigo aqui para poblar select
    });

    //Funcionalidad de Boton Crear Recordatorio
    $('#createRecbtn').on('click', function () {

        //Codigo aqui para crear Recordatorio

        $('.form.active#form1').removeClass('active');
    })

    //Codigo para extender input de Crear Materia
    $('#create-mat').on('click', function () {
        if ($(".form#form2").hasClass('active')) {
            $('.form.active#form2').removeClass('active');
        }
        else {
            $('.form#form2').addClass('active');
        }
    });

    //Funcionalidad de Boton Crear Materia
    $('#createMatbtn').on('click', function () {

        //Codigo aqui para crear Materia

        $('.form.active#form2').removeClass('active');
    })

    //Codigo para extender input de Eliminar Materia
    $('#delete-mat').on('click', function () {
        if ($(".form#form3").hasClass('active')) {
            $('.form.active#form3').removeClass('active');
        }
        else {
            $('.form#form3').addClass('active');
        }

        //Codigo aqui para poblar select
    });

    //Funcionalidad de Boton Eliminar Materia
    $('#deleteMatbtn').on('click', function () {

        //Codigo aqui para borrar Materia

        $('.form.active#form3').removeClass('active');
    })

    //Codigo para exportar a CSV
    $('#csv').on('click', function () {

    });

    //Codigo para exportar a PDF
    $('#pdf').on('click', function () {

    });

    //Codigo para poblar reminders
    $.getScript("functions.js", function () {
        // var arr = ["author: Manuel, age: 22", "author: Raul, age: 21"];

        // for (let rem = 0; rem < arr.length; rem++) {
        //     console.log(arr[rem])

        // }

    });

    //Codigo para eliminar un recordatorio del UI
    $('.panel').on('accordionactivate', function (event, ui) {
        var id = "#delrem" + ui.newPanel.attr('id');
        console.log(id);
        $(id).on('click', function () {
            var parent = $(this).closest('div');
            var head = parent.prev('h3');
            parent.add(head).fadeOut('slow', function () { $(this).remove(); });
        });
    });
});