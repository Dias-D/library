$(document).ready(function () {
    if (!$.fn.dataTable.isDataTable('#log-sheet')) {

        $('#log-sheet').DataTable(
                {
                    dom: 'Bfrtip',
                    buttons: ['excel']
                });
    }
});