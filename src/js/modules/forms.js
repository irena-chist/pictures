/* import checkNumInputs from "./checkNumInputs"; */

import {postData} from '../services/requests';

const forms = () => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        upload = document.querySelectorAll('[name="upload"]');

    //checkNumInputs('input [name="user_phone"]');

    const message = {
        loading: "Загрузка",
        success: "Спасибо! Скоро мы с Вами свяжемся!",
        failure: "Произошла ошибка",
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    };



    const clearInputs = () => {//очищаем все инпуты
        inputs.forEach(item => {
            item.value = '';
        });
        upload.forEach(item => {
            item.previousElementSibling.textContent = 'Файл не выбран';
        });
    };

    upload.forEach(item => {
        item.addEventListener('input', () => {
            console.log(item.files[0]);
            let dots;
            const arr = item.files[0].name.split('.');
            arr[0].lenght > 6 ? dots = '...' : dots = '.';//разбили с пом сплит 'имя.jpg' на 'имя' и 'jpg'
            const name = arr[0].substring(0, 6) + dots + arr[1]; //вырежется от 0 до 5, 6 не считается
            item.previousElementSibling.textContent = name;
        });
    });

    form.forEach(item => {//перебираем все формы
        item.addEventListener('submit', (e) => {//навешиваем обработчик события сабмит
            e.preventDefault(); //отмена станд поведения браузера, чтобы страница не перезагружалась

            let statusMessage = document.createElement('div');//блок для вывода сообщения о том, как прошел запрос
            statusMessage.classList.add('status');//добавляем внешний вид блока
            item.parentNode.appendChild(statusMessage);//помещаем блок на родителя в страницу в конец формы

            item.classList.add('animated', 'fadeOutUp');
            setTimeout(() => {
                item.style.display = 'none';
            }, 400);

            let statusImg = document.createElement('img');
                statusImg.setAttribute('src', message.spinner);
                statusImg.classList.add('animated', 'fadeInUp');
                statusMessage.appendChild(statusImg);

            let textMessage = document.createElement('div');
                textMessage.textContent = message.loading;
                statusMessage.appendChild(textMessage);

            const formData = new FormData(item); //собираем все данные из формы
            let api;
            item.closest('.popup-design') ||item.classList.contains('calc_form') ? api = path.designer : api = path.question;//тернарный оператор. Если мы найдем блок попап дизайн (т.е. блок с картинкой) - в него мы присваиваем, что отправит данные нужно дизайнеру, иначе - просто менеджеру
            console.log(api);

            postData(api, formData)//отправляем запрос на сервер с данными, которые получил FormData
             .then(result => {
                console.log(result);
                statusImg.setAttribute('src', message.ok);
                textMessage.textContent = message.success; 
             })
             .catch(() => {
                statusImg.setAttribute('src', message.fail);
                textMessage.textContent = message.failure; 
             })
             .finally(() => {
                clearInputs();
                setTimeout(() => {
                    statusMessage.remove();
                    item.style.display = 'block';
                    item.classList.remove('fadeOutUp');
                    item.classList.add('fadeInUp');
                }, 5000);
             });
        });
    });
};

export default forms;