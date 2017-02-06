// Generated by CoffeeScript 1.10.0
(function() {
    var _, assert, collection, create,
        extend = function(child, parent) {
            for (var key in parent) {
                if (hasProp.call(parent, key)) child[key] = parent[key];
            }

            function ctor() {
                this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        },
        hasProp = {}.hasOwnProperty;

    assert = require('assert');

    _ = require("lodash");

    require("../lib/lodash-query")(_);

    collection = [{
        title: "Home",
        colors: ["red", "yellow", "blue"],
        likes: 12,
        featured: true,
        content: "Dummy content about coffeescript"
    }, {
        title: "About",
        colors: ["red"],
        likes: 2,
        featured: true,
        content: "dummy content about javascript"
    }, {
        title: "Contact",
        colors: ["red", "blue"],
        likes: 20,
        content: "Dummy content about PHP"
    }];

    create = function() {
        return _.clone(collection);
    };

    describe("lodash Query Tests", function() {
        it("Equals query", function() {
            var a, result;
            a = create();
            result = _.query(a, {
                title: "Home"
            });
            assert.equal(result.length, 1);
            assert.equal(result[0].title, "Home");
            result = _.query(a, {
                colors: "blue"
            });
            assert.equal(result.length, 2);
            result = _.query(a, {
                colors: ["red", "blue"]
            });
            return assert.equal(result.length, 1);
        });
        it("Simple equals query (no results)", function() {
            var a, result;
            a = create();
            result = _.query(a, {
                title: "Homes"
            });
            return assert.equal(result.length, 0);
        });
        it("Simple equals query with explicit $equal", function() {
            var a, result;
            a = create();
            result = _.query(a, {
                title: {
                    $equal: "About"
                }
            });
            assert.equal(result.length, 1);
            return assert.equal(result[0].title, "About");
        });
        it("$contains operator", function() {
            var a, result;
            a = create();
            result = _.query(a, {
                colors: {
                    $contains: "blue"
                }
            });
            return assert.equal(result.length, 2);
        });
        it("$ne operator", function() {
            var a, result;
            a = create();
            result = _.query(a, {
                title: {
                    $ne: "Home"
                }
            });
            return assert.equal(result.length, 2);
        });
        it("$lt operator", function() {
            var a, result;
            a = create();
            result = _.query(a, {
                likes: {
                    $lt: 12
                }
            });
            assert.equal(result.length, 1);
            return assert.equal(result[0].title, "About");
        });
        it("$lte operator", function() {
            var a, result;
            a = create();
            result = _.query(a, {
                likes: {
                    $lte: 12
                }
            });
            return assert.equal(result.length, 2);
        });
        it("$gt operator", function() {
            var a, result;
            a = create();
            result = _.query(a, {
                likes: {
                    $gt: 12
                }
            });
            assert.equal(result.length, 1);
            return assert.equal(result[0].title, "Contact");
        });
        it("$gte operator", function() {
            var a, result;
            a = create();
            result = _.query(a, {
                likes: {
                    $gte: 12
                }
            });
            return assert.equal(result.length, 2);
        });
        it("$between operator", function() {
            var a, result;
            a = create();
            result = _.query(a, {
                likes: {
                    $between: [1, 5]
                }
            });
            assert.equal(result.length, 1);
            return assert.equal(result[0].title, "About");
        });
        it("$mod operator", function() {
            var a, result;
            a = create();
            result = _.query(a, {
                likes: {
                    $mod: [3, 0]
                }
            });
            assert.equal(result.length, 1);
            return assert.equal(result[0].title, "Home");
        });
        it("$in operator", function() {
            var a, result;
            a = create();
            result = _.query(a, {
                title: {
                    $in: ["Home", "About"]
                }
            });
            return assert.equal(result.length, 2);
        });
        it("$in operator with wrong query value", function() {
            var a;
            a = create();
            return assert.throws(function() {
                return _.query(a, {
                    title: {
                        $in: "Home"
                    }
                });
            });
        });
        it("$nin operator", function() {
            var a, result;
            a = create();
            result = _.query(a, {
                title: {
                    $nin: ["Home", "About"]
                }
            });
            assert.equal(result.length, 1);
            return assert.equal(result[0].title, "Contact");
        });
        it("$all operator", function() {
            var a, result;
            a = create();
            result = _.query(a, {
                colors: {
                    $all: ["red", "blue"]
                }
            });
            return assert.equal(result.length, 2);
        });
        it("$all operator (wrong values)", function() {
            var a, result;
            a = create();
            result = _.query(a, {
                title: {
                    $all: ["red", "blue"]
                }
            });
            assert.equal(result.length, 0);
            return assert.throws(function() {
                return _.query(a, {
                    colors: {
                        $all: "red"
                    }
                });
            });
        });
        it("$any operator", function() {
            var a, result;
            a = create();
            result = _.query(a, {
                colors: {
                    $any: ["red", "blue"]
                }
            });
            assert.equal(result.length, 3);
            result = _.query(a, {
                colors: {
                    $any: ["yellow", "blue"]
                }
            });
            return assert.equal(result.length, 2);
        });
        it("$size operator", function() {
            var a, result;
            a = create();
            result = _.query(a, {
                colors: {
                    $size: 3
                }
            });
            assert.equal(result.length, 1);
            return assert.equal(result[0].title, "Home");
        });
        it("$exists operator", function() {
            var a, result;
            a = create();
            result = _.query(a, {
                featured: {
                    $exists: true
                }
            });
            return assert.equal(result.length, 2);
        });
        it("$has operator", function() {
            var a, result;
            a = create();
            result = _.query(a, {
                featured: {
                    $exists: false
                }
            });
            assert.equal(result.length, 1);
            return assert.equal(result[0].title, "Contact");
        });
        it("$like operator", function() {
            var a, result;
            a = create();
            result = _.query(a, {
                content: {
                    $like: "javascript"
                }
            });
            assert.equal(result.length, 1);
            return assert.equal(result[0].title, "About");
        });
        it("$like operator 2", function() {
            var a, result;
            a = create();
            result = _.query(a, {
                content: {
                    $like: "content"
                }
            });
            return assert.equal(result.length, 3);
        });
        it("$likeI operator", function() {
            var a, result;
            a = create();
            result = _.query(a, {
                content: {
                    $likeI: "dummy"
                }
            });
            assert.equal(result.length, 3);
            result = _.query(a, {
                content: {
                    $like: "dummy"
                }
            });
            return assert.equal(result.length, 1);
        });
        it("$startsWith operator", function() {
            var a, result;
            a = create();
            result = _.query(a, {
                title: {
                    $startsWith: "Ho"
                }
            });
            assert.equal(result.length, 1);
            return assert.equal(result[0].title, "Home");
        });
        it("$endsWith operator", function() {
            var a, result;
            a = create();
            result = _.query(a, {
                title: {
                    $endsWith: "me"
                }
            });
            assert.equal(result.length, 1);
            return assert.equal(result[0].title, "Home");
        });
        it("$regex", function() {
            var a, result;
            a = create();
            result = _.query(a, {
                content: {
                    $regex: /javascript/gi
                }
            });
            assert.equal(result.length, 1);
            return assert.equal(result[0].title, "About");
        });
        it("$regex2", function() {
            var a, result;
            a = create();
            result = _.query(a, {
                content: {
                    $regex: /dummy/
                }
            });
            return assert.equal(result.length, 1);
        });
        it("$regex3", function() {
            var a, result;
            a = create();
            result = _.query(a, {
                content: {
                    $regex: /dummy/i
                }
            });
            return assert.equal(result.length, 3);
        });
        it("$regex4", function() {
            var a, result;
            a = create();
            result = _.query(a, {
                content: /javascript/i
            });
            return assert.equal(result.length, 1);
        });
        it("$cb - callback", function() {
            var a, fn, result;
            a = create();
            fn = function(attr) {
                return attr.charAt(0).toLowerCase() === "c";
            };
            result = _.query(a, {
                title: {
                    $cb: fn
                }
            });
            assert.equal(result.length, 1);
            return assert.equal(result[0].title, "Contact");
        });
        it("$cb - callback - checking 'this' is the model", function() {
            var a, result;
            a = create();
            result = _.query(a, {
                title: {
                    $cb: function(attr) {
                        return this.title === "Home";
                    }
                }
            });
            assert.equal(result.length, 1);
            return assert.equal(result[0].title, "Home");
        });
        it("$and operator", function() {
            var a, result;
            a = create();
            result = _.query(a, {
                likes: {
                    $gt: 5
                },
                colors: {
                    $contains: "yellow"
                }
            });
            assert.equal(result.length, 1);
            return assert.equal(result[0].title, "Home");
        });
        it("$and operator (explicit)", function() {
            var a, result;
            a = create();
            result = _.query(a, {
                $and: {
                    likes: {
                        $gt: 5
                    },
                    colors: {
                        $contains: "yellow"
                    }
                }
            });
            assert.equal(result.length, 1);
            return assert.equal(result[0].title, "Home");
        });
        it("$or operator", function() {
            var a, result;
            a = create();
            result = _.query(a, {
                $or: {
                    likes: {
                        $gt: 5
                    },
                    colors: {
                        $contains: "yellow"
                    }
                }
            });
            return assert.equal(result.length, 2);
        });
        it("$or2 operator", function() {
            var a, result;
            a = create();
            result = _.query(a, {
                $or: {
                    likes: {
                        $gt: 5
                    },
                    featured: true
                }
            });
            return assert.equal(result.length, 3);
        });
        it("$nor operator", function() {
            var a, result;
            a = create();
            result = _.query(a, {
                $nor: {
                    likes: {
                        $gt: 5
                    },
                    colors: {
                        $contains: "yellow"
                    }
                }
            });
            assert.equal(result.length, 1);
            return assert.equal(result[0].title, "About");
        });
        it("Compound Queries", function() {
            var a, result;
            a = create();
            result = _.query(a, {
                $and: {
                    likes: {
                        $gt: 5
                    }
                },
                $or: {
                    content: {
                        $like: "PHP"
                    },
                    colors: {
                        $contains: "yellow"
                    }
                }
            });
            assert.equal(result.length, 2);
            result = _.query(a, {
                $and: {
                    likes: {
                        $lt: 15
                    }
                },
                $or: {
                    content: {
                        $like: "Dummy"
                    },
                    featured: {
                        $exists: true
                    }
                },
                $not: {
                    colors: {
                        $contains: "yellow"
                    }
                }
            });
            assert.equal(result.length, 1);
            return assert.equal(result[0].title, "About");
        });
        it("$elemMatch", function() {
            var a, b, result, text_search;
            a = [{
                title: "Home",
                comments: [{
                    text: "I like this post"
                }, {
                    text: "I love this post"
                }, {
                    text: "I hate this post"
                }]
            }, {
                title: "About",
                comments: [{
                    text: "I like this page"
                }, {
                    text: "I love this page"
                }, {
                    text: "I really like this page"
                }]
            }];
            b = [{
                foo: [{
                    shape: "square",
                    color: "purple",
                    thick: false
                }, {
                    shape: "circle",
                    color: "red",
                    thick: true
                }]
            }, {
                foo: [{
                    shape: "square",
                    color: "red",
                    thick: true
                }, {
                    shape: "circle",
                    color: "purple",
                    thick: false
                }]
            }];
            text_search = {
                $likeI: "love"
            };
            result = _.query(a, {
                $or: {
                    comments: {
                        $elemMatch: {
                            text: text_search
                        }
                    },
                    title: text_search
                }
            });
            assert.equal(result.length, 2);
            result = _.query(a, {
                $or: {
                    comments: {
                        $elemMatch: {
                            text: /post/
                        }
                    }
                }
            });
            assert.equal(result.length, 1);
            result = _.query(a, {
                $or: {
                    comments: {
                        $elemMatch: {
                            text: /post/
                        }
                    },
                    title: /about/i
                }
            });
            assert.equal(result.length, 2);
            result = _.query(a, {
                $or: {
                    comments: {
                        $elemMatch: {
                            text: /really/
                        }
                    }
                }
            });
            assert.equal(result.length, 1);
            result = _.query(b, {
                foo: {
                    $elemMatch: {
                        shape: "square",
                        color: "purple"
                    }
                }
            });
            assert.equal(result.length, 1);
            assert.equal(result[0].foo[0].shape, "square");
            assert.equal(result[0].foo[0].color, "purple");
            return assert.equal(result[0].foo[0].thick, false);
        });
        it("$any and $all", function() {
            var a, b, c, d, e, result;
            a = {
                name: "test",
                tags1: ["red", "yellow"],
                tags2: ["orange", "green", "red", "blue"]
            };
            b = {
                name: "test1",
                tags1: ["purple", "blue"],
                tags2: ["orange", "red", "blue"]
            };
            c = {
                name: "test2",
                tags1: ["black", "yellow"],
                tags2: ["green", "orange", "blue"]
            };
            d = {
                name: "test3",
                tags1: ["red", "yellow", "blue"],
                tags2: ["green"]
            };
            e = [a, b, c, d];
            result = _.query(e, {
                tags1: {
                    $any: ["red", "purple"]
                },
                tags2: {
                    $all: ["orange", "green"]
                }
            });
            assert.equal(result.length, 1);
            return assert.equal(result[0].name, "test");
        });
        it("$elemMatch - compound queries", function() {
            var a, result;
            a = [{
                title: "Home",
                comments: [{
                    text: "I like this post"
                }, {
                    text: "I love this post"
                }, {
                    text: "I hate this post"
                }]
            }, {
                title: "About",
                comments: [{
                    text: "I like this page"
                }, {
                    text: "I love this page"
                }, {
                    text: "I really like this page"
                }]
            }];
            result = _.query(a, {
                comments: {
                    $elemMatch: {
                        $not: {
                            text: /page/
                        }
                    }
                }
            });
            return assert.equal(result.length, 1);
        });
        it("Explicit $and combined with matching $or must return the correct number of items", function() {
            var Col, result;
            Col = [{
                equ: 'ok',
                same: 'ok'
            }, {
                equ: 'ok',
                same: 'ok'
            }];
            result = _.query(Col, {
                $and: {
                    equ: 'ok',
                    $or: {
                        same: 'ok'
                    }
                }
            });
            return assert.equal(result.length, 2);
        });
        it("Implicit $and consisting of non-matching subquery and $or must return empty list", function() {
            var Col, result;
            Col = [{
                equ: 'ok',
                same: 'ok'
            }, {
                equ: 'ok',
                same: 'ok'
            }];
            result = _.query(Col, {
                equ: 'bogus',
                $or: {
                    same: 'ok'
                }
            });
            return assert.equal(result.length, 0);
        });
        it("Testing nested compound operators", function() {
            var a, result;
            a = create();
            result = _.query(a, {
                $and: {
                    colors: {
                        $contains: "blue"
                    },
                    $or: {
                        featured: true,
                        likes: 12
                    }
                },
                $or: [{
                    content: {
                        $like: "dummy"
                    }
                }, {
                    content: {
                        $like: "Dummy"
                    }
                }]
            });
            assert.equal(result.length, 1);
            result = _.query(a, {
                $and: {
                    colors: {
                        $contains: "blue"
                    },
                    $or: {
                        featured: true,
                        likes: 20
                    }
                },
                $or: [{
                    content: {
                        $like: "dummy"
                    }
                }, {
                    content: {
                        $like: "Dummy"
                    }
                }]
            });
            return assert.equal(result.length, 2);
        });
        it("works with queries supplied as arrays", function() {
            var a, result;
            a = create();
            result = _.query(a, {
                $or: [{
                    title: "Home"
                }, {
                    title: "About"
                }]
            });
            assert.equal(result.length, 2);
            assert.equal(result[0].title, "Home");
            return assert.equal(result[1].title, "About");
        });
        it("works with lodash chain", function() {
            var a, q, result;
            a = create();
            q = {
                $or: [{
                    title: "Home"
                }, {
                    title: "About"
                }]
            };
            result = _.chain(a).query(q).map(item => item.title).value();
            assert.equal(result.length, 2);
            assert.equal(result[0], "Home");
            return assert.equal(result[1], "About");
        });
        it("works with a getter property", function() {
            var Backbone, a, result;
            Backbone = require("backbone");
            a = new Backbone.Collection([{
                id: 1,
                title: "test"
            }, {
                id: 2,
                title: "about"
            }]);
            result = _.query(a.models, {
                title: "about"
            }, "get");
            assert.equal(result.length, 1);
            return assert.equal(result[0].get("title"), "about");
        });
        it("can be mixed into backbone collections", function() {
            var Backbone, Collection, a, result, result2, result3;
            Backbone = require("backbone");
            Collection = (function(superClass) {
                extend(Collection, superClass);

                function Collection() {
                    return Collection.__super__.constructor.apply(this, arguments);
                }

                Collection.prototype.query = function(params) {
                    return _.query(this.models, params, "get");
                };

                Collection.prototype.whereBy = function(params) {
                    return new this.constructor(this.query(params));
                };

                Collection.prototype.buildQuery = function() {
                    return _.query.build(this.models, "get");
                };

                return Collection;

            })(Backbone.Collection);
            a = new Collection([{
                id: 1,
                title: "test"
            }, {
                id: 2,
                title: "about"
            }]);
            result = a.query({
                title: "about"
            });
            assert.equal(result.length, 1);
            assert.equal(result[0].get("title"), "about");
            result2 = a.whereBy({
                title: "about"
            });
            assert.equal(result2.length, 1);
            assert.equal(result2.at(0).get("title"), "about");
            assert.equal(result2.pluck("title")[0], "about");
            result3 = a.buildQuery().not({
                title: "test"
            }).run();
            assert.equal(result3.length, 1);
            return assert.equal(result3[0].get("title"), "about");
        });
        it("can be used for live collections", function() {
            var Backbone, Collection, live, parent;
            Backbone = require("backbone");
            Collection = (function(superClass) {
                extend(Collection, superClass);

                function Collection() {
                    return Collection.__super__.constructor.apply(this, arguments);
                }

                Collection.prototype.query = function(params) {
                    if (params) {
                        return _.query(this.models, params, "get");
                    } else {
                        return _.query.build(this.models, "get");
                    }
                };

                Collection.prototype.whereBy = function(params) {
                    return new this.constructor(this.query(params));
                };

                Collection.prototype.setFilter = function(parent, query) {
                    var check;
                    check = _.query.tester(query, "get");
                    this.listenTo(parent, {
                        add: function(model) {
                            if (check(model)) {
                                return this.add(model);
                            }
                        },
                        remove: this.remove,
                        change: function(model) {
                            if (check(model)) {
                                return this.add(model);
                            } else {
                                return this.remove(model);
                            }
                        }
                    });
                    return this.add(_.query(parent.models, query, "get"));
                };

                return Collection;

            })(Backbone.Collection);
            parent = new Collection([{
                title: "Home",
                colors: ["red", "yellow", "blue"],
                likes: 12,
                featured: true,
                content: "Dummy content about coffeescript"
            }, {
                title: "About",
                colors: ["red"],
                likes: 2,
                featured: true,
                content: "dummy content about javascript"
            }, {
                title: "Contact",
                colors: ["red", "blue"],
                likes: 20,
                content: "Dummy content about PHP"
            }]);
            live = new Collection;
            live.setFilter(parent, {
                likes: {
                    $gt: 15
                }
            });
            assert.equal(parent.length, 3);
            assert.equal(live.length, 1);
            parent.at(0).set("likes", 16);
            assert.equal(live.length, 2);
            parent.at(2).set("likes", 2);
            assert.equal(live.length, 1);
            parent.add([{
                title: "New",
                likes: 21
            }, {
                title: "New2",
                likes: 3
            }]);
            assert.equal(live.length, 2);
            assert.equal(parent.length, 5);
            parent.pop();
            parent.pop();
            return assert.equal(live.length, 1);
        });
        it("buildQuery works in oo fashion", function() {
            var a, query, result;
            a = create();
            query = _.query.build(a).and({
                likes: {
                    $gt: 5
                }
            }).or({
                content: {
                    $like: "PHP"
                }
            }).or({
                colors: {
                    $contains: "yellow"
                }
            });
            result = query.run();
            assert.equal(result.length, 2);
            result = _.query.build().and({
                likes: {
                    $lt: 15
                }
            }).or({
                content: {
                    $like: "Dummy"
                }
            }).or({
                featured: {
                    $exists: true
                }
            }).not({
                colors: {
                    $contains: "yellow"
                }
            }).run(a);
            assert.equal(result.length, 1);
            return assert.equal(result[0].title, "About");
        });
        it("works with dot notation", function() {
            var result;
            collection = [{
                title: "Home",
                stats: {
                    likes: 10,
                    views: {
                        a: {
                            b: 500
                        }
                    }
                }
            }, {
                title: "About",
                stats: {
                    likes: 5,
                    views: {
                        a: {
                            b: 234
                        }
                    }
                }
            }, {
                title: "Code",
                stats: {
                    likes: 25,
                    views: {
                        a: {
                            b: 796
                        }
                    }
                }
            }];
            result = _.query(collection, {
                "stats.likes": 5
            });
            assert.equal(result.length, 1);
            assert.equal(result[0].title, "About");
            result = _.query(collection, {
                "stats.views.a.b": 796
            });
            assert.equal(result.length, 1);
            return assert.equal(result[0].title, "Code");
        });
        it("works with seperate query args", function() {
            var query, result;
            collection = [{
                title: "Home",
                stats: {
                    likes: 10,
                    views: {
                        a: {
                            b: 500
                        }
                    }
                }
            }, {
                title: "About",
                stats: {
                    likes: 5,
                    views: {
                        a: {
                            b: 234
                        }
                    }
                }
            }, {
                title: "Code",
                stats: {
                    likes: 25,
                    views: {
                        a: {
                            b: 796
                        }
                    }
                }
            }];
            query = _.query.build(collection).and("title", "Home");
            result = query.run();
            assert.equal(result.length, 1);
            return assert.equal(result[0].title, "Home");
        });
        return it("$computed", function() {
            var Backbone, a, b, c, result, testModel;
            Backbone = require("backbone");
            testModel = (function(superClass) {
                extend(testModel, superClass);

                function testModel() {
                    return testModel.__super__.constructor.apply(this, arguments);
                }

                testModel.prototype.full_name = function() {
                    return (this.get('first_name')) + " " + (this.get('last_name'));
                };

                return testModel;

            })(Backbone.Model);
            a = new testModel({
                first_name: "Dave",
                last_name: "Tonge"
            });
            b = new testModel({
                first_name: "John",
                last_name: "Smith"
            });
            c = [a, b];
            result = _.query(c, {
                full_name: {
                    $computed: "Dave Tonge"
                }
            });
            assert.equal(result.length, 1);
            assert.equal(result[0].get("first_name"), "Dave");
            result = _.query(c, {
                full_name: {
                    $computed: {
                        $likeI: "n sm"
                    }
                }
            });
            assert.equal(result.length, 1);
            return assert.equal(result[0].get("first_name"), "John");
        });
    });

}).call(this);