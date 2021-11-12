'use strict'

const arrayValue = ['Рыба-клоун', 'Помацентровые', 'Лучепёрые рыбы', 'Хордовые', 'Животные'];

function inherit (ParentClass) {
    function ChildClass() {};
    ChildClass.prototype = Object.create(ParentClass.prototype);
    ChildClass.prototype.constructor = ChildClass;
    ChildClass.prototype._super = ParentClass.prototype;
    return ChildClass; 
}

function Genus () {};
Genus.prototype.initGenus = function (genus) {
    this.genus = genus;
}

const Family = inherit(Genus);
Family.prototype.initFamily = function (genus,family) {    
    this.family = family;
    this._super.initGenus.call(this, genus)
}

const FishClass = inherit(Family);
FishClass.prototype.initFishClass = function (genus, family, fishClass) {
    this.fishClass = fishClass;
    this._super.initFamily.call(this, genus, family)
}

const Phylum = inherit(FishClass);
Phylum.prototype.initPhylum = function (genus, family, fishClass, phylum) {
    this.phylum = phylum;
    this._super.initFishClass.call(this, genus, family, fishClass) 
}

const Kingdom = inherit(Phylum);
Kingdom.prototype.initKingdom = function (genus, family, fishClass, phylum, kingdom) {
    this.kingdom = kingdom;
    this._super.initPhylum.call(this, genus, family, fishClass, phylum) 
}

Kingdom.prototype.print = function () {
    console.log(
`Род: ${this.genus} 
Семейство: ${this.family}
Класс: ${this.fishClass}
Тип: ${this.phylum}
Царство: ${this.kingdom}`)
}

const fish = new Kingdom();
fish.initKingdom(...arrayValue);
fish.print();

