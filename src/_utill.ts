export class _utill{
    n:any;
    constructor(num:any){
        this.n = num;
    }
    ref() {
        this.n = JSON.parse(JSON.stringify(this.n));
        return this;
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


    alert() {
        window.alert = (d) => { console.log(d); }
        return this;
    }
    console() {
        window.console.log = (d:any) => {}
        return this;
    }

    _async(arr:any,data:any,rev:any,rej:any){
        var that = this;
    if(arr == 0)
      {
        rev(data);
      }else{
       var t =  Promise.resolve(arr.shift());
       t.then(function(resp){
            data.push(resp);
            that._async(arr,data,rev,rej);
       },function(err){
            rej(err);
       })
      }
    }
    async(){
    var that = this;
     return new Promise(function(rev,rej){
        that.n =  Array.isArray(that.n)?that.n:[that.n];
        that._async(that.n,[],rev,rej);
    })
    }
    val() {
        return this.n;
    }
}