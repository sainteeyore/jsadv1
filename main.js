const btn1 = document.getElementById("btn1"); // Insert Button
const btn2 = document.getElementById("btn2"); // Clear Button
const btn3 = document.getElementById("btn3"); // Clear Items Button
const btn4 = document.getElementById("btn4"); // Get Total Button
const btn5 = document.getElementById("btn5"); // Identify Highest and Lowest Button
const selectEl = document.getElementById('choices'); // Sort Options Dropdown
const tbl = document.getElementById("tblNumbers"); // Table for Displaying Numbers

let numbersArr = []; // Array to store numbers
let total = 0; // Total of all numbers

// Insert a new number
function insertNumber() {
    const txtNumber = document.getElementById("txtNum").value; // Get input value
    let num;
    let regex = /^[0-9]+$/; // Regex to check for positive numbers

    // If input is a valid positive number, add it to the array
    if (txtNumber.match(regex)) {
        num = parseInt(txtNumber); // Convert the string input to an integer
        numbersArr.push(num); // Add the number to the array
        console.log(numbersArr);
        document.getElementById("txtNum").value = ""; // Clear the input field
        iterateNumbers(); // Re-render the table with updated numbers
    } else {
        alert("Please input a positive number.");
        document.getElementById("txtNum").value = ""; // Clear the input if invalid
    }
}

// Event listener for the "Insert" button
btn1.addEventListener("click", () => {
    insertNumber(); // Call the insert number function
});

// Allow inserting the number by pressing Enter in the input field
document.getElementById("txtNum").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        insertNumber(); // Trigger the insert number function on Enter key press
    }
});

// Clear the input field
btn2.addEventListener("click", () => {
    document.getElementById("txtNum").value = ""; // Clear input field
});

// Function to delete a number from the array
function deleteNumber(i) {
    numbersArr.splice(i, 1); // Remove the number at index 'i'
    iterateNumbers(); // Re-render the table with updated numbers
    console.log(numbersArr);
}

// Function to calculate and return the highest number
function highestNum() {
    let highest = 0;
    for (let i = 0; i < numbersArr.length; i++) {
        if (numbersArr[i] > highest) {
            highest = numbersArr[i]; // Update highest number
        }
    }
    return highest;
}

// Function to calculate and return the lowest number
function lowestNum() {
    let lowest = numbersArr[0];
    for (let i = 0; i < numbersArr.length; i++) {
        if (numbersArr[i] < lowest) {
            lowest = numbersArr[i]; // Update lowest number
        }
    }
    return lowest;
}

// Function to edit a number in the array
function editNumber(i) {
    // Prompt user to enter a new value
    const newNumber = prompt("Edit number", numbersArr[i]);

    if (newNumber !== null && newNumber !== "") {
        const regex = /^[0-9]+$/; // Regex to check for valid positive number values

        // Check if the input is a valid positive number
        if (newNumber.match(regex)) {
            numbersArr[i] = parseInt(newNumber); // Update the number at index 'i'
            iterateNumbers(); // Re-render the table with updated numbers
            console.log(numbersArr);
        } else {
            alert("Please enter a valid positive number.");
        }
    } else {
        alert("You must enter a value.");
    }
}

// Function to re-render the table with updated numbers
function iterateNumbers() {
    // Clear the table before re-rendering
    while (tbl.hasChildNodes()) {
        tbl.removeChild(tbl.firstChild);
    }

    if (numbersArr.length > 0) {
        total = 0; // Reset total
        for (let i = 0; i < numbersArr.length; i++) {
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td"); // For Delete Button
            const td4 = document.createElement("td"); // For Edit Button
            const btnDelete = document.createElement("button");
            const btnEdit = document.createElement("button");

            td1.style.width = "70px";
            td1.innerHTML = numbersArr[i]; // Display the number

            td2.style.width = "70px";
            if (numbersArr[i] % 2 == 0) {
                td2.style.color = "green";
                td2.innerHTML = "EVEN";
            } else {
                td2.style.color = "blue";
                td2.innerHTML = "ODD";
            }

            // Create and add delete button
            btnDelete.setAttribute("onclick", `deleteNumber(${i})`); // Set delete button click
            btnDelete.innerHTML = "Remove";

            // Create and add edit button
            btnEdit.setAttribute("onclick", `editNumber(${i})`); // Set edit button click
            btnEdit.innerHTML = "Edit";

            td3.appendChild(btnDelete);
            td4.appendChild(btnEdit);

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);

            tbl.appendChild(tr);

            total += numbersArr[i]; // Add the number to the total
        }

        // Show the buttons when there are numbers
        document.getElementById("btn3").style.display = "inline";
        document.getElementById("btn4").style.display = "inline";
        document.getElementById("btn5").style.display = "inline";
        document.getElementById("choices").style.display = "inline";
    } else {
        total = 0; // Reset total when no numbers are present
        document.getElementById("btn4").style.display = "none"; // Hide buttons if no numbers
    }
}

// Event listener for the "Clear Items" button
btn3.addEventListener("click", () => {
    numbersArr = []; // Clear the numbers array
    iterateNumbers(); // Re-render the table
});

// Event listener for the "Get Total" button
btn4.addEventListener("click", () => {
    const trTotal = document.createElement("tr");
    const tdTotalLabel = document.createElement("td");
    const tdTotalValue = document.createElement("td");

    trTotal.style.height = "30px";
    tdTotalLabel.style.fontWeight = "bold";
    tdTotalLabel.innerHTML = "TOTAL";
    tdTotalValue.style.textDecoration = "underline";
    tdTotalValue.innerHTML = total;

    trTotal.appendChild(tdTotalLabel);
    trTotal.appendChild(tdTotalValue);
    tbl.appendChild(trTotal);
});

// Event listener for the "Identify Highest and Lowest Number" button
btn5.addEventListener("click", () => {
    const trHigh = document.createElement("tr");
    const tdHighLabel = document.createElement("td");
    const tdHighValue = document.createElement("td");
    const trLow = document.createElement("tr");
    const tdLowLabel = document.createElement("td");
    const tdLowValue = document.createElement("td");

    const valHigh = highestNum();
    const valLow = lowestNum();

    trHigh.style.height = "30px";
    trLow.style.height = "30px";

    tdHighLabel.style.fontWeight = "bold";
    tdHighLabel.innerHTML = "HIGHEST";
    tdLowLabel.style.fontWeight = "bold";
    tdLowLabel.innerHTML = "LOWEST";

    tdHighValue.style.textDecoration = "underline";
    tdHighValue.innerHTML = valHigh;
    tdLowValue.style.textDecoration = "underline";
    tdLowValue.innerHTML = valLow;

    trHigh.appendChild(tdHighLabel);
    trHigh.appendChild(tdHighValue);
    trLow.appendChild(tdLowLabel);
    trLow.appendChild(tdLowValue);
    tbl.appendChild(trHigh);
    tbl.appendChild(trLow);
});

// Event listener for the "Sort Ascending/Descending" dropdown
selectEl.addEventListener("change", function () {
    if (this.value == "Ascending") {
        numbersArr.sort((a, b) => a - b); // Sort in ascending order
        iterateNumbers(); // Re-render the table
    } else if (this.value == "Descending") {
        numbersArr.sort((a, b) => b - a); // Sort in descending order
        iterateNumbers(); // Re-render the table
    }
});
