
students = [
    {name: "Foo", results: [ 10, 13, 15 ] },
    {name: "Bar", results: [ 12, 11, 10 ] }
];

tests = [
    {name: "Test1", total: 10},
    {name: "Test2", total: 20},
    {name: "Test3", total: 15}
];

nameToTestId = {};

function generateData()
{
    result = Array();

    {
        row = Array();
        
        row["name"] = "Totals";

        i = 0;
        total = 0;

        tests.forEach(function(test) {
            score = test.total;
            row["result" + i] = score;
            total += score;
            ++i;
        });

        row["total"] = total;

        result.push(row);
    }

    result.push(Array());

    students.forEach(function(student) {
        row = Array();
        
        row["name"] = student.name;

        i = 0;
        total = 0;
        score = 0;

        tests.forEach(function(test) {
            note = student.results[i];

            if(!isNaN(note))
            {
                row["result" + i] = note;
                total += test.total;
                score += note;
            }
            else
            {
                row["result" + i] = 'A';
            }

            ++i;
        });

        row["total"] = score + '/' + total;

        result.push(row);

    });

    return result;
}

function generateColHeaders()
{
    result = Array();

    result.push("");

    tests.forEach(function(test) {
        result.push(test.name);
    });

    result.push("Totals");

    return result;
}

function generateColumns()
{
    result = Array();
    nameToTestId = Array();

    result.push({
        data:"name"
        });

    i = 0;

    tests.forEach(function(test) {
        name = "result"+i;
        result.push({ data:name });
        nameToTestId[name] = i;
        ++i;
    });

    result.push({
        data:"total",
        readOnly: true
        });

    return result;
}

function generateTable()
{
    $("#dataTable").handsontable({
        data: generateData(),
        minSpareRows: 1,
        colHeaders: generateColHeaders(),
        columns: generateColumns(),
        afterChange:onChange,
        stretchH: 'all'
    });
}


function onChange(changes, sources)
{
    if(sources == "edit")
    {
        change = changes[0];

        row = change[0];
        col = change[1];
        new_value =  change[3];

        if(nameToTestId[col] != null)
        {
            if(row > 1)
            {
                var s = row - 2;

                if(s < students.length)
                {
                    students[s].results[nameToTestId[col]] = Number(new_value);
                }
                else
                {
                    var student = createStudent();

                    student.name = "Unnamed";
                    student.results[nameToTestId[col]] = Number(new_value);
                }
            }
            else if(row==0)
            {
                tests[nameToTestId[col]].total = Number(new_value);
            }
        }
        else // Name
        {
            if(row > 1)
            {
                var s = row - 2;

                if(s < students.length)
                {
                    students[s].name = new_value;
                }
                else
                {
                    var student = createStudent();
                    student.name = new_value;
                }
            }
        }

        generateTable();
    }
}

function createStudent()
{
    var result = {
        name:"",
        results:[]
    }

    students.push(result);

    return result;
}

function createTest()
{
    var result = {
        name:"Testx",
        total:10
    }

    tests.push(result);

    return result;
}

function generateUi()
{
    $("#createTest")
        .button()
        .click(function( event )
        {
            var dialog = $("#dialogForm");

            dialog.dialog(
                "option",
                "buttons", [ { text: "Ok", click: function() {
                var test = createTest();

                var value = $('#dialogValue')[0].value;

                if(value != "")
                {
                    test.name = value;
                }

                dialog.dialog("close");

                generateTable();
            } } ] );

            dialog.dialog("option", "title", "Enter test title");

            $("#dialogForm").dialog("open");

        });

    $("#dialogForm").dialog({
        autoOpen: false,
        modal: true
    });
}

$(document).ready(function () {

    $.extend($.ui.dialog.prototype.options, { 
        create: function() {
            var $this = $(this);

            // focus first button and bind enter to it
            $this.parent().find('.ui-dialog-buttonpane button:first').focus();
            $this.keypress(function(e) {
                if( e.keyCode == $.ui.keyCode.ENTER ) {
                    $this.parent().find('.ui-dialog-buttonpane button:first').click();
                    return false;
                }
            });
        } 
    });

    generateUi();
    generateTable();
});
