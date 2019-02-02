// from data.js
let tableData = data;

// YOUR CODE HERE!
// get table references
let tbody = d3.select("tbody");

function buildTable(data) {
  // Clear existing data
  tbody.html("");

  data.forEach((dataRow) => {
    let row = tbody.append("tr");

    // Add value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let tcell = row.append("td");
        tcell.text(val);
      }
    );
  });
}

function handleClick() {

  // Prevent the form from refreshing the page
  d3.event.preventDefault();

  // Grab datetime value from the filter
  let datetime = d3.select("#datetime").property("value");
  let filteredData = tableData;

  // Check if a date was entered and filter data 
  if (datetime) {
    // Filter table data for matching values
    filteredData = filteredData.filter(row => row.datetime === datetime);
  }

  // Rebuild the table using the filtered data
  buildTable(filteredData);
}

// Attach an event to listen for the form button
d3.selectAll("#filter-btn").on("click", handleClick);

// Build the table when the page loads
buildTable(tableData);
