var deleteContact, editContact;
var selected = 0;
$(document).ready(function () {
    "use strict";

    // Datatables   
    var t = $('#contacts').DataTable(
        {
            "ajax": {
                "url": serviceUrl + "contacts/",
                "type": "GET"
            },
            "columns": [
                { "data": "first_name", "title": "FIRST NAME" },
                { "data": "middle_name", "title": "MIDDLE NAME" },
                { "data": "last_name", "title": "LAST NAME" },
                { "data": "phone", "title": "PHONE" },
                { "data": "email", "title": "EMAIL" },
                { "data": "description", "title": "DESCRIPTION" },
                { "data": "contact_id", "title": "ACTIONS" }


            ],
            "aoColumnDefs": [
                {
                    "aTargets": [6],
                    "mData": "headers",
                    "mRender": function (data, type, full) {
                        return '<button class="btn btn-sm btn-danger delete-account" onclick="deleteContact(' + data + ')"><i class="fa fa-trash" aria-hidden="true"></i></button>&nbsp;<button class="btn btn-sm btn-warning" onclick="editContact(' + data + ')"><i class="fa fa-edit" aria-hidden="true"></i></button>';
                    }
                }
            ]
        }
    );

    $("#add-contact").click(function (e) {
        let entry = {
            firstname: document.getElementById('firstname').value,
            middlename: document.getElementById('middlename').value,
            lastname: document.getElementById('lastname').value,
            email: document.getElementById('email').value,
            cell: document.getElementById('cell').value,
            description: document.getElementById('description').value
        }
        sendRequestWithToken('POST', localStorage.getItem('authToken'), entry, "contacts/add", (xhr, err) => {
            if (!err) {
                t.ajax.reload();

                $('#add-contact-modal').modal('hide');
                toastr.success('Contact has been added!')
            } else {
                let data = JSON.parse(xhr.responseText);
                console.log(data);
                toastr.error('Oops! An error!')
            }
        });
    });
    $("#update-contact").click(function (e) {
        let entry = {
            id: selected,
            firstname: document.getElementById('efirstname').value,
            middlename: document.getElementById('emiddlename').value,
            lastname: document.getElementById('elastname').value,
            email: document.getElementById('eemail').value,
            cell: document.getElementById('ecell').value,
            description: document.getElementById('edescription').value
        }
        sendRequestWithToken('POST', localStorage.getItem('authToken'), entry, "contacts/update", (xhr, err) => {
            if (!err) {
                t.ajax.reload();

                $('#edit-contact-modal').modal('hide');
                toastr.success('Contact has been updated!')
            } else {
                let data = JSON.parse(xhr.responseText);
                console.log(data);
                toastr.error('Oops! An error!')
            }
        });
    });
    editContact = (id) => {
        selected = id;
        sendRequestWithToken('POST', localStorage.getItem('authToken'), { id: id }, "contacts/getbyid", (xhr, err) => {
            if (!err) {
                console.log(xhr.responseText);
                let contact = JSON.parse(xhr.responseText);
                document.getElementById('efirstname').value = contact.first_name;
                document.getElementById('emiddlename').value = contact.middle_name
                document.getElementById('elastname').value = contact.last_name;
                document.getElementById('eemail').value = contact.email;
                document.getElementById('ecell').value = contact.phone;
                document.getElementById('edescription').value = contact.description;

                $('#edit-contact-modal').modal('show');
            } else {
                toastr.error('Oops! An error!')
            }
        });
    }
    deleteContact = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                sendRequestWithToken('DELETE', localStorage.getItem('authToken'), { id: id }, "contacts/delete", (xhr, err) => {
                    if (!err) {
                        t.ajax.reload();
                        toastr.success('Contact has been deleted!')
                    } else {
                        toastr.error('Oops! An error!')
                    }
                });
            }
        })
    }
});