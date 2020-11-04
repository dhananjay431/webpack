export class _number{
    n:any;
    constructor(num:number){
        this.n = num;
    }
    min(min:number,set = 0){
        if(!( this.n >= min) )
            this.n = set;
        else
            this.n = this.n;
        return this;        
    }
    max(max:number,set =0){
        if(!( this.n <= max) )
            this.n = set;
        else
            this.n = this.n;
        return this;        
    }
    minMax(min:number,max:number,set = 0){
        if(!(this.n <=  max && this.n >= min) )
            this.n = set;
        else
            this.n = this.n;
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
    val() {
        return this.n;
    }

}