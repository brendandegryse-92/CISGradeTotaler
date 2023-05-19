const courseDivs = document.querySelectorAll('.row.col-12 .col-md-2.col-sm-6.text-left a');
const courseGradeDivs = document.querySelectorAll('.row.col-12 .col-md-1.col-sm-6.text-center') // .filter((x,index) => index > 1)
const courseNames = Array.from(courseDivs).map((courseDiv) => courseDiv.textContent.slice(0, 5));
var courseGrades = Array.from(courseGradeDivs).map((courseGradeDiv) => courseGradeDiv.textContent.
replace(/[\t\n]/gm,'').slice(-2).replace(': ','NG')).filter((x,index) => index % 7 == 2 || index % 7 == 3 || index % 7 == 4 || index % 7 == 5);
var courses = [];

// Load both course data and GPA grades data using Promise.all()
Promise.all([
  fetch(chrome.runtime.getURL('course_data.json')).then(response => response.json()),
  fetch(chrome.runtime.getURL('gpa_grades.json')).then(response => response.json())
])
  .then(([courseData, gpaGradesData]) => {
    courseNames.forEach((courseName, index) => {
      // Retrieve the course hours from the loaded JSON data
      const courseHours = courseData[courseName];
      if (courseName.slice(0, 2) === "MD") {
        courses[index] = [courseName, 0, ...Array(courseGrades.splice(0, 4))[0]];
      } else if (courseHours) {
        courses[index] = [courseName, courseHours, ...Array(courseGrades.splice(0, 4))[0]];
      } else {
        console.error(`Course hours not found for ${courseName}`);
        courses[index] = [courseName, "0"];
      }
      for (i=5;i > 1;i--){
        if (courses[index][i] == "NG" && i == 2){
          courses[index].push("ND")
        } else if (courses[index][i] != "NG"){
          courses[index].push(gpaGradesData[courses[index][i]])
          break
        } else{
          continue
        }
      }
    });

    // Code after the data has been loaded
    console.log(courses);
    var APST = 0;
    var TQPA = 0; 
    var totalCH = 0;
    var totalACH = 0;
    var flag = false;
    for (let index = 0; index < courses.length; index++){
      if (courses[index][6] == "ND") {
        flag = true
      } else if (courses[index][0].slice(0,2) == "PE" || courses[index][0].slice(0,2) == "MD"|| courses[index][0].slice(0,2) == "MS"){
        TQPA = TQPA + (parseFloat(courses[index][1]) * parseFloat(courses[index][6]));
        totalCH = totalCH + parseFloat(courses[index][1]);
      } else {
        TQPA = TQPA + (parseFloat(courses[index][1]) * parseFloat(courses[index][6]));
        APST = APST + (parseFloat(courses[index][1]) * parseFloat(courses[index][6]));
        totalACH = totalACH + parseFloat(courses[index][1]);
        totalCH = totalCH + parseFloat(courses[index][1]);
      }
    }
    APST = (APST / totalACH).toFixed(2);
    TQPA = (TQPA / totalCH).toFixed(2);
    console.log(APST);
    console.log(TQPA);
    // Display it
    var newRow1 = document.createElement('div');
    newRow1.className = 'row col-12 bg-success col-md-3 col-sm-6 text-left';
    newRow1.innerHTML = `APST (Academic GPA): ${APST}`;
    var newRow2 = document.createElement('div');
    newRow2.className = 'row col-12 bg-success col-md-3 col-sm-6 text-left';
    newRow2.innerHTML = `TQPA (Overall GPA): ${TQPA}`;
    // Find the second-to-last row
    var rows = document.getElementsByClassName('row');
    var thirdToLastRow = rows[rows.length - 3];
    thirdToLastRow.parentNode.insertBefore(newRow2, thirdToLastRow.nextSibling);
    var rows = document.getElementsByClassName('row');
    var thirdToLastRow = rows[rows.length - 3];
    thirdToLastRow.parentNode.insertBefore(newRow1, thirdToLastRow.nextSibling);

  })
  .catch(error => {
    console.error('Error loading course data:', error);
  });


