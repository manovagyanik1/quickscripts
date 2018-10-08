// logic for find email
//
// sanitize name by converting non english to english if possible, and other separators to space like (-, _)
// if(PING firstName@companyname === 'mailbox doesn't exist')
//   return search for all combinations in google, // for search go for bigger combinations then small combinations
// else if(PING firstName@companyname === 'mailbox exist' && firstname is valid) {
//   if(PING firstName+randvalue@companyName === 'mailbox exist' and firstname+randValue is invalid)
//     return firstname@companyname
//   else
//     return search for all combinations in google
// }
// else if (mailbox exist && firstname is invalid) {
//     PING all other combination of emails and return that   
// }
// 

function callAjax(url, callback){
    var xmlhttp;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            callback(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function searchEmail(email) {
	callAjax("https://www.google.co.in/search?q=%22"+email+"%22", function(x){
        if(x.includes("No results found for") || x.includes("did not match any documents")) console.log("%c "+email + ": NO", 'color: #8B0000');
        else console.log("%c "+email + ": YES", 'color: #006400');
    });
}

// NOTE: only considers name with 
function findByNameAndCompany(name, companyWebsite) {
    var names = name.trim().split(/ /g);
    var emails = [];

    emails.push(names[0]+"@"+companyWebsite);
    emails.push("info@"+companyWebsite);
    emails.push("support@"+companyWebsite);
    emails.push("contact@"+companyWebsite);
    if(names.length>1) {
        emails.push(names[1]+"@"+companyWebsite);
        emails.push(`${names[0]}.${names[1]}@${companyWebsite}`);
        emails.push(`${names[1]}.${names[0]}@${companyWebsite}`);
        // emails.push(`${names[0][0]}.${names[1]}@${companyWebsite}`);
        // emails.push(`${names[0]}.${names[1][0]}@${companyWebsite}`);
        // emails.push(`${names[0][0]}.${names[1][0]}@${companyWebsite}`);
        // emails.push(`${names[1][0]}.${names[0]}@${companyWebsite}`);
        // emails.push(`${names[1][0]}.${names[0][0]}@${companyWebsite}`);
    }

    for(let i=0; i<emails.length; i++) {

        // delay the calls otherwise google starts blocking
        setTimeout(function() {searchEmail(emails[i])}, i*3000);
    }
}