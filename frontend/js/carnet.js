
students = [
    {name: "Nissan", results: [ 10, 13, 15 ] }
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

        tests.forEach(function(test) {
            score = student.results[i];
            row["result" + i] = score;
            total += score;
            ++i;
        });

        row["total"] = total;

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

    result.push("Total");

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
        result.push({ data:name});
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
        afterChange:onChange
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

        if(nameToTestId[col])
        {
            if(row > 1)
            {
                students[row - 2].results[nameToTestId[col]] = Number(new_value);
            }
            else if(row==0)
            {
                tests[nameToTestId[col]].total = Number(new_value);
            }
        }

        generateTable();
    }
}