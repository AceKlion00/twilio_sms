var deleteList, editList, viewList, removeFromList, lt;
var selected = 0;
$(document).ready(function () {
    "use strict";

    // Datatables   
    var t = $('#lists').DataTable(
        {
            "ajax": {
                "url": serviceUrl + "lists/",
                "type": "GET"
            },
            "columns": [
                { "data": "list_name", "title": "LIST NAME" },
                { "data": "list_description", "title": "LIST DESCRIPTION" },
                { "data": "list_id", "title": "ACTIONS", "width": "100px" }
            ],
            "aoColumnDefs": [
                {
                    "aTargets": [2],
                    "mData": "headers",
                    "mRender": function (data, type, full) {
                        return '<button class="btn btn-sm btn-danger delete-account" onclick="deleteList(' + data + ')"><i class="fa fa-trash" aria-hidden="true"></i></button>'
                            + '&nbsp;<button class="btn btn-sm btn-warning" onclick="editList(' + data + ')"><i class="fa fa-edit" aria-hidden="true"></i></button>'
                            + '&nbsp;<button class="btn btn-sm btn-info" onclick="viewList(' + data + ')"><i class="fa fa-search" aria-hidden="true"></i></button>';
                    }
                }
            ]
        }
    );

    $("#add-list").click(function (e) {
        let entry = {
            name: document.getElementById('name').value,
            description: document.getElementById('description').value
        }
        sendRequestWithToken('POST', localStorage.getItem('authToken'), entry, "lists/add", (xhr, err) => {

            if (!err) {
                t.ajax.reload();
                $('#add-list-modal').modal('hide');
                toastr.success('List has been added!')
            } else {
                let data = JSON.parse(xhr.responseText);
                console.log(data);
                toastr.error('Oops! An error!')
            }
        });
    });
    $("#addtolist").click(function (e) {

        let entry = {
            listId: selected,
            phone: document.getElementById('sphone').value
        }
        sendRequestWithToken('POST', localStorage.getItem('authToken'), entry, "lists/addtolist", (xhr, err) => {
            if (!err) {
                lt.ajax.reload();
                toastr.success('List has been updated!')
            } else {
                toastr.error('Oops! An error!')
            }
        });
    });
    $("#update-list").click(function (e) {
        let entry = {
            name: document.getElementById('ename').value,
            description: document.getElementById('edescription').value,
            id: selected
        }
        sendRequestWithToken('POST', localStorage.getItem('authToken'), entry, "lists/update", (xhr, err) => {
            if (!err) {
                t.ajax.reload();
                $('#edit-list-modal').modal('hide');
                toastr.success('List has been updated!')
            } else {
                let data = JSON.parse(xhr.responseText);
                console.log(data);
                toastr.error('Oops! An error!')
            }
        });
    });
    viewList = (id) => {
        selected = id;
        $('#view-list-modal').modal('show');
        lt = null;
        document.getElementById('list-contacts-b').innerHTML = '<table id="list-contacts" class="display table"><thead></thead></table>';

        lt = $('#list-contacts').DataTable(
            {
                "ajax": {
                    "url": serviceUrl + "lists/view",
                    "type": "POST",
                    "data": {
                        id: selected
                    }
                },
                "columns": [
                    { "data": "first_name", "title": "FIRST NAME" },
                    { "data": "last_name", "title": "LAST NAME" },
                    { "data": "phone", "title": "PHONE" },
                    { "data": "email", "title": "EMAIL" },
                    { "data": "contact_id", "title": "ACTIONS" }
                ],
                "aoColumnDefs": [
                    {
                        "aTargets": [4],
                        "mData": "headers",
                        "mRender": function (data, type, full) {
                            return '<button class="btn btn-sm btn-danger delete-account" onclick="removeFromList(' + data + ')"><i class="fa fa-trash" aria-hidden="true"></i></button>';
                        }
                    }
                ]
            }
        );
    }
    editList = (data) => {
        selected = data;
        sendRequestWithToken('POST', localStorage.getItem('authToken'), { id: data }, "lists/getbyid", (xhr, err) => {
            if (!err) {

                console.log(xhr.responseText);
                let list = JSON.parse(xhr.responseText);
                document.getElementById('ename').value = list.list_name;
                document.getElementById('edescription').value = list.list_description;
                $('#edit-list-modal').modal('show');

            } else {
                toastr.error('Oops! An error!')
            }
        });
    }

    removeFromList = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it!'
        }).then((result) => {
            if (result.value) {
                sendRequestWithToken('DELETE', localStorage.getItem('authToken'), { contactId: id, listId: selected }, "lists/remove", (xhr, err) => {
                    if (!err) {
                        lt.ajax.reload();
                        toastr.success('Contact has been removed!')
                    } else {
                        toastr.error('Oops! An error!')
                    }
                });
            }
        })
    }

    deleteList = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                sendRequestWithToken('DELETE', localStorage.getItem('authToken'), { id: id }, "lists/delete", (xhr, err) => {
                    if (!err) {
                        t.ajax.reload();
                        toastr.success('List has been deleted!')
                    } else {
                        toastr.error('Oops! An error!')
                    }
                });
            }
        })
    }
});