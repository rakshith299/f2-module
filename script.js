let nameEle = document.getElementById("name");
let email = document.getElementById("email");
let age = document.getElementById("age");
let gpa = document.getElementById("gpa");
let degree = document.getElementById("degree");
let button = document.getElementById("button");
let span = document.getElementById("toDo");

let table = document.getElementById("table");
let nextRow = document.getElementById("next-row");
let tbody = document.getElementById("tbody");

let form = document.getElementById("form");
let searchEle = document.getElementById("search");


form.addEventListener("submit", function(event){
    event.preventDefault();
})

let studentArr = [];


let initialId = 0;

let rowTobeEdited = null;

//delete particular row
function deleteRow(id){
    let deletableObj = studentArr[id-1];
    
    studentArr.splice(id-1, 1);

    console.log("after delete :", studentArr);

    // deleting in table

    let delEle = document.getElementById(`${id}`);
    delEle.remove();
}



// take input and edit
function editTheText(){

    let inputName = nameEle.value.trim();
    let inputEmail = email.value.trim();
    let inputAge = age.value.trim();
    let inputGpa = gpa.value.trim();
    let inputDegree = degree.value.trim();


    let flag = false;
    if(inputName === ""){
        flag = true;
        alert("Enter Valid Name");       
    }else if(inputEmail === ""){
        flag = true;
        alert("Enter Valid Email");
    }else if(inputAge === ""){
        flag = true;
        alert("Enter Valid Age");
    }else if(inputGpa === ""){
        flag = true;
        alert("Enter Valid GPA")
    }else if(inputDegree === ""){
        flag = true;
        alert("Enter Valid Degree");
    }

    let emailFlag = false;

    let emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(emailRegex.test(inputEmail)){
        emailFlag = false;
    }else{
        emailFlag = true;
        alert("Enter valid Email");
    }

    let gpaFlag = false;

    if(parseFloat(inputGpa) > 0 && parseFloat(inputGpa) < 10){
        gpaFlag = false;
    }else{
        flag = true;
        alert("Enter Valid Gpa between 0 - 10");
    }

    let ageFlag = false;
    if(parseInt(inputAge) < 5){
        ageFlag = true;
        alert("Please enter valid age");
    }else{
        ageFlag = false;
    }

    if(flag === false && emailFlag === false && gpaFlag === false && ageFlag === false){


        let editableObj = studentArr[rowTobeEdited]; 
        
        console.log("editableObj : ", editableObj);
        console.log("studentArr: ", studentArr);

        // changing object in array
            editableObj.stuName = `${inputName}`;
            editableObj.stuEmail = `${inputEmail}`;
            editableObj.stuAge = `${inputAge}`;
            editableObj.stuGpa = `${inputGpa}`;
            editableObj.stuDegree = `${inputDegree}`;

            console.log("after edit " ,studentArr);

            let editableEle = document.getElementById(`${editableObj.stuId}`);
            console.log("editable ele", editableEle);

            // changing text in hmtl table
            editableEle.children[0].innerText = editableObj.stuId;
            editableEle.children[1].innerText = editableObj.stuName;
            editableEle.children[2].innerText = editableObj.stuEmail;
            editableEle.children[3].innerText = editableObj.stuAge;
            editableEle.children[4].innerText = editableObj.stuGpa;
            editableEle.children[5].children[0].innerText = editableObj.stuDegree;

            

            nameEle.value = "";
            email.value = "";
            age.value = "";
            gpa.value = "";
            degree.value = "";

            rowTobeEdited = null;

            let editButton = document.getElementById("button-2");
            editButton.classList.remove("addBut");
            editButton.classList.add("button-2");

            let button = document.getElementById("button");
            button.classList.remove("removeBut"); 
            
            span.innerText = "Enter";
            span.classList.remove("span-edit");

    }
}


//edit button and span
function editText(id){

    button.classList.add("removeBut");
    let editButton = document.getElementById("button-2");
    editButton.classList.remove("button-2");
    editButton.classList.add("addBut");

    span.innerText = "Edit";
    span.classList.add("span-edit");

    rowTobeEdited = id-1;
    
}

//delete all rows
function deleteAllRows(len){
    for(let i = 0; i < len; i++){
        tbody.removeChild(tbody.children[0]);
    }
}


function deletePreviousRows(len){

    for(let i = 0; i < len-1; i++){
        tbody.removeChild(tbody.children[0]);
    }
}



function addDataToTable(each){

    console.log(tbody.children);
     let newRow = document.createElement("tr");
     newRow.setAttribute("id", `${each.stuId}`);

     let idCell = document.createElement("td");
     idCell.innerText = each.stuId;
     newRow.appendChild(idCell);

     let nameCell = document.createElement("td");
     nameCell.innerText = each.stuName;
     newRow.appendChild(nameCell);

     let emailCell = document.createElement("td");
     emailCell.innerText = each.stuEmail;
     newRow.appendChild(emailCell);

     let ageCell = document.createElement("td");
     ageCell.innerText = each.stuAge;
     newRow.appendChild(ageCell);

    let gpaCell = document.createElement("td");
    gpaCell.innerText = each.stuGpa;
    newRow.appendChild(gpaCell);

    let degreeCell = document.createElement("td");
    degreeCell.classList.add("td-opt-cont");

    let tdTextCont = document.createElement("div");
    tdTextCont.innerText = each.stuDegree;
    degreeCell.appendChild(tdTextCont);

    let tdIconCont = document.createElement("div");
    tdIconCont.classList.add("icon-container");
    tdIconCont.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class = "icon" id = '${each.stuId}' onclick = "editText(id)">
            <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class = "icon" id = '${each.stuId}' onclick = "deleteRow(id)"> 
            <path d="M3 6H5H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 11V17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 11V17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

    degreeCell.appendChild(tdIconCont);
    
    newRow.appendChild(degreeCell);

    

     tbody.insertBefore(newRow, nextRow);
}

function addStudentData(){

   

    let inputName = nameEle.value.trim();
    let inputEmail = email.value.trim();
    let inputAge = age.value.trim();
    let inputGpa = gpa.value.trim();
    let inputDegree = degree.value.trim();

    console.log("Age :", inputAge);
    console.log("input Gpa :",inputGpa);

    let flag = false;
    if(inputName === ""){
        flag = true;
        alert("Enter Valid Name");       
    }else if(inputEmail === ""){
        flag = true;
        alert("Enter Valid Email");
    }else if(inputAge === ""){
        flag = true;
        alert("Enter Valid Age");
    }else if(inputGpa === ""){
        flag = true;
        alert("Enter Valid GPA")
    }else if(inputDegree === ""){
        flag = true;
        alert("Enter Valid Degree");
    }

    let emailFlag = false;

    let emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(emailRegex.test(inputEmail)){
        emailFlag = false;
    }else{
        emailFlag = true;
        alert("Enter valid Email");
    }

    let gpaFlag = false;

    if(parseFloat(inputGpa) > 0 && parseFloat(inputGpa) < 10){
        gpaFlag = false;
    }else{
        flag = true;
        alert("Enter Valid Gpa between 0 - 10");
    }

    let ageFlag = false;
    if(parseInt(inputAge) < 5){
        ageFlag = true;
        alert("Please enter valid age");
    }else{
        ageFlag = false;
    }

    if(flag === false && emailFlag === false && gpaFlag === false && ageFlag === false){
    
        let inputId = initialId = initialId + 1;


        let eachStudentData = {
            stuId: `${inputId}`,
            stuName: `${inputName}`,
            stuEmail: `${inputEmail}`,
            stuAge: `${inputAge}`,
            stuGpa: `${inputGpa}`,
            stuDegree: `${inputDegree}`,
        
        };


        studentArr.push(eachStudentData);

        nameEle.value = "";
        email.value = "";
        age.value = "";
        gpa.value = "";
        degree.value = "";

        console.log("student Arr : ",studentArr);

        let len = studentArr.length;

        deletePreviousRows(len);

        studentArr.forEach(each => {
            addDataToTable(each);
        })

    }
    
    
  
}

//search
searchEle.addEventListener("keyup", function(event){
    let searchValue = event.target.value;
    let lowerSearchValue = searchValue.toLowerCase();

    let filteredArr = studentArr.filter((each) => {
        if(each.stuName.toLowerCase().includes(lowerSearchValue) || each.stuEmail.toLowerCase().includes(searchValue) || each.stuDegree.toLowerCase().includes(searchValue)){
            return each;
        }
    })


    console.log("filtered Array: ", filteredArr);

    let filteredArrLen = filteredArr.length;

    let totalArrLength = studentArr.length;

    let limitIndex = 0;

    console.log("tbody length",tbody.children.namedItem)
    for(let i = 0; i < tbody.children.length; i++){
        if(tbody.children[i].getAttribute("id") === "next-row"){
            console.log(tbody.children[i]);
            limitIndex = i;
        }     
    }

    console.log(limitIndex);

    deleteAllRows(limitIndex);
    
    
    for(let i = 0; i < filteredArr.length; i++){

        addDataToTable(filteredArr[i])
    }
    
})





/*


 button.addEventListener("click", function(event){
        let inputName = nameEle.value.trim();
        let inputEmail = email.value.trim();
        let inputAge = age.value.trim();
        let inputGpa = gpa.value.trim();
        let inputDegree = degree.value.trim();

        let eachStudentData = {
            stuId: `${editableObj.stuId}`,
            stuName: `${inputName}`,
            stuEmail: `${inputEmail}`,
            stuAge: `${inputAge}`,
            stuGpa: `${inputGpa}`,
            stuDegree: `${inputDegree}`,
        
        };

      // changing object in array
        let prevObj = studentArr[id-1];
        prevObj.stuName = `${inputName}`;
        prevObj.stuEmail = `${inputEmail}`;
        prevObj.stuAge = `${inputAge}`;
        prevObj.stuGpa = `${inputGpa}`;
        prevObj.stuDegree = `${inputDegree}`;

        console.log("after edit " ,studentArr);

        let editableEle = document.getElementById(`${editableObj.stuId}`);
        console.log("editable ele", editableEle);

        // changing text in hmtl table
        editableEle.children[0].innerText = eachStudentData.stuId;
        editableEle.children[1].innerText = eachStudentData.stuName;
        editableEle.children[2].innerText = eachStudentData.stuEmail;
        editableEle.children[3].innerText = eachStudentData.stuAge;
        editableEle.children[4].innerText = eachStudentData.stuGpa;
        editableEle.children[5].children[0].innerText = eachStudentData.stuDegree;


        button.innerText = "Add Student"
        button.setAttribute("onclick", "addStudentData()");
        button.classList.remove("edit");
        span.innerText = "Enter";

        nameEle.value = "";
        email.value = "";
        age.value = "";
        gpa.value = "";
        degree.value = "";

    })

    */