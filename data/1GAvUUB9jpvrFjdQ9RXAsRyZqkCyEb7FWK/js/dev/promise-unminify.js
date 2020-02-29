    var Promise,
        slice = [].slice;

    Promise = (function() {
        Promise.join = function() {
            var args, fn, i, len, num_uncompleted, promise, task, task_id, tasks;
            tasks = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            num_uncompleted = tasks.length;
            args = new Array(num_uncompleted);
            promise = new Promise();
            fn = function(task_id) {
                return task.then(function() {
                    var callback, j, len1, ref, results;
                    args[task_id] = Array.prototype.slice.call(arguments);
                    num_uncompleted--;
                    if (num_uncompleted === 0) {
                        ref = promise.callbacks;
                        results = [];
                        for (j = 0, len1 = ref.length; j < len1; j++) {
                            callback = ref[j];
                            results.push(callback.apply(promise, args));
                        }
                        return results;
                    }
                });
            };
            for (task_id = i = 0, len = tasks.length; i < len; task_id = ++i) {
                task = tasks[task_id];
                fn(task_id);
            }
            return promise;
        };

        function Promise() {
            this.resolved = false;
            this.end_promise = null;
            this.result = null;
            this.callbacks = [];
        }

        Promise.prototype.resolve = function() {
            var back, callback, i, len, ref;
            if (this.resolved) {
                return false;
            }
            this.resolved = true;
            this.data = arguments;
            if (!arguments.length) {
                this.data = [true];
            }
            this.result = this.data[0];
            ref = this.callbacks;
            for (i = 0, len = ref.length; i < len; i++) {
                callback = ref[i];
                back = callback.apply(callback, this.data);
            }
            if (this.end_promise && back && back.then) {
                return back.then((function(_this) {
                    return function(back_res) {
                        return _this.end_promise.resolve(back_res);
                    };
                })(this));
            }
        };

        Promise.prototype.fail = function() {
            return this.resolve(false);
        };

        Promise.prototype.then = function(callback) {
            if (this.resolved === true) {
                return callback.apply(callback, this.data);
            }
            this.callbacks.push(callback);
            this.end_promise = new Promise();
            return this.end_promise;
        };

        return Promise;

    })();

    window.Promise = Promise;
