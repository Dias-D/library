$(document).ready(function () {
    if (!$.fn.dataTable.isDataTable('#summary')) {
        var lotNumber = $('#lot_number').text();
        var lotNumber2 = $('#lot_number2').text();
        var machine = $('#machine').text();

        if (lotNumber2 == '') {
            var title = 'Lote: ' + lotNumber + ' e Máquina: ' + machine;
        } else {
            var title = 'Lote: ' + lotNumber + ', Lote 2: ' + lotNumber2 + ' e Máquina: ' + machine;
        }

        $('#summary').DataTable({
            paging: false,
            scrollCollapse: true,
            ordering: false,
            info: false,
            searching: false,
            scrollY: 400,
            scrollX: true,
            dom: 'Bfrtip',
            buttons: [{
                extend: 'excel',
                exportOptions: {
                    format: {
                        body: function (data, row, column, node) {
                            data = $('<p>' + data + '</p>').text();
                            return $.isNumeric(data.replace(',', '.')) ? data.replace(',', '.') : data;
                        }
                    }
                }
            },
            {
                extend: 'csv'
            }
            ],
            fixedColumns: {
                leftColumns: 1
            },
        }
        );
    }
});

$(function () {
    $('form').on('submit', function () {
        Dialog.processing({
            title: 'Buscando...'
        });
    });
});



