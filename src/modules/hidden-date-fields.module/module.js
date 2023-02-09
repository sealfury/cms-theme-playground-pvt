var datesTable = document.querySelectorAll('table.upcoming__dates');
var datesRows = document.querySelectorAll('tr.upcoming__dates--occasion');

function removeOutdatedEvents(date) {
  // Convert date input (at time of page load/reload) to mS
  var todayUnformatted = date.getTime();

  datesRows.forEach(function (row) {
    // Get hubspot formatted event date and convert to mS
    var rowDate = row.getAttribute('data-start-date');
    var unformattedRowDate = new Date(rowDate).getTime();
    
    // Get difference between event date & today's date and convert to hours
    var dateDiff = todayUnformatted - unformattedRowDate;
    var dateDiffHours = dateDiff / (1 * 1000 * 60 * 60);

    // Remove events that have occurred or will occurr 2 hours in the future
    // To prevent possible last-minute registration attempts
    if (dateDiffHours >= -2) {
      row.remove();
    }
    if (dateDiffHours < -2) {
      return;
    }
  });
}

document.addEventListener('DOMContentLoaded', removeOutdatedEvents(new Date()));
