function Person(person) {
    this.firstName = person.firstname;
    this.lastName = person.lastname;
    this.active = person.activeemployee;
    this.phone = person.phonenumber;
    this.email = person.emailaddress;
    this.building = person.building;
    this.jobCategory = person.jobcategory;
    this.responsibilities = person.responsibilities;
    this.order = person.order;
    this.picture = person.picture;
    this.websiteLabel = person.website;
    this.link = person.websitelink;

    Person.all.push(this);
}
Person.all = [];

var reader = new XMLHttpRequest() || new ActiveXObject('MSXML2.XMLHTTP');

function loadFile() {
    reader.open('get', 'js/staff_data.txt', true);
    reader.onreadystatechange = displayContents;
    reader.send(null);
}

function displayContents() {
    if (reader.readyState == 4) {
        var data = JSON.parse(reader.responseText);
        data.forEach(function (item) {
            new Person(item);
        });
    }
}

loadFile();