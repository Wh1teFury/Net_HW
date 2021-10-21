function submitText () {
    let text = document.getElementById('textarea').value;
    (text != '' ) ? setTopWord(text) : alert(showMessageErr());
}

function setTopWord (str) {
    if (typeof (str) === "string") {
        const banWord = [ 'без', 'в', 'до', 'для', 'за', 'к', 'на', 'над', 'о', 'об', 'от', 'по', 'под', 'пред', 'при', 'про', 'с', 'у', 'через' ];
        const wordObj = {};
        let clearStr = str.replace(/[^a-zа-яё\s]/gi, '').toLowerCase().split(' ').filter((el) => el != ''); 
        clearStr.filter((el) => !~banWord.indexOf(el)).forEach((key) => (wordObj[key] != undefined) ? ++wordObj[key] : wordObj[key] = 1);
        const keys = Object.keys(sortObject(wordObj));
        const values = Object.values(sortObject(wordObj));
        for (i=0;i<3;i++) {
            if (keys[i] != undefined && values[i] != undefined ) {
               alert(`Топ ${i+1} слово ${keys[i]}, которое встречается ${values[i]} раз(а)`) 
            }            
        };  
    } else {
      alert(showMessageErr());  
    }    
};

function showMessageErr () { return message = 'Недопустимое значение' };

function sortObject (obj) {
    let orderedList = {};    
    let sortable = Object.entries(obj).sort((a, b) => ((a[1] < b[1] ? 1 : (a[1] > b[1] ? -1 : 0))));
    for (var idx in sortable) {
        orderedList[sortable[idx][0]] = sortable[idx][1];
    };
    return orderedList;
};
