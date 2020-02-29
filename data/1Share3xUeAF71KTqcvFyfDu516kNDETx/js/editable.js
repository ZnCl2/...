
(function () {
    var Editable,
            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            },
            extend = function (child, parent) {
                for (var key in parent) {
                    if (hasProp.call(parent, key))
                        child[key] = parent[key];
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

    Editable = (function (superClass) {
        extend(Editable, superClass);

        function Editable(type, handleSave, handleDelete) {
            this.type = type;
            this.handleSave = handleSave;
            this.handleDelete = handleDelete;
            this.render = bind(this.render, this);
            this.handleSaveClick = bind(this.handleSaveClick, this);
            this.handleDeleteClick = bind(this.handleDeleteClick, this);
            this.handleCancelClick = bind(this.handleCancelClick, this);
            this.handleEditClick = bind(this.handleEditClick, this);
            this.storeNode = bind(this.storeNode, this);
            this.node = null;
            this.editing = false;
            this.render_function = null;
            this.empty_text = "Click here to edit this field";
        }

        Editable.prototype.storeNode = function (node) {
            return this.node = node;
        };

        Editable.prototype.handleEditClick = function (e) {
            this.editing = true;
            this.field_edit = new Autosize({
                focused: 1,
                style: "height: 0px"
            });
            return false;
        };

        Editable.prototype.handleCancelClick = function () {
            this.editing = false;
            return false;
        };

        Editable.prototype.handleDeleteClick = function () {
            Page.cmd("wrapperConfirm", ["Are you sure?", "Delete"], (function (_this) {
                return function () {
                    _this.field_edit.loading = true;
                    return _this.handleDelete(function (res) {
                        return _this.field_edit.loading = false;
                    });
                };
            })(this));
            return false;
        };

        Editable.prototype.handleSaveClick = function () {
            this.field_edit.loading = true;
            this.handleSave(this.field_edit.attrs.value, (function (_this) {
                return function (res) {
                    _this.field_edit.loading = false;
                    if (res) {
                        return _this.editing = false;
                    }
                };
            })(this));
            return false;
        };

        Editable.prototype.render = function (body) {
            if (this.editing) {
                return h("div.editable.editing", {
                    exitAnimation: Animation.slideUp
                }, this.field_edit.render(body), h("div.editablebuttons", h("a.button.button-submit.button-small.button-outline", {
                    href: "#Cancel",
                    onclick: this.handleCancelClick,
                    tabindex: "-1"
                }, "Cancel"), this.handleDelete ? h("a.button.button-submit.button-small.button-outline", {
                    href: "#Delete",
                    onclick: this.handleDeleteClick,
                    tabindex: "-1"
                }, "Delete") : void 0, h("a.button.button-submit.button-small", {
                    href: "#Save",
                    onclick: this.handleSaveClick
                }, "Save")));
            } else {
                return h("div.editable", {
                    enterAnimation: Animation.slideDown
                }, h("a.icon.icon-edit", {
                    key: this.node,
                    href: "#Edit",
                    onclick: this.handleEditClick
                }), !body ? h(this.type, h("span.empty", {
                    onclick: this.handleEditClick
                }, this.empty_text)) : this.render_function ? h(this.type, {
                    innerHTML: this.render_function(body)
                }) : h(this.type, body));
            }
        };

        return Editable;

    })(Class);

    window.Editable = Editable;

}).call(this);