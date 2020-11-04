import { _number } from "./_number";
import { _utill } from "./_utill";
import { _array } from "./_array";
class Temp {
    n: any = "";
    constructor(n: any) {
        this.n = n;
    }
    min(min:number,set = 0){
        this.n = new _number(this.n).min(min,set).val();
        return this;
    }

    max(max:number,set =0){
        this.n = new _number(this.n).max(max,set).val();
            return this;        
    }
    minMax(min:number,max:number,set = 0){
        this.n = new _number(this.n).minMax(min,max,set).val();
            return this;
    }
    number() {
        this.n = new _number(this.n).number().val();
        return this;
    }
    int() {
        this.n = new _number(this.n).int().val();
        return this;
    }
    float() {
        this.n = new _number(this.n).float().val();
        return this;
    }
    fix(num: number) {
        this.n = new _number(this.n).fix(num).val();
        return this;
    }

    ref() {
        this.n = new _utill(this.n).ref().val();
        return this;
    }
    text() {
        this.n = new _utill(this.n).text().val();
        return this;
    }
    alert() {
        this.n = new _utill("done").alert().val();
        return this;
    }
    console() {
        this.n = new _utill("done").console().val();
        return this;
    }

    async(){
        this.n = new _utill(this.n).async();
        return this;
    }
    val() {
        return this.n;
    }
    // ///////////////////
    otoa() {
        this.n = new _array(this.n).otoa().val();
        return this;
    }
    
    tuple(pk: string, tag: string) {
        this.n = new _array(this.n).tuple(pk,tag).val();
        return this;
    }
    blank() {
        this.n = new _array(this.n).blank().val();
        return this;
    }

    mapAdd(x:any) {
        this.n = new _array(this.n).mapAdd(x).val();
        return this;
    }
    mapDel(x:any) {
        this.n = new _array(this.n).mapDel(x).val();
        return this;
    }
    mapChange(x:any) {
        this.n = new _array(this.n).mapChange(x).val();
        return this;
    }
    filter(data:any) {
        this.n = new _array(this.n).mapChange(data).val();
        return this;
    }
    at(key:any) {
        this.n = new _array(this.n).at(key).val();
        return this;
    }
}

(function(w:any){
     w.$ = w.$ || {};
    w.$.db = function(data:any){
         return new Temp(data)
    }
})(window);