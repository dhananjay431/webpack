class Temp {
    n: any = "";
    constructor(n: any) {
        this.n = n;
    }
    text() {
        switch (typeof this.n) {
            case "number":
                this.n = this.n.toString()
                break;
            case "string":
                this.n = this.n.toString()
                break;
            case "object":
                this.n = JSON.stringify(this.n);
                break;
            case "undefined":
                this.n = "undefined";
                break;
        }
        return this;
    }
    number() {
        if (Number.isNaN(Number(this.n))) {
            this.n = 0;
        } else {
            this.n = Number(this.n);
        }
        return this;
    }
    int() {
        this.number();
        this.n = parseInt(this.n);
        return this;
    }
    float() {
        this.number();
        this.n = parseFloat(this.n);
        return this;
    }
    fix(num: number) {
        this.number();
        this.n = this.n.toFixed(num);
        return this;
    }
    otoa() {

        if (Array.isArray(this.ref().val())) {
            this.n = this.n;
        } else {
            this.n = [this.n];
        }
        return this;
    }
    _tuple(data: any, pk: string, tag: string) {
        return data.map((d: any) => {
            let t: any = {
                new: {
                    [tag]: {}
                },
                old: {
                    [tag]: {}
                }
            };
            t["new"][tag] = d;
            if (d[pk] != undefined && d[pk] != "") {
                t["old"][tag] = {
                    [pk]: d[pk]
                };
            } else {
                delete t["old"];
            }
            if (d.del == true) {
                delete t["new"];
            }
            return t;
        });
    }
    tuple(pk: string, tag: string) {
        this.n = this._tuple(this.otoa().ref().val(), pk, tag);
        return this;
    }
    _blank(val: any) {
        for (var [key, value] of Object.entries(val)) {
            if (typeof value == "object") {
                this._blank(value);
            } else {
                val[key] = "";
            }
        }
        return val;
    }
    blank() {
        this.n = this._blank(this.ref().val());
        return this;
    }
    ref() {
        this.n = JSON.parse(JSON.stringify(this.n));
        return this;
    }
    mapAdd(x:any) {

        this.n = this.otoa().ref().val().map( (d:any) => {
            for (let x1 in x) {
                d[x1] = x[x1];
            }
            return d;
        })
        return this;
    }
    mapDel(x:any) {

        this.n = this.otoa().ref().val().map((d:any) => {
            for (let x1 of x) {
                delete d[x1];
            }
            return d;
        })
        return this;
    }
    mapChange(x:any) {

        this.n = this.otoa().ref().val().map((d:any) => {
            for (let x1 in x) {
                if (d[x1]) {
                    d[x[x1]] = d[x1];
                }

                delete d[x1];
            }
            return d;
        })
        return this;
    }
    filter(data:any) {
        this.n = this.otoa().ref().val().filter((d:any) => {
            var c = 0;
            for (var i in data) {
                if (this._at(d, i) == data[i]) {
                    c++;
                }
            }
            if (c == Object.keys(data).length)
                return d;
        })
        return this;
    }
    _at(o:any, s:any) {
        s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        s = s.replace(/^\./, ''); // strip a leading dot
        var a = s.split('.');
        for (var i = 0, n = a.length; i < n; ++i) {
            var k = a[i];
            if (k in o) {
                o = o[k];
            } else {
                return;
            }
        }
        return o;
    }
    alert() {
        window.alert = (d) => { console.log(d); }
    }
    console() {
        window.console.log = (d:any) => {}
    }
    at(key:any) {
        try {
            this.n = this._at(this.n, key);
        } catch (err) {
            this.n = undefined;
        }

        return this;
    }
    _it(arr:any,data:any,rev:any,rej:any){
        var that = this;
    if(arr == 0)
      {
        rev(data);
      }else{
       var t =  Promise.resolve(arr.shift());
       t.then(function(resp){
            data.push(resp);
            that._it(arr,data,rev,rej);
       },function(err){
            rej(err);
       })
      }
    }
    async(){
    var that = this;
     return new Promise(function(rev,rej){
        that.n =  Array.isArray(that.n)?that.n:[that.n];
        that._it(that.n,[],rev,rej);
    })
    }
    val() {
        return this.n;
    }
}

(function(w:any){
     w.$ = w.$ || {};
    w.$.db = function(data:any){
         return new Temp(data)
    }
})(window);