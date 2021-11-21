setTimeout(() => console.log(`- Курлы`), 100);

const areYouHuman = false;

const whoAreYou = new Promise((resolve, reject) => {
        if (areYouHuman) {
            const human = `- Я, человек обыкновенный` 
            resolve(human);
        } else {
            const whoIsIt = new Error(`- Я не человек, я зверь`);
            reject(whoIsIt);
        }
    }
);

(() => {
    whoAreYou
    .then((fulfilled) => console.log(fulfilled))
    .catch((error) => console.log(error.message))
    .finally (() => console.log(`- Ты похоже, голубь`) );
})();

console.log(`- Привет`);


