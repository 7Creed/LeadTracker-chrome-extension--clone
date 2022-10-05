
/**
 * Project 2
 * Building a Chrome Extension
 * Lead Tracker
 */

//1. Add button and input tag in the HTML

// let inputBtn = document.querySelector('#input-btn');

// function saveLead() {
//     console.log("Button clicked from onclick attribute")
// }
//the upper (onclick() event) can be replaced with the below (addEventListener)
//for cleaner or separation of concerns and you don't have to bother the html with this method

//2. addEventListener
const inputBtn = document.querySelector('#input-btn');
let myLeads = [];
const inputEl = document.getElementById('input-el');
const ulEl = document.getElementById('ul-el');
const deleteBtn = document.getElementById('delete-btn');

// localStorage.setItem("myLeads", "www.example.com")
// console.log(localStorage.getItem("myLeads"))
// localStorage.clear()

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
console.log(leadsFromLocalStorage)

const tabBtn = document.getElementById('tab-btn')

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

tabBtn.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

function render(Leads) {
    let listItems = " ";
    for (i = 0; i < Leads.length; i++) {
        // ulEl.innerHTML += "<li>" + Leads[i] + "</li>";
        //psuedo code for the above
        //1st create an element
        //2nd set text content
        //3rd append/add to ul
    
        // const list = document.createElement('li');
        // list.textContent = Leads[i];
        // ulEl.append(list)
    
        // listItems += "<li><a target='_blank' href='" + Leads[i] +"'>" + Leads[i] + "</a></li>";
        // console.log(listItems)
        //use template strings
        listItems +=
        `<li>
            <a target='_blank' href='${Leads[i]}'>${Leads[i]}
            </a>
        </li>
        `
    }
    ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener('dblclick', function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})


inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value);
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    inputEl.value = "";
    // myLeads.push("www.awesomelead.com");
    console.log(myLeads)
    // console.log("Button clicked from addEventListener")
})



//3. create the myLeads array and inputEl to be able to save our input variables. line 535 and 536

//4. push the value from the input field to myLead array. line 539

//5. use a for loop to log out/rendering out leads on the page
//a. create an unordered list where we are to render the list out. call out in line 537
//b. line 552

//6. create a vairable, listItems line 554, that should hold all the HTML for the list items. Assign to an empty string to begin with
//7. add add the items to the listItems variable instead of the ulEl.innerHTML line 563.
//8. render the listItems (which now contains all the HTML you need), inside of the unordered list using inner HTML line 567.
//9. set the input to be empty after save 
//10. make our list clickable by adding the <a> tag
