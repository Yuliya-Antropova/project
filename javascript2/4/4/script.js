


//Создать форму обратной связи с полями: Имя, Телефон, E-mail, текст, кнопка Отправить. При нажатии на кнопку Отправить произвести валидацию полей следующим образом:
//a.  Имя содержит только буквы.
//b.  Телефон имеет вид +7(000)000-0000.
//c.  E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
//d.  Текст произвольный.
//e.  Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой и сообщить пользователю об ошибке.

class Check {
    constructor() {

    }
    checkName() {
        let name = document.querySelector('.name')
        const nameRegExp = /^[a-z,а-я]+$/i
        if (nameRegExp.test(name.value)) {
            return true;
        } else {
            document.querySelector('.name').style.borderColor = 'red';
            return false;
        }
    }

    checkPhone() {
        let phone = document.querySelector('.phone')
        const phoneRegExp = /^\+7\(\d{3}\)\d{3}\-\d{4}/
        if (phoneRegExp.test(phone.value)) {
            return true;
        } else {
            document.querySelector('.phone').style.borderColor = 'red';
            return false;
        }
    }

    checkMail() {
        let mail = document.querySelector('.mail')
        const emailRegExp = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/
        if (emailRegExp.test(mail.value)) {
            return true;
        } else {
            document.querySelector('.mail').style.borderColor = 'red';
            return false;
        }
    }

    checkText() {
        let text = document.querySelector('.text')
        const letterRegExp = /^[a-z,а-я]+$/i
        if (letterRegExp.test(text.value)) {
            return true;
        } else {
            document.querySelector('.text').style.borderColor = 'red';
            return false;
        }
    }
}

const init = () => {

    let checkNew = new Check();

    document.querySelector('button').addEventListener('click', () => {
        if (checkNew.checkName() && checkNew.checkPhone() && checkNew.checkMail() && checkNew.checkText()) {
            console.log('Data sent')
        } else {
            checkNew.checkName()
            checkNew.checkPhone()
            checkNew.checkMail()
            checkNew.checkText()
            console.log('Data is not correct')
        }
    })

    //Дан большой текст, в котором для оформления прямой речи используются одинарные кавычки. Придумать шаблон, который заменяет одинарные кавычки на двойные.
//Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на двойную.

let text = document.querySelector('.textP').innerText;
let regExp = /\s'[^']+'\s/g;

console.log(text.replace(regExp, '"'));
document.querySelector('.textP').innerText = text.replace(regExp, '"');
}

window.onload = init;