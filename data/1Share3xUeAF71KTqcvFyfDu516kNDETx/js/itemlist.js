(function () {
    var ItemList;

    ItemList = (function () {
        function ItemList(item_class1, key1) {
            this.item_class = item_class1;
            this.key = key1;
            this.items = [];
            this.items_bykey = {};
        }

        ItemList.prototype.sync = function (rows, item_class, key) {
            var current_obj, i, item, len, results, row;
            this.items.splice(0, this.items.length);
            results = [];
            for (i = 0, len = rows.length; i < len; i++) {
                row = rows[i];
                current_obj = this.items_bykey[row[this.key]];
                if (current_obj) {
                    current_obj.setRow(row);
                    results.push(this.items.push(current_obj));
                } else {
                    item = new this.item_class(row, this);
                    this.items_bykey[row[this.key]] = item;
                    results.push(this.items.push(item));
                }
            }
            return results;
        };

        ItemList.prototype.deleteItem = function (item) {
            var index;
            index = this.items.indexOf(item);
            if (index > -1) {
                this.items.splice(index, 1);
            } else {
                console.log("Can't delete item", item);
            }
            return delete this.items_bykey[item.row[this.key]];
        };

        return ItemList;

    })();

    window.ItemList = ItemList;

}).call(this);

