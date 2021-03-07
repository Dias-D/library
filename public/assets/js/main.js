var Dialog = window.dialog || {};

Dialog = (function () {

    function show(message, conf) {
        var conf = conf || {};

        BootstrapDialog.show({
            title: conf.title || '<i class="glyphicon glyphicon-exclamation-sign"></i> Atenção',
            message: message || "",
            type: conf.type || BootstrapDialog.TYPE_DANGER,
            size: conf.size || BootstrapDialog.SIZE_SMALL,
            closable: conf.closable || false,
            closeByBackdrop: conf.closeByBackdrop || false,
            closeByKeyboard: conf.closeByKeyboard || false,
            onhidden: conf.onhidden || function () {},
            buttons: conf.buttons || [
                {
                    label: 'Ok',
                    action: function (dialogRef) {
                        dialogRef.close();
                    }
                }
            ]
        });
    }
    ;

    function __processing(conf) {
        var conf = conf || {};

        return BootstrapDialog.show({
            title: conf.title || 'Carregando...',
            message: '<div class="loader-image"><i class="fa fa-3x fa-cog fa-spin"></i></div>',
            type: BootstrapDialog.TYPE_PRIMARY,
            size: BootstrapDialog.SIZE_SMALL,
            closable: conf.closable || false,
            closeByBackdrop: conf.closeByBackdrop || false,
            closeByKeyboard: conf.closeByKeyboard || false,
            onhidden: conf.onhidden || function () {}
        });
    }
    ;

    return {
        show: show,
        processing: __processing

    };
})();

$(function () {
    $.ajaxSetup({
        timeout: 90000
    });

    $('body').on('click', '.btn-delete', function (e) {
        e.preventDefault();

        var
                $that = $(this),
                action = $that.attr('data-url');

        BootstrapDialog.show({
            title: 'Confirmar',
            message: 'Deseja realmente excluir?',
            type: BootstrapDialog.TYPE_DANGER,
            size: BootstrapDialog.SIZE_SMALL,
            closable: false,
            closeByBackdrop: false,
            closeByKeyboard: false,
            cssClass: 'delete-dialog',
            buttons: [
                {
                    label: 'Sim',
                    action: function () {
                        window.location.href = action
                    }
                },
                {
                    label: 'Cancelar',
                    action: function (dialogRef) {
                        dialogRef.close();
                    }
                }
            ]
        });
    });

    var disableFields = function (fields) {
        fields.each(function () {
            $(this).attr('readonly', 'readyonly');
        });
    };


    //verify if has ajax running
    $('form').on('submit', function () {
        var $that = $(this),
                _submit = true,
                fields = $that.find('input, select, textarea').not('[readonly], :hidden');

        if (typeof $that.valid === "function" && !$that.valid()) {
            return false;
        }

        if (!!parseInt($.active)) {
            _submit = false;

            $(document).ajaxStop(function () {
                $that.submit();
            });
        }

        $('.loader').removeClass('hidden').parent().prop('disabled', true);
        disableFields(fields);

        return _submit;
    });

});
$(document).ready(function () {
    if (!$.fn.dataTable.isDataTable('.datatable')) {
        var lotNumber = $('#lot_number').text();
        var lotNumber2 = $('#lot_number2').text();
        var machine = $('#machine').text();

        if (lotNumber2 == '') {
            var title = 'Lote: ' + lotNumber + ' e Máquina: ' + machine;
        } else {
            var title = 'Lote: ' + lotNumber + ', Lote 2: ' + lotNumber2 + ' e Máquina: ' + machine;
        }

        $('.datatable').DataTable();
    }
});

/**
 * Format Seconds to HHMMSS
 * 
 * @returns {String}
 */
String.prototype.toHHMMSS = function () {
    var
            sec_num = parseInt(this, 10), // don't forget the second param
            hours = Math.floor(sec_num / 3600),
            minutes = Math.floor((sec_num - (hours * 3600)) / 60),
            seconds = sec_num - (hours * 3600) - (minutes * 60),
            time = "";

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    time = hours + ':' + minutes + ':' + seconds;

    return time;
};

function isValidDate(d) {
    var date = Date.parse(d);

    if (isNaN(date)) {
        return false;
    }

    return true;
}

function diffDateInSeconds(dt1, dt2)
{
    var
            date_1 = new Date(dt1.replace("T", " ")),
            date_2 = new Date(dt2.replace("T", " ")),
            diff = date_1.getTime() - date_2.getTime(),
            seconds_from_dt1_to_dt2 = diff / 1000,
            seconds_between_dates = Math.abs(seconds_from_dt1_to_dt2);

    return seconds_between_dates;
}
