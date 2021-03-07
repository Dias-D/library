$(function () {

    var _form = $('form');
    var inputs = _form.find(':input');

    _form.on('keypress', ':input', function (e) {

        if (e.keyCode == 13) {
            var
                    $that = $(this),
                    thatIndex = inputs.index(this);

            //console.log($that.is(':submit'));

            if (inputs[thatIndex + 1] !== undefined) {
                inputs[thatIndex + 1].focus();
                e.preventDefault();
            }
        }

        //console.log(inputs.index(this));
    });
    
    const getRecipeData = function (recipeId) {
        return $.ajax({
            url: host + 'variable/variablevalues/get_limits_data',
            data: {'recipeId': recipeId},
            type: 'post',
            dataType: 'json'
        });
    };
    
    $('#recipe_id').on('change', function() {
        let recipe = this.value;
        
            processDialog = Dialog.processing();
            $.when(getRecipeData(recipe)).done(function (resp) {
                processDialog.close();
                var respSize = resp.data.recipeData.length;
                var vtid = '';
                for(i=0;i<respSize;i++){
                    vtid = '#vtid'.concat(resp.data.recipeData[i]['variable_tag_id']).concat('_min');
                    $(vtid).text(parseFloat(resp.data.recipeData[i]['min']).toFixed(3));
                    vtid = '#vtid'.concat(resp.data.recipeData[i]['variable_tag_id']).concat('_lsl');
                    $(vtid).text(parseFloat(resp.data.recipeData[i]['lsl']).toFixed(3));
                    vtid = '#vtid'.concat(resp.data.recipeData[i]['variable_tag_id']).concat('_lcl');
                    $(vtid).text(parseFloat(resp.data.recipeData[i]['lcl']).toFixed(3));
                    vtid = '#vtid'.concat(resp.data.recipeData[i]['variable_tag_id']).concat('_lwl');
                    $(vtid).text(parseFloat(resp.data.recipeData[i]['lwl']).toFixed(3));
                    vtid = '#vtid'.concat(resp.data.recipeData[i]['variable_tag_id']).concat('_tgt');
                    $(vtid).text(parseFloat(resp.data.recipeData[i]['tgt']).toFixed(3));
                    vtid = '#vtid'.concat(resp.data.recipeData[i]['variable_tag_id']).concat('_uwl');
                    $(vtid).text(parseFloat(resp.data.recipeData[i]['uwl']).toFixed(3));
                    vtid = '#vtid'.concat(resp.data.recipeData[i]['variable_tag_id']).concat('_ucl');
                    $(vtid).text(parseFloat(resp.data.recipeData[i]['ucl']).toFixed(3));
                    vtid = '#vtid'.concat(resp.data.recipeData[i]['variable_tag_id']).concat('_usl');
                    $(vtid).text(parseFloat(resp.data.recipeData[i]['usl']).toFixed(3));
                    vtid = '#vtid'.concat(resp.data.recipeData[i]['variable_tag_id']).concat('_max');
                    $(vtid).text(parseFloat(resp.data.recipeData[i]['max']).toFixed(3));
                }
            });
    });

})

