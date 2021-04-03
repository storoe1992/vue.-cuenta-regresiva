export default class {
    constructor(cant,unit){
        let _cant = cant;
        let _unit = unit;
        this.name = `${cant}${unit}`;
        this.getCant = () => _cant;
        this.getUnit = () => _unit;
    }

    get cant(){
        return this.getCant();
    }

    get unit(){
        return this.getUnit();
    }
}