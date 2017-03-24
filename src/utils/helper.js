module.exports = {
    throttle (fn, delay, immediate, debounce) {
        var curr = +new Date(),
            last_call = 0,
            last_exec = 0,
            timer = null,
            diff,
            context,
            args,
            exec = function () {
                last_exec = curr;
                fn.apply(context, args);
            };
        return function () {
            curr= +new Date();
            context = this,
                args = arguments,
                diff = curr - (debounce ? last_call : last_exec) - delay;
            clearTimeout(timer);
            if (debounce) {
                if (immediate) {
                    timer = setTimeout(exec, delay);
                } else if (diff >= 0) {
                    exec();
                }
            } else {
                if (diff >= 0) {
                    exec();
                } else if (immediate) {
                    timer = setTimeout(exec, -diff);
                }
            }
            last_call = curr;
        }
    },
    debounce (fn, delay, immediate) {
        return this.throttle(fn, delay, immediate, true);
    }
}