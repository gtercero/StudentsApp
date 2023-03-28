$(document).ready(function () {
    getHobbies();
    getStudents();
});

function getStudents() {
    var url = "/api/Student";
   
    $.ajax({
        url: url,
        contentType: "application/json;charset=utf-8",
        type:"Get",
        dataType: "json",
       
        success: function (response) {
          
            var row = "";
            for (var i = 0; i < response.length; i++) {
              
                row += "<tr>";
                row += "<td>" + response[i].Name + "</td>";
                row += "<td>" + response[i].Email + "</td>";
                row += "<td>" + response[i].Phone + "</td>";
                row += "<td>" + response[i].Zip + "</td>";

                row += "<td>";
                for (var j = 0; j < response[i].HobbieName.length; j++) {
                    if (j == response[i].HobbieName.length - 1)
                        row += response[i].HobbieName[j];
                    else
                        row += response[i].HobbieName[j] + ",";
                }
                row += "</td>";
                row += "<td><button class='btn btn-primary' onclick='getStudent(\"" + response[i].ID + "\")'>Edit</button></td>";
                row += "</tr>";
              
            }
            $("#tblStudents").append(row);
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

function getStudent(ID) {
    
    var url = "/api/Student";

    $.ajax({
        url: url,
        contentType: "application/json;charset=utf-8",
        type: "Get",
        dataType: "json",
        data: {id: ID},
        success: function (response) {
            $("#hfID").val(response.ID);
            $("#txtName").val(response.Name.trim());
            $("#txtEmail").val(response.Email.trim());
            $("#txtPhone").val(response.Phone.trim());
            $("#txtZipCode").val ( response.Zip.trim());

            getStudentHobbies(ID);
        },
        error: function (msg) {
            alert(msg);
        }
    });
}
function addStudent() {
    var url = "/api/Student";
    var student = {};
    student.Name = $("#txtName").val().trim();
    student.Email = $("#txtEmail").val().trim();
    student.Phone = $("#txtPhone").val().trim();
    student.Zip = $("#txtZipCode").val().trim();

    var hobbies = [];
    var checkList = document.querySelectorAll(".checkItem");

    for (var i = 0; i < checkList.length; i++) {
        
        var idElement = checkList[i].id;
       
        if ($("#" + idElement).is(":checked")) {
            var newHobbie = {
                ID: idElement.replace('ck', ''),
                ID_Student:""
            }
            hobbies.push(newHobbie)
        }
       
    }
    student.Hobbies = hobbies;
   
    if (student && validateForm(student, 'add')) {
        $.ajax({
            url: url,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            type: "Post",
            data: JSON.stringify(student),
            success: function (response) {
                resetForm();
                getStudents();
            },
            error: function (msg) {
                console.log(msg)
                getStudents();
                resetForm();
            }
        });
    }

}

function updateStudent() {
    var url = "/api/Student";
    var student = {};
    student.ID = $("#hfID").val().trim();
    student.Name = $("#txtName").val().trim();
    student.Email = $("#txtEmail").val().trim();
    student.Phone = $("#txtPhone").val().trim();
    student.Zip = $("#txtZipCode").val().trim();

    var hobbies = [];
    var checkList = document.querySelectorAll(".checkItem");

    for (var i = 0; i < checkList.length; i++) {

        var idElement = checkList[i].id;

        if ($("#" + idElement).is(":checked")) {
            var newHobbie = {
                ID: idElement.replace('ck', ''),
                ID_Student: ""
            }
            hobbies.push(newHobbie)
        }

    }
    student.Hobbies = hobbies;

 
    if (student && validateForm(student, 'update')) {
        $.ajax({
            url: url,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            type: "Put",
            data: JSON.stringify(student),
            success: function (response) {
                resetForm();
            },
            error: function (msg) {
                console.log(msg);
                getStudents();
                resetForm();
            }
        });
    }

}

function resetForm() {

    $("#hfID").val('0');
    $("#txtName").val('');
    $("#txtEmail").val('');
    $("#txtPhone").val('');
    $("#txtZipCode").val('');

    var checkList = document.querySelectorAll(".checkItem");

    for (var i = 0; i < checkList.length; i++) {

        var idElement = checkList[i].id;
        $("#ck" + idElement).prop("checked", false);
       

    }
    $("#tblStudents").empty()
}
function validateForm(student,button){

    if (student.Name == "") {
        alert("You must add a Name.")
        return false;
    }
    if (student.Email == "") {
        alert("You must add a Email.")
        return false;
    }
    var patternEmail = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i
    if (!patternEmail.test(student.Email)) {
        alert("You must enter a Valid Email.")
        return false;
    }
    
    if (student.Phone == "") {
        alert("You must add a Phone.")
        return false;
    }
    var patternPhone = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
    if (!patternPhone.test(student.Phone)) {
        alert("You must enter a Valid Phone.")
        return false;
    }
    if (student.Zip == "") {
        alert("You must add a Zip Code.")
        return false;
    }
    var patternZip = /^\d{6}$/
    if (!patternZip.test(student.Zip)) {
        alert("You must enter a Valid ZipCode.")
        return false;
    }
    if (student.Hobbies.length == 0) {
        alert("You must add at least one hobbie.")
        return false;
    }
    if ($("#hfID").val() == "0" && button == "update") {
        alert("You must select a student first.")
        return false;
    }
    if ($("#hfID").val() != "0" && button == "add") {
        alert("You can't add the same student.")
        return false;
    }
    return true;
}
////lines of hobbies

function getHobbies() {
    var url = "/api/Hobbie";

    $.ajax({
        url: url,
        contentType: "application/json;charset=utf-8",
        type: "Get",
        dataType: "json",

        success: function (response) {
           
            var item = "";
            for (var i = 0; i < response.length; i++) {
                    
                item += "<li><input type='checkbox' class='checkItem' id='ck" + response[i].ID +"' />" + response[i].Hobbie + "</li>";
                
            }
            $("#checkboxList").append(item);
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

function getStudentHobbies(ID) {
    var url = "/api/Hobbie";

    $.ajax({
        url: url,
        contentType: "application/json;charset=utf-8",
        type: "Get",
        dataType: "json",
        data: { id: ID },
        success: function (response) {                                
            for (var i = 0; i < response.length; i++) {
                var ID = response[i].ID;
              
                $("#ck" + ID).prop("checked", true);                
            }            
        },
        error: function (msg) {
            alert(msg);
        }
    });
}
