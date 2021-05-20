/**
 * Объект с вопросами.
 */

let count = 0;
class Question {
    constructor (question, answer, correctAnswer) {
        this.question = question;
        this.answer = answer;
        this.correctAnswer = correctAnswer;
    }
}

let question1 = new Question (
    'Зимой и летом одним цветом', 
    {
        'a': 'Елка',
        'b': 'Огонь',
        'c': 'Вода',
        'd': 'Листва',
    },
    'a',
);
let question2 = new Question (
    'Миллион одежек и все без застежек', 
    {
        'a': 'Шуба',
        'b': 'Женщина',
        'c': 'Лед',
        'd': 'Лук',
    },
    'd',
);
let question3 = new Question (
    'Не лает не кусает, в дом не пускает', 
    {
        'a': 'Собака',
        'b': 'Дверь',
        'c': 'Замок',
        'd': 'Охранник',
    },
    'c',
);
let question4 = new Question (
    'Речка спятила с ума - По домам пошла сама.', 
    {
        'a': 'Ручей',
        'b': 'Водопровод',
        'c': 'Змея',
        'd': 'Солнце',
    },
    'b',
);
let question5 = new Question (
    'Музыкант, певец, рассказчик - а всего труба да ящик.', 
    {
        'a': 'Шут',
        'b': 'Книга',
        'c': 'Артист',
        'd': 'Граммофон',
    },
    'd',
);
let questions = [question1, question2, question3, question4, question5];


let game = {
    /**
     * Запускает игру.
     */
    run() {
        // Задаем вопросы по порядку и получаем ответ у игрока. Проверяем корректность ответа.
        for (let i = 0; i < questions.length; i++) {
            console.log(questions[i].question);
            console.log(questions[i].answer);
            let answerUser = prompt('Введите букву верного ответа. Если устанете играть нажмите Отмена');
                    
                if (answerUser === null) {
                    console.log('Игра окончена. Ваш счет равен ' + count);
                    return;
                } else if (questions[i].correctAnswer == answerUser) {
                    count++;
                    console.log('Вы правы! Ваш счет равен ' + count);
                } else {
                    console.log('Вы неправы! Верный ответ: ' + questions[i].correctAnswer + '. Ваш счет равен ' + count);
                } 
        }
        console.log('Игра окончена. Ваш счет ' + count);
        console.log('Если хотите сыграть еще раз, наберите game.run()');

    },

    // Этот метод выполняется при открытии страницы.
    init() {
        console.log("Добро пожаловать в игру 'Кто хочет стать миллионером!' Ваш счет = " + count);
        // Отображаем нашу игру.
        console.log("Чтобы начать игру наберите game.run() и нажмите Enter.");
    }
};

game.init();