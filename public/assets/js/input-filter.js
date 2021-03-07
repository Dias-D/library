;
(function ($, window, document, undefined) {

    // window and document are passed through as local
    // variables rather than as globals, because this (slightly)
    // quickens the resolution process and can be more
    // efficiently minified (especially when both are
    // regularly referenced in our plugin).

    // Create the defaults once
    var pluginName = "inputFilter";

    // The actual plugin constructor
    function Plugin(element) {
        this.element = element;

        // jQuery has an extend method that merges the
        // contents of two or more objects, storing the
        // result in the first object. The first object
        // is generally empty because we don't want to alter

        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        init: function () {
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.options

            this.table = $(this.element).data('table') || undefined;
            this.filterName = $(this.element).data('filter-name') || undefined;
            this.createCheckBoxOptions(this.element);

            var _self = this;
            $(this.element).on('click', 'a', function (evt) {
                evt.preventDefault();
                evt.stopPropagation();

                var $that = $(this),
                        $checkbox = $that.find('input[type="checkbox"]');


                if (!$checkbox.is(':checked')) {
                    $checkbox.prop('checked', true).trigger('change');
                    return
                }

                $checkbox.prop('checked', false).trigger('change');

            });

            $(this.element).on('change', 'input[type="checkbox"]', function (evt) {
                evt.stopPropagation();
                _self.filterTable();
            }).on('click', 'input[type="checkbox"]', function (evt) {
                evt.stopPropagation();
            });


        },

        createCheckBoxOptions: function () {
            var
                    html = "",
                    createdOptions = [];

            if (!this.table && !this.filterName) {
                console.log('data-table or data-filter-name not defined');
                return;
            }

            html = '<ul class="dropdown-menu">';
            $(this.table).find('td[data-filter="' + this.filterName + '"]').filter(function () {
                var $that = $(this),
                        text = $that.text();

                if (createdOptions.indexOf($that.text()) != -1) {
                    return
                }

                html += '<li>';
                html += '<a href="#" class="small" data-value="' + text + '" tabindex="-1">';
                html += '<input type="checkbox" value="' + text + '">&nbsp;' + text;
                html += '</a>';
                html += '</li>';

                createdOptions.push(text);

            });
            html += '</ul>';

            $(this.element).append(html);
        },
        filterTable: function () {
            var $checkBoxWraper = $(this.element),
                    checkedList = $checkBoxWraper.find('input[type="checkbox"]:checked'),
                    filterName = this.filterName;


            // We check if one or more checkboxes are selected
            // If one or more is selected, we perform filtering
            if (checkedList.length > 0) {
                // Get values all checked boxes
                var vals = checkedList.map(function () {
                    return this.value;
                }).get();

                // Here we do two things to table rows
                // 1. We hide all
                // 2. Then we filter, show those whose values matches checkbox value

                $(this.table).find('tbody > tr')
                        .hide()    // 1
                        .filter(function () {    // 2
                            return vals.indexOf($(this).find('td[data-filter="' + filterName + '"]').text()) > -1;
                        }).show();
            } else {
                // Show all
                $(this.table).find('tr').show();
            }
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function () {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                        new Plugin(this));
            }
        });
    };

})(jQuery, window, document);
