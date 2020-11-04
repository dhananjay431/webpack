import { _utill } from "./_utill";
export class _array{
    n:any;
    constructor(num:any){
        this.n = num;
    }
    otoa() {
        if (Array.isArray(new _utill(this.n).ref().val())) {
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
        this.n = new _utill(this.n).ref().val();
        this.n = this._tuple(this.otoa().val(), pk, tag);
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
        this.n = this._blank(new _utill(this.n).ref());
        return this;
    }

    mapAdd(x:any) {
        this.n = new _utill(this.n).ref().val();
        this.n = this.otoa().val().map( (d:any) => {
            for (let x1 in x) {
                d[x1] = x[x1];
            }
            return d;
        })
        return this;
    }
    mapDel(x:any) {
        this.n = new _utill(this.n).ref().val();
        this.n = this.otoa().val().map((d:any) => {
            for (let x1 of x) {
                delete d[x1];
            }
            return d;
        })
        return this;
    }
    mapChange(x:any) {
        this.n = new _utill(this.n).ref().val();
        this.n = this.otoa().val().map((d:any) => {
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
        this.n = new _utill(this.n).ref().val();
        this.n = this.otoa().val().filter((d:any) => {
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
    at(key:any) {
        try {
            this.n = this._at(this.n, key);
        } catch (err) {
            this.n = undefined;
        }

        return this;
    }
    val() {
        return this.n;
    }
}