// Select all <td> elements and filter the ones for earned grades
let earned = Array.from(document.getElementsByTagName("td")).filter((x, index) => index >= 6 && index % 4 == 2);
let bonus = Array.from(document.getElementsByClassName('cis1'))[0].textContent.slice(14)
// Select all <td> elements and filter the ones for possible grades
let possible = Array.from(document.getElementsByTagName("td")).filter((x, index) => index >= 7 && index % 4 == 3);

console.log(earned)
console.log(bonus)
console.log(possible)


// Get all <tr> elements
let trs = document.getElementsByTagName("tr");
console.log(trs)
// Iterate over each <tr> element
Array.from(trs).forEach((element, index) => {
    if (index > 1) {
        // Calculate and insert the percentage grade in a new cell
        element.insertCell(-1).innerText = Math.round((parseFloat(element.children[1].innerHTML.match('[0-9]*[.]*[0-9]*')) / parseFloat(element.children[2].innerHTML.match('[0-9]*[.]*[0-9]*')))*100) + "%";
    }
    if (index == 1) {
        // Insert the "Percent" heading in a new cell for the second row
        element.insertCell(-1).innerText = "Percent";
    }
})

// Get the first <table> element
let table = document.getElementsByTagName("table")[0];

// Insert a new row at the end of the table with specific styling
let row = table.insertRow(-1);
row.classList.add("cis1");
row.style = "background-color: palegoldenrod";

// Insert "Total" in the first cell of the new row
let total = row.insertCell(0);
total.innerText = "Total";

// Calculate the sum of earned values and insert it in the second cell
let earn = row.insertCell(1);
earnedvalue = earned.reduce((acc, current) => parseFloat(current.innerHTML.match('[0-9]*[.]*[0-9]*')) + acc, 0) + parseFloat(bonus);
earn.innerText = earnedvalue;

// Calculate the sum of possible values and insert it in the third cell
let poss = row.insertCell(2);
possiblevalue = possible.reduce((acc, current) => parseFloat(current.innerHTML.match('[0-9]*[.]*[0-9]*')) + acc, 0);
poss.innerText = possiblevalue;

// Calculate the final grade percentage
let finalGrade = (earnedvalue / possiblevalue) * 100;
let letter = '';

// Determine the letter grade based on the final grade percentage
if (finalGrade >= 97) {
    letter = 'A+';
}
else if (finalGrade >= 93) {
    letter = 'A';
}
else if (finalGrade >= 90) {
    letter = 'A-'
}
else if (finalGrade >= 87) {
    letter = 'B+'
}
else if (finalGrade >= 83) {
    letter = 'B'
}
else if (finalGrade >= 80) {
    letter = 'B-'
}
else if (finalGrade >= 77) {
    letter = 'C+'
}
else if (finalGrade >= 73) {
    letter = 'C'
}
else if (finalGrade >= 70) {
    letter = 'C-'
}
else if (finalGrade >= 67) {
    letter = 'D+'
}
else if (finalGrade >= 65) {
    letter = 'D'
}
else {
    letter = 'F'
}

// Insert the determined letter grade in the fourth cell
let grade = row.insertCell(3).innerText = letter;

// Insert the rounded final grade percentage in the fifth cell
let percent = row.insertCell(4);
percent.innerText = Math.round(finalGrade) + "%";
