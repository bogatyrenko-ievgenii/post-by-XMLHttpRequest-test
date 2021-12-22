window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form');
    const submit = document.querySelector('.form__submit');

    const message = {
        loading: 'loading',
        success: 'success',
        failure: 'failure',
    }

    function postData (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const statusMessage = document.createElement('div');
            // statusMessage.style.cssText = ''
            statusMessage.textContent = message.loading;
            form.append(statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            // request.setRequestHeader('Content-type', 'multipart/form-data');
            // в связке с formData будет ошибка если назначить заголовки запроса

            request.setRequestHeader('Content-type', 'aplication/json');
            const formData = new FormData(form);

            const object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            })

            const objectToJSON = JSON.stringify(object);


            request.send(/* formData - отправляется объектом или в JSON-формате => */ objectToJSON);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    statusMessage.textContent = message.success;
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000);

                } else {
                    statusMessage.textContent = message.failure;
                }
            });
            
        });
    }

    submit.addEventListener('click', postData(form));

});