

let a = [1,2,2,4,4, true, false, false, 1n, {"id": "asdas"}, {"id": "asdas"}, {"id": "asdas"}, {"id": "assdf"}, {"id": "assdf"}, {"id": "assdf"}];

Array.prototype.unique = function () {

    const typeObj = [ "object", "function", "array", "error", "regexp", "date" ];
    const getTypeElement = function (element) { return Object.prototype.toString.call(element).slice(8, -1).toLowerCase() }
    const primitiveArray =  this.filter((el) => { return typeObj.indexOf(getTypeElement(el)) < 0; });
    const objectArray = this.filter((el) => { return getTypeElement(el) === "object"; });

  
    function uniquePrimitiveArray (primitiveArray) {        
      const emptyObj = {};
      for (let i = 0; i < primitiveArray.length; ++i ) {
        emptyObj[primitiveArray[i]] = primitiveArray[i];
      }
      return Object.keys(emptyObj).map((element)=>{
        return emptyObj[element];
      });
    };
    
    function uniqueObjectArray(objectArray) {
      for (let i = 0; i < objectArray.length; ++i) {
        const propertyName = Object.keys(objectArray[0]).toString();
        return objectArray.filter((item, index) => objectArray.findIndex(element => element[propertyName] === item[propertyName]) === index);
      } 
    };

    function showMessage () {
      if (uniquePrimitiveArray(primitiveArray) != null) { console.log(`Массив с уникальными примитивами:`, uniquePrimitiveArray(primitiveArray)) }; 
      if (uniqueObjectArray(objectArray) != null) { console.log(`Массив с уникальными объектами:`, uniqueObjectArray(objectArray)) };
      if ((uniquePrimitiveArray(primitiveArray) == null) && (uniqueObjectArray(objectArray) == null)) { console.log("Массив пуст") };
    }

  return showMessage();
}

a.unique();






