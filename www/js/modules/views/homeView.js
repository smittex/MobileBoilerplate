define(['marionette','templates/sel-ass'], function(Marionette, myViewTemplate) {
    var MyItemView = Marionette.ItemView.extend({
        template: myViewTemplate
    });

    return MyItemView;
});