// go to https://angel.co/jobs and apply the filters 

var jobs = $(".browse_startups_table_row"); // get the job rows
for(var i=1; i<jobs.length; i++) { // starts from 1 since 0th is for search and filter 
	jobs[i].click();
}
// the above line will expand all the results

var companies = [];

for(var i=1; i<jobs.length; i++) {
    var link = $(".startup-link", jobs[i])[0];
    var companyName = link.text;
    var companyAngelListPage = link.href;
    var place = $(".tag.locations.tiptip", jobs[i])[0].innerText;
    var rolesArray = $(".title>a", jobs[i]);
    var roles = [];

    for(var j=0; j<rolesArray.length; j++) {
        roles.push(rolesArray[j].text);
    }
    var salary = $(".compensation", jobs[i])[0].innerHTML;
    var foundersArray = $("a.profile-link", jobs[i]);
    try {
    var website = $("a.website-link", jobs[i])[0].text;
    } catch (error) {}

    var founders = [];
    for(var j=0; j<foundersArray.length; j++) {
        founders.push({
            name: foundersArray[j].text,
            link: foundersArray[j].href
        });
    }

    try {
        var whyUs = $(".why_us>.content>p", jobs[i])[0].innerHTML;        
    } catch (error) {}
    try {
    var product = $(".product>.content>.description", jobs[i])[0].innerHTML
    } catch (error) {}

    companies.push({
        name: companyName,
        website,
        angellink: companyAngelListPage,
        place,
        roles,
        salary,
        founders,
        whyUs,
        product
    })
}

JSON.stringify(companies)