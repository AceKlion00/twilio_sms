$(document).ready(function () {
    "use strict";

    sendRequestWithToken('GET', localStorage.getItem('authToken'), {}, "contacts/", (xhr, err) => {
        if (!err) {

            let data = JSON.parse(xhr.responseText);
            data = data.data;
            data.forEach(element => {
                var o = new Option(element.first_name + ' ' + element.middle_name + ' ' + element.last_name, element.phone);
                /// jquerify the DOM object 'o' so we can use the html method
                $(o).html(element.first_name + ' ' + element.middle_name + ' ' + element.last_name);
                $("#contact").append(o);
            });

        } else {

            toastr.error('Oops! An error!')
        }
    });
    $('#contact').change(() => {
        document.getElementById('phone').value = document.getElementById('contact').value;
    });
    $('#ssend').click(() => {
        let entry = {
            phone: document.getElementById('phone').value,
            method: document.getElementById('delivery').value,
            message: document.getElementById('message').value
        }
        sendRequestWithToken('POST', localStorage.getItem('authToken'), entry, "com/", (xhr, err) => {
            if (!err) {
                toastr.success('OK!');
            } else {
                let data = JSON.parse(xhr.responseText);
                toastr.error('Oops! ' + data.message);
            }
        });
    });

});