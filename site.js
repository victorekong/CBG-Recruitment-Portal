
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((thebeigebank\.com)|(theroyalbank\.com\.gh)|(unibankghana\.com)|(theconstructionbank\.com)|(sovereignbankghana\.com))$/;
    return re.test(String(email).toLowerCase());
}

function showDetailForm() {
    $('#fill-form').show();
    $('#fill-submit').show();
    $('#otherexperience').show();
}

function hideDetailForm() {
    $('#fill-form').hide();
    $('#fill-submit').hide();
    $('#otherexperience').hide();
}

$('#checkID').click(function (e) {

    //e.preventDefault();
    $('.errorDiv').html("");
    var $this = $(this);

    var loadingText = '<i class="fa fa-circle-o-notch fa-spin"></i> validating...';
    if ($(this).html() !== loadingText) {
        $this.data('original-text', $(this).html());
        $this.html(loadingText);
        $this.attr('disabled', 'disabled');
    }

    if (!$('#staff_id').val()) {
        // $('.errorDiv').html("Invalid Email Address");
        alert("Input your staff ID or account number to continue");
        $this.html($this.data('original-text'));
        $this.removeAttr('disabled');
        return false;
    }
    // console.log(JSON.stringify({
    //     StaffId: $('#staff_id').val()
    // }));

    $.ajax({
        type: 'POST',
        url: 'http://18.222.193.0/GCBRecruitment/api/ValidateID',
        contentType: 'application/json; charset=utf-8',
        datatype: "json",
        data: JSON.stringify({
            StaffID: $('#staff_id').val()
        }),
        success: function (data) {
            $this.hide();
            $('#staff_id').attr('disabled', 'disabled');
            console.log(data);
            showDetailForm();
            var t = JSON.parse(data);
            $('#email').val(t['Email']);
            $('#staffname').val(t['Name']);
            //$('#staffname').attr('disabled', 'disabled');
        },
        error: function (xhr, textStatus, errorThrown) {
            // $('.errorDiv').html(xhr.responseText);
            alert(xhr.responseText === undefined ? "Please try again" : xhr.responseText);
            $this.html($this.data('original-text'));
            $this.removeAttr('disabled');

        }
    });
    $(this).button('reset');
})

$('#submit').click(function (e) {

    var form1 = $('#form1');
    var form2 = $('#form2');
    var form3 = $('#form3');
    var form4 = $('#form4');
    form1.validate();
    form2.validate();
    form3.validate();
    form4.validate();
    if (!form1.valid() || !form2.valid() || !form3.valid() || !form3.valid()) {
        alert("The form is not properly filled.")
        return false;
    }

    var $this = $(this);
    var loadingText = '<i class="fa fa-circle-o-notch fa-spin"></i> submitting...';
    if ($(this).html() !== loadingText) {
        $this.data('original-text', $(this).html());
        $this.html(loadingText);
        $this.attr('disabled', 'disabled');
    }

    var _data = new FormData();
    _data.append("StaffID", $('#staff_id').val());
    _data.append("Email", $('#email').val());
    _data.append("Name", $('#staffname').val());

    // _data.append("Surname", $('#surname').val());
    // _data.append("FirstName", $('#firstname').val());
    // _data.append("MiddleName", $('#middlename').val());
    //_data.append("Title", $('#title').val());

    _data.append("MemberBank", $('#memberbank').val());
    //_data.append("CurrentGrade", $('#currentgrade').val());
    _data.append("JobTitle", $('#jobtitle').val());
    _data.append("Grade", $('#grade').val());
    _data.append("Function", $('#function').val());
    _data.append("CumulativeYearsOfExperience", $('#cumulativeyearsofexperience').val());
    _data.append("YearsOfBankingExperience", $('#yrsofbankingexp').val());

    _data.append("YearsOfEmployment", $('#yearsofemployment').val());
    _data.append("DateOfLastPromotion", $('#dateoflastpromotion').val());
    _data.append("HighestEduQualification", $('#highesteduqualification').val());
    _data.append("TitleOfQualification", $('#titleofqualification').val());
    _data.append("KeyAchievement", $('#keyachievement').val());
    _data.append("OtherExperience1", $('#otherexperience1').val());
    _data.append("OtherExperience2", $('#otherexperience2').val());
    _data.append("OtherExperience3", $('#otherexperience3').val());


    _data.append("ProfessionalCert", $('#profesionalcert').val());
    _data.append("Gender", $('#gender').val());
    _data.append("DateOfBirth", $('#dateofbirth').val());

    _data.append("CV", $('#file')[0].files[0])

    // var object = {};
    // _data.forEach(function (value, key) {
    //     object[key] = value;
    // });
    // var json = JSON.stringify(object);
    // console.log(json);

    //console.log("here j");

    $.ajax({
        type: 'POST',
        url: 'http://18.222.193.0/GCBRecruitment/api/AddApplication',
        data: _data,
        contentType: false,
        processData: false,
        success: function (data) {
            hideDetailForm();
            console.log(data);
            alert(data.message);
        },
        error: function (xhr, textStatus, errorThrown) {
            alert(xhr.responseText);

        },
        complete: function (data) {
            $this.html($this.data('original-text'));
            $this.removeAttr('disabled');
        }
    });
});