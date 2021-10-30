
const obj1 = { property: "value" };
const obj2 = {
    property: "value",
    nextLevel: {
        secondProperty: "secondValue",
        thirdLevel: {
            thirdProperty: "thirdValue"
        }
    }
};

function Helper() {

    Object.defineProperties(this, {

        isObject: {
            value: function (obj) {
                return (Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() === 'object') ? true : false;
            }
        },

        isEmpty: {
            value: function (obj) {
                if (this.isObject(obj) === true) {
                    for (var i in obj) {
                        if (obj.hasOwnProperty(i)) {
                            return false;
                        }
                    } return true;
                } return 'Ошибка, нужен объект';
            }
        },

        deepClone: {
            value: function (obj) {
                if (this.isObject(obj) === true) {
                    const objClone = JSON.parse(JSON.stringify(obj));
                    return objClone;
                }
                return 'Ошибка, нужен объект';
            }
        },

        isEqual: {
            value: function (obj1, obj2) {
                if ((this.isObject(obj1) === true) && (this.isObject(obj1) === true)) {
                    const props1 = Object.getOwnPropertyNames(obj1);
                    const props2 = Object.getOwnPropertyNames(obj2);
                    if (props1.length !== props2.length) {
                        return false;
                    }

                    for (let i = 0; i < props1.length; i += 1) {
                        const prop = props1[i];
                        const bothAreObjects = typeof (obj1[prop]) === 'object' && typeof (obj2[prop]) === 'object';

                        if ((!bothAreObjects && (obj1[prop] !== obj2[prop]))
                            || (bothAreObjects && !this.isEqual(obj1[prop], obj2[prop]))) {
                            return false;
                        }
                    } return true;

                } return 'Ошибка, нужен объект';
            }
        },

        findValue: {
            value: function (obj, key) {
                if (this.isObject(obj) != true) {return "Ошибка, нужен объект"};
                let result = "Ключ не найден";
                isFindValue(obj, key);
                function isFindValue(obj, key) {
                    for (secKey in obj) {
                        if (secKey === key) {
                            result = `Ключ ${key}: значение ${obj[secKey]}`;    
                        } else if ( typeof(obj[secKey]) === 'object' ) {
                            isFindValue(obj[secKey], key);
                        }
                    }
                }
                return result;
            }
        },

        hasKey: {
            value: function (obj, key) {
                if (this.isObject(obj) != true) {return "Ошибка, нужен объект"};
                let result = false;
                isHasKey(obj, key);
                function isHasKey(obj, key) {
                    for (let secKey in obj)
                        if (!obj.hasOwnProperty(key) && typeof (obj[secKey]) === 'object') { isHasKey(obj[secKey], key); };
                    if (obj.hasOwnProperty(key)) { result = true; }
                }

                return result;
            }
        }

    })
}

const helper = new Helper();

console.log (helper);
console.log (helper.isObject(obj1));
console.log (helper.isEmpty(obj1));
console.log (helper.deepClone(obj2));
console.log (helper.isEqual(obj1,obj2));
console.log (helper.hasKey(obj2, 'thirdProperty' ));
console.log (helper.findValue (obj2 , 'thirdProperty' ));


