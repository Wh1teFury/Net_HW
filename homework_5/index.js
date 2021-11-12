
const obj1 = { property: "value" };
const obj2 = {
    property: "value123",
    nextLevel: {
        property: "secondValue",
        thirdLevel: {
            thirdProperty: "thirdValue"
        }
    }
};
const obj3 = {
    property: "value124",
    nextLevel: {
        property: "secondValue",
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
                if ((this.isObject(obj1) === true) && (this.isObject(obj2) === true)) {
                    const propsArray1 = JSON.stringify(obj1).replace(/[,:{}"]/gi, ' ').split(" ").filter((el)=>{return el !== ""});
                    const propsArray2 = JSON.stringify(obj2).replace(/[,:{}"]/gi, ' ').split(" ").filter((el)=>{return el !== ""});            
                    if (propsArray1.length !== propsArray2.length) {
                        return false;
                    };            
                    for (let i = 0; i < propsArray1.length; i += 1) {
                        if (propsArray2.includes(propsArray1[i]) === false){
                            return false;
                        }
                    };
                    return true;
                } return 'Ошибка, нужен объект';
            } 
        },

        findValue: {
            value: function findValue (obj, key) {
                if (this.isObject(obj) === true) {
                    let result = "Ключ не найден";
                    isFindValue (obj, key);
                    function  isFindValue (obj, key) {   
                        for (let prop in obj) {
                            if (obj.hasOwnProperty(prop) && prop === key){
                                result = `${key}: ${JSON.stringify(obj[prop])}`  ;
                            } 
                        }
                        if (result === false) {
                            for (let prop in obj) {
                                if (typeof(obj[prop]) === 'object') {
                                return findValue(obj[prop], key) 
                                }
                            }
                        }
                    }           
                    return result;
                } return 'Ошибка, нужен объект';    
            }
        },

        hasKey: {
            value: function (obj, key) {
                if (this.isObject(obj) === true) {
                    let result = false;
                    isHasKey(obj, key);
                    function isHasKey(obj, key) {
                        for (let prop in obj) {
                            if (!obj.hasOwnProperty(key) && typeof (obj[prop]) === 'object') { 
                                isHasKey(obj[prop], key);
                            } else if (obj.hasOwnProperty(key)) { 
                                result = true;
                            }
                        }                   
                    }
                    return result;
                } return "Ошибка, нужен объект";
            }
        }

    })
}

const helper = new Helper();

console.log (helper);
console.log (helper.isObject(obj1));                             // true, object
console.log (helper.isObject([]));                               // false, array
console.log (helper.isEmpty(obj1));                              // false, not empty
console.log (helper.isEmpty({}));                                // true, empty   
console.log (helper.deepClone(obj2));                            // objClone
console.log (helper.isEqual(obj2,obj2));                         // true
console.log (helper.isEqual(obj2,obj3));                         // false
console.log (helper.findValue (obj2 , 'property' ));             // property: "value123"
console.log (helper.findValue (obj2 , 'roperty' ));              // Ключ не найден
console.log (helper.hasKey(obj2, 'thirdProperty' ));             // true 
console.log (helper.hasKey(obj2, 'fifthProperty' ));             // false


