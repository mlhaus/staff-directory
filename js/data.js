function Person(person) {
    this.firstName = person.firstname;
    this.lastName = person.lastname;
    this.active = person.activeemployee;
    this.phoneExts = person.phonenumber.split(',');
    this.email = person.emailaddress;
    this.buildings = person.building.split(',');
    this.jobCategory = person.jobcategory;
    this.responsibilities = person.responsibilities;
    this.order = person.order;
    this.picture = person.picture;
    this.websiteLabel = person.website;
    this.link = person.websitelink;

    Person.all.push(this);
}
Person.all = [];
Person.renderAll = function () {
    var tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    Person.all.forEach(function(person) {
        person.render();
    });
}
Person.prototype.render = function() {
    var tbody = document.querySelector('tbody');
    var tr = document.createElement('tr');
    tbody.appendChild(tr);

    // Display Image
    var td = document.createElement('td');
    td.setAttribute('data-label', 'Picture');
    td.className = 'clearfix';
    var img = document.createElement('img');
    img.setAttribute('src', `images/${this.picture}`);
    img.setAttribute('alt', `${this.firstName} ${this.lastName}`);
    td.appendChild(img);
    tr.appendChild(td);

    // Display Name
    td = document.createElement('td');
    td.setAttribute('data-label', 'Name');
    td.textContent = `${this.firstName} ${this.lastName}`;
    tr.appendChild(td);

    // Display Building and Phone
    td = document.createElement('td');
    td.setAttribute('data-label', 'Building(s) and Phone(s)');
    var phoneNumber;
    for(i in this.buildings) {
        var school = this.buildings[i].trim();
        var span = document.createElement('span');
        span.textContent = `${this.buildings[i]}`;
        td.appendChild(span);
        var br = document.createElement('br');
        td.appendChild(br);
        switch (school) {
            case 'Bus Barn':
                phoneNumber = '(319) 627-4288';
                break;
            case 'Administrative Office':
            case 'Central Office':
                phoneNumber = '(319) 627-2116';
                break;
            case 'Early Learning Center':
            case 'ELC':
                phoneNumber = '(319) 627-5089';
                break;
            case 'Elementary School':
            case 'Elementary':
                phoneNumber = '(319) 627-4243';
                break;
            case 'Middle School':
                phoneNumber = '(319) 627-2118';
                break;
            case 'High School':
                phoneNumber = '(319) 627-2115';
                break;
            default:
                phoneNumber = '';
        }
        var a = document.createElement('a');
        a.setAttribute('href', `tel:${phoneNumber}`);
        a.textContent = phoneNumber;
        td.appendChild(a);

        if (this.phoneExts[i]) {
            var phoneExt = this.phoneExts[i].trim();
            if (phoneExt) {
                var span = document.createElement('span');
                span.textContent = ` Ext: ${phoneExt}`;
                td.appendChild(span);
            }
            // br = document.createElement('br');
            // td.appendChild(br);
        }
        // i is type string, while this.buiding.length is type number
        if (i != this.buildings.length - 1) {
            br = document.createElement('br');
            td.appendChild(br);
            br = document.createElement('br');
            td.appendChild(br);
        }
        
    }
    tr.appendChild(td);

    // <tr>
    //     <td data-label="Picture">Picture</td>
    //     <td data-label="Name">Name</td>
    //     <td data-label="Phone">Phone</td>
    //     <td data-label="Email">Email</td>
    //     <td data-label="Building">Building</td>
    //     <td data-label="Job Category">Job Category</td>
    //     <td data-label="Responsibilities">Responsibilities</td>
    //     <td data-label="Website">Website</td>
    // </tr>
}

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
        Person.renderAll();
    }
}

loadFile();