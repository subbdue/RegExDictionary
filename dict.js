/*
 * 1. Read in words.txt (the dictionary), and store it in an array.
 * 2. When user submits a regex search 'searchDict()' routine is called
 * .. which essentially parses the dictionary array and pretty prints
 * .. the results in a tabular form.  
 */
window.onload = function() {
    loadDict2();
}

//http://stackoverflow.com/questions/15547407/javascript-read-text-file-using-ajax
function loadDict2()
{
    var textfile;

    document.getElementById("results").innerHTML = "Wait ... Loading Dictionary";
    if (window.XMLHttpRequest)
    { 
        textfile = new XMLHttpRequest(); 
    }
    textfile.onreadystatechange = function()
    {   
        if (textfile.readyState == 4 && textfile.status == 200)
        { 
            content = textfile.responseText; 
            window.dictContent = $.csv.toArray(content); 
            document.getElementById("results").innerHTML = "Done Loading Dictionary";
        }
    }
    textfile.open("GET", "words.txt", true);
    textfile.send();
}

function searchDict(form) {
    //var input = window.dictContent;
    var rx = form.entry.value;
    var data = window.dictContent;
    var html = generatePrettyTable(data, rx);
    $('#result-container').empty();
    $('#result-container').html(html);
}

function searchDict2() {
    //var input = window.dictContent;
    var rx = document.forms["srchform"]["entry"].value;
    var data = window.dictContent;
    var html = generatePrettyTable(data, rx);
    $('#result-container').empty();
    $('#result-container').html(html);
}

// build HTML table data from an array (one or two dimensional)
function generatePrettyTable(data, rx) {
    var html = '';
    var patt1 = new RegExp(rx, "i");
    if(data[0].constructor === String) {
        //html += '<tr>\r\n';
        for(var item in data) {
            var mat = patt1.test(data[item]);
            if(mat == true) { 
                html += '<div id="row-res"><a href="http://www.wordwebonline.com/search.pl?w=' + data[item] + '" target="_blank">' + data[item] + '</a></div>\r\n';
            } //if
        } //for
        //html += '</tr>\r\n';
    }   
    return html;
}

/* Part of the learning experience - hence leaving it here*/
function displayDate(form)
{
    var x = form.entry.value;
    alert("You Typed: " + x);
    document.getElementById("results").innerHTML = Date();
}

function loadDict(form)
{
    var textfile;
    var rx = form.entry.value;

    if (window.XMLHttpRequest)
    { 
        textfile = new XMLHttpRequest(); 
    }
    textfile.onreadystatechange = function ()
    {   
        if (textfile.readyState == 4 && textfile.status == 200)
        { 
            content = textfile.responseText; 
            example1(content, rx);
            //document.getElementById("results").innerHTML = content;
        }
    }
    textfile.open("GET", "words.txt", true);
    textfile.send();
}

// Clicked on "Basic Usage Demo" here https://code.google.com/p/jquery-csv/
// Look at the source of this page: http://jquery-csv.googlecode.com/git/examples/basic-usage.html
function example1(dat, rx) {
    var input = dat;
    var data = $.csv.toArray(input);
    var html = generateTable(data, rx);
    $('#result1').empty();
    $('#result1').html(html);
}

function generateTable(data, rx) {
    var html = '';
    var patt1 = new RegExp(rx, "i");
    if(data[0].constructor === String) {
        html += '<tr>\r\n';
        for(var item in data) {
            var mat = patt1.test(data[item]);
            if(mat == true) { 
                html += '<td>' + data[item] + '</td>\r\n';
            } //if
        } //for
        html += '</tr>\r\n';
    }   
    return html;
}
