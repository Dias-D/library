<div id="modal-cell-content">
    <div class="row">
        <div class="col-md-3">
            <div class="body-mode body-mode-unit panel panel-default">
                <div id="units-list" class="panel-heading"> Unidades </div>
                <div id="list-unit" class="panel-body modal-panel-cell"></div>
            </div>
        </div>
        <div class="col-md-9">
            <div class="body-mode body-mode-equip panel panel-default">
                <div class="panel-heading">Equipamentos</div>    
                <div id="list-equip" class="panel-body">
                    <div class="pull-right">
                        <button id="bind-save" class="btn btn-secondary">Salvar vinculo</button>
                    </div>
                    <br>
                    <div class="ms-container" id="ms-callbacks">
                        <div class="ms-selectable">
                            <ul id="unit-equipments" class="ms-list sortable connectedSortable" tabindex="-1"></ul>
                        </div>
                        <div class="ms-selection">
                            <ul id="avaliable-equipments" class="ms-list sortable connectedSortable" tabindex="-1"></ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style="clear: left"></div>
    </div>
</div>