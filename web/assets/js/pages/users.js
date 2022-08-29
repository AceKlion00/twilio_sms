var deleteAccount, changePassword;
var selected = 0;
$(document).ready(function () {
    "use strict";

    // Datatables   
    var t = $('#users').DataTable(
        {
            "ajax": {
                "url": serviceUrl + "users/",
                "type": "GET"
            },
            "columns": [
                { "data": "user_fullname", "title": "FULLNAME" },
                { "data": "user_email", "title": "EMAIL" },
                { "data": "user_roles", "title": "ROLE" },
                { "data": "user_status", "title": "STATUS" },
                { "data": "user_id", "title": "ACTIONS" }


            ],
            "aoColumnDefs": [
                {
                    "aTargets": [4],
                    "mData": "headers",
                    "mRender": function (data, type, full) {
                        return '<button class="btn btn-sm btn-danger delete-account" onclick="deleteAccount(' + data + ')"><i class="fa fa-trash" aria-hidden="true"></i></button>&nbsp;<button class="btn btn-sm btn-warning" onclick="changePassword(' + data + ')"><i class="fa fa-edit" aria-hidden="true"></i></button>';
                    }
                },
                {
                    "aTargets": [3],
                    "mData": "headers",
                    "mRender": function (data, type, full) {
                        if (data == 1)
                            return '<span class="badge badge-pill">ACTIVE</span>';
                    }
                }
            ]
        }
    );

    $("#add-user").click(function (e) {
        let entry = {
            fullname: document.getElementById('fullname-input').value,
            email: document.getElementById('email-input').value,
            pass1: document.getElementById('pass1-input').value,
            pass2: document.getElementById('pass2-input').value
        }
        sendRequestWithToken('POST', localStorage.getItem('authToken'), entry, "users/add", (xhr, err) => {
            if (!err) {
                t.ajax.reload();

                $('#add-user-modal').modal('hide');
                toastr.success('User has been added!')
            } else {
                let data = JSON.parse(xhr.responseText);
                console.log(data);
                toastr.error('Oops! An error!')
            }
        });
    });
    $("#change-pass").click(function (e) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, change it!'
        }).then((result) => {
            if (result.value) {
                let entry = {
                    pass1: document.getElementById('cpass1-input').value,
                    pass2: document.getElementById('cpass2-input').value,
                    id: selected
                }
                sendRequestWithToken('POST', localStorage.getItem('authToken'), entry, "users/changepass", (xhr, err) => {
                    if (!err) {
                        $('#change-pass-modal').modal('hide');
                        toastr.success('Password has been updated!')
                    } else {
                        let data = JSON.parse(xhr.responseText);
                        console.log(data);
                        toastr.error('Oops! An error!')
                    }
                });
            }
        });
    });
    changePassword = (id) => {
        selected = id;
        $('#change-pass-modal').modal('show');
    }
    deleteAccount = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                sendRequestWithToken('DELETE', localStorage.getItem('authToken'), { id: id }, "users/delete", (xhr, err) => {
                    if (!err) {
                        t.ajax.reload();
                        toastr.success('Account has been deleted!')
                    } else {
                        toastr.error('Oops! An error!')
                    }
                });
            }
        })
    }
});