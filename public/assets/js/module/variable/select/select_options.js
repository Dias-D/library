var Attribute = (function ($, window, document) {
    var
            getHtml = function () {
                var
                        totalRow = getTotalAttributes(),
                        html = '<div class="row">';

                html += '<div class="display-table">'
                html += '<div class="display-table-cell">'
                html += '<div class="form-group">';
                html += '<div class="col-md-4">';
                html += '<label for="select_option_' + (totalRow + 1) + '">Valor</label>';
                html += '<input required  id="select_option_' + (totalRow + 1) + '" name="data[new][]" class="form-control parsley-validated" data-required="true">';
                html += '</div>';
                html += '</div>';
                html += '<span class="remAttrAlign"><a href="#" class="remAttr">Remover</a></span>';
                html += '</div>';
                html += '</div>';
                html += '<br>';
                html += '</div>';

                return html;

            },
            getTotalAttributes = function () {
                var totalOptions = $('#selection-options').find('.row').length || 0;

                return parseInt(totalOptions);
            };

    return {
        create: function () {
            return getHtml();
        },
        getTotalAttributes: function () {
            return getTotalAttributes();
        }
    };

})(jQuery, window, document);

$(function () {
    $('#add-select-options').on('click', function () {
        $(Attribute.create()).prependTo($('#selection-options'));
    });

    $('#selection-options').on('click', '.remAttr', function (evt) {
        evt.preventDefault();

        $(this).parents('.row').empty().remove();
    });

    $('form').on('submit', function () {
        var totalAttrs = Attribute.getTotalAttributes();

        if (parseInt(totalAttrs) === 0) {
            Dialog.show('Não existe opções para seleção adicionadas');
            return false;
        }

        if (parseInt(totalAttrs) === 1) {
            Dialog.show('Seleção deve conter no mínimo 2 opções');
            return false;
        }
    });
});

