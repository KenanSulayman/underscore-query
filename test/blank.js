// Generated by CoffeeScript 1.10.0
(function() {
    var _, _collection, assert, create;

    assert = require('assert');

    _ = require("lodash");

    require("../lib/lodash-query")(_);

    _collection = [{
        title: "Home",
        colors: ["red", "yellow", "blue"],
        likes: 12,
        featured: true,
        content: "Dummy content about coffeescript",
        blank: null
    }, {
        title: "About",
        colors: ["red"],
        likes: 2,
        featured: true,
        content: "dummy content about javascript",
        blank: ''
    }, {
        title: "Contact",
        colors: ["red", "blue"],
        likes: 20,
        content: "Dummy content about PHP",
        blank: void 0
    }, {
        title: "Careers",
        colors: ["purple", "white"],
        likes: 10,
        content: "Dummy content about Careers"
    }, {
        title: "Sponsors",
        colors: ["green", "gold"],
        likes: 14,
        content: "Dummy content about Sponsors",
        blank: []
    }];

    create = function() {
        return _.clone(_collection);
    };

    describe("lodash Query Tests: Blanks", function() {
        it("handles null values", function() {
            var a, result;
            a = create();
            result = _.query(a, {
                blank: null
            });
            assert.equal(result.length, 1);
            return assert.equal(result[0].title, "Home");
        });
        it("handles empty values", function() {
            var a, result;
            a = create();
            result = _.query(a, {
                blank: ""
            });
            assert.equal(result.length, 1);
            return assert.equal(result[0].title, "About");
        });
        it("handles undefined values", function() {
            var a, result;
            a = create();
            result = _.query(a, {
                blank: void 0
            });
            assert.equal(result.length, 2);
            assert.equal(result[0].title, "Contact");
            return assert.equal(result[1].title, "Careers");
        });
        it("handles empty array values", function() {
            var a, result;
            a = create();
            result = _.query(a, {
                blank: []
            });
            assert.equal(result.length, 1);
            return assert.equal(result[0].title, "Sponsors");
        });
        return it("handles empty values in $cb", function() {
            var $blank, a, result;
            a = create();
            $blank = {
                $cb: function(attr) {
                    return attr === null || attr === undefined || attr === "" || (attr.length === 0);
                }
            };
            result = _.query(a, {
                blank: $blank
            });
            return assert.equal(result.length, 5);
        });
    });

}).call(this);