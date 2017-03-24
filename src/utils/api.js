module.exports = {
    jssort: function(postData){
        var arr = [];
        for (var attr in postData) {
            arr.push(attr);
        }
        arr.sort();
        var obj = {};
        arr.forEach(function(ele, index) {
            obj[ele] = postData[ele];
        });
        return obj;
    },
    getUrl(api) {
        const APINAME = this.api[api];
        if (!APINAME) {
            console.error(`${api}error，api.js中查看是否配置正确`);
            return;
        }
        let host = window.location.host;
        host = this.host.test(host) ? this.dev : this.pro;
        return `${host}${APINAME}`;
    },
    api: {
        organization: '/organization'
    },
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    },
    dev: 'http://localhost:3333',
    // 生产环境
    pro: 'http://xxx',
    host: /localhost/,
    serializeObject () {
        var arrayData, objectData;
        arrayData = [];
        objectData = {};

        $.each(arrayData, function() {
            var value;

            if (this.value != null) {
                value = this.value;
            } else {
                value = '';
            }

            if (objectData[this.name] != null) {
                if (!objectData[this.name].push) {
                    objectData[this.name] = [objectData[this.name]];
                }

                objectData[this.name].push(value);
            } else {
                objectData[this.name] = value;
            }
        });

        return objectData;
    }
}
