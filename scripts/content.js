let earned = Array.from(document.getElementsByTagName("td")).filter((x, index) => index >= 6 && index % 4 == 2);
let possible = Array.from(document.getElementsByTagName("td")).filter((x, index) => index >= 7 && index % 4 == 3);

let trs = document.getElementsByTagName("tr");
Array.from(trs).forEach((element, index) => {
        if (index > 1) {
            element.insertCell(-1).innerText = Math.round((parseFloat(element.children[1].innerHTML.match('[0-9]*[.]*[0-9]*')) / parseFloat(element.children[2].innerHTML.match('[0-9]*[.]*[0-9]*')))*100) + "%";
        }
        if (index == 1) {
            element.insertCell(-1).innerText = "Percent";
        }
    })

let table = document.getElementsByTagName("table")[0];
let row = table.insertRow(-1);
row.classList.add("cis1");
row.style = "background-color: palegoldenrod";

let total = row.insertCell(0);
total.innerText = "Total";

let earn = row.insertCell(1);
earnedvalue = earned.reduce((acc, current) => parseFloat(current.innerHTML.match('[0-9]*[.]*[0-9]*')) + acc, 0);
earn.innerText = earnedvalue;

let poss = row.insertCell(2);
possiblevalue = possible.reduce((acc, current) => parseFloat(current.innerHTML.match('[0-9]*[.]*[0-9]*')) + acc, 0);
poss.innerText = possiblevalue;

let finalGrade = (earnedvalue / possiblevalue) * 100;
let letter = '';

if (finalGrade >= 97) {
    letter = 'A+';
}
else if (finalGrade >= 93) {
    letter = 'A'
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

let grade = row.insertCell(3).innerText = letter;

let percent = row.insertCell(4);
percent.innerText = Math.round(finalGrade) + "%";