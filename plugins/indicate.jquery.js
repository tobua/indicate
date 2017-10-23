(function (root, factory) {
    if (typeof exports === 'object') {
        factory(require('jquery'), require('indicate'));
    } else if (typeof define === 'function' && define.amd) {
        define(['jquery', 'indicate'], factory);
    } else {
        factory(root.jQuery, root.Indicate);
    }
}(this, function ($, Indicate) {
    $.fn.indicate = function() {
        var args = arguments;

        if (!args || !args.length) {
            args = [{ }];
        }

        return this.each(function() {
            var self   = $(this),
                plugin = self.data('indicate');

            if (!(plugin instanceof Indicate)) {
                if (typeof args[0] === 'object') {
                    var options = $.extend({}, args[0]);
                    self.data('indicate', new Indicate(self[0], options));
                }
            } else {
                if (typeof args[0] === 'string' && typeof plugin[args[0]] === 'function') {
                    plugin[args[0]].apply(plugin, Array.prototype.slice.call(args,1));

                    if (args[0] === 'destroy') {
                        self.removeData('indicate');
                    }
                }
            }
        });
    };
}));
