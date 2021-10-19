const drop = () => {

    // drag *
    // dragend *
    // dragenter - когда перетаскиваемы объект перетаскивается над dropArea
    // dragexit *
    // dropArea - за пределами dropArea
    // dragover - объект зависает над dropArea
    // dragstart *
    // drop - объект отправлен в dropArea

    // * срабатывают на элементе, который мы перетаскиваем 

    const fileInputs = document.querySelectorAll('[name="upload"]');

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false)
        });
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highligh (item) {
        item.closest('.file_upload').style.border = '5px solid yellow';
        item.closest('.file_upload').style.backgroundColor = 'rgba(0,0,0, .7)';
    }

    function unhighligh(item) {
        item.closest('.file_upload').style.border = 'none';
        if (item.closest('.calcform')) {
            item.closest('.file_upload').style.backgroundColor = '#fff';
        } else {
            item.closest('.file_upload').style.backgroundColor = '#ededed';
        }
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highligh(input), false);
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unhighligh(input), false);
        });
    });

    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files;
            let dots;
            const arr = input.files[0].name.split('.');
                arr[0].lenght > 6 ? dots = '...' : dots = '.';//разбили с пом сплит 'имя.jpg' на 'имя' и 'jpg'
            const name = arr[0].substring(0, 6) + dots + arr[1]; //вырежется от 0 до 5, 6 не считается
                input.previousElementSibling.textContent = name;
        });

    });
};

export default drop;