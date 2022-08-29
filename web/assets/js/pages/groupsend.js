$(document).ready(function () {
    "use strict";

    sendRequestWithToken('GET', localStorage.getItem('authToken'), {}, "lists/", (xhr, err) => {
        if (!err) {

            let data = JSON.parse(xhr.responseText);
            data = data.data;
            data.forEach(element => {
                var o = new Option(element.list_name, element.list_id);
                /// jquerify the DOM object 'o' so we can use the html method
                $(o).html(element.list_name);
                $("#list").append(o);
            });

        } else {

            toastr.error('Oops! An error!')
        }
    });
    $('#contact').change(() => {
        document.getElementById('phone').value = document.getElementById('contact').value;
    });

    $('#gsend').click(() => {
        let entry = {
            listId: document.getElementById('list').value,
            method: document.getElementById('delivery').value,
            message: document.getElementById('message').value
        }
        sendRequestWithToken('POST', localStorage.getItem('authToken'), entry, "com/group", (xhr, err) => {
            if (!err) {
                toastr.success('OK!');
            } else {
                let data = JSON.parse(xhr.responseText);
                toastr.error('Oops! ' + data.message);
            }
        });
    });

});