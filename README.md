 <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Indian Holidays Calendar</title>
  <style>
    * {
      box-sizing: border-box;
      font-family: 'Poppins', sans-serif;
      margin: 0;
      padding: 0;
    }

    body {
      background: #e9f0f7;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .container {
      display: flex;
      width: 850px;
      height: 500px;
      background: white;
      border-radius: 15px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    }

    .events-panel {
      width: 30%;
      background-color: #f5f5f5;
      padding: 20px;
      border-right: 1px solid #ddd;
      overflow-y: auto;
    }

    .events-panel h3 {
      margin-bottom: 15px;
      color: #333;
    }

    .event-item {
      padding: 10px;
      margin-bottom: 10px;
      background-color: #d4edda;
      border-left: 5px solid green;
      border-radius: 5px;
    }

    .calendar {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      background-color: #007bff;
      color: white;
    }

    .calendar-header button {
      background: white;
      color: #007bff;
      border: none;
      padding: 6px 12px;
      border-radius: 6px;
      font-weight: bold;
      cursor: pointer;
    }

    .days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      padding: 10px;
      text-align: center;
      background-color: #f1f1f1;
      font-weight: bold;
    }

    .dates {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      padding: 10px;
      gap: 5px;
      flex-grow: 1;
      overflow-y: auto;
    }

    .date {
      padding: 15px;
      border-radius: 10px;
      background-color: white;
      cursor: pointer;
    }

    .today {
      background-color: #007bff;
      color: white;
    }

    .holiday {
      background-color: #d4edda !important;
      border-left: 5px solid green;
      font-weight: bold;
    }

    .weekend {
      background-color: #ffe6e6;
    }

    .selected {
      outline: 3px solid #007bff;
    }
  </style>
</head>
<body>
  <div class="container">
    
    <div class="events-panel">
      <h3>Events</h3>
      <div id="eventList">
        <p>Select a date to see events</p>
      </div>
    </div>


    <div class="calendar">
      <div class="calendar-header">
        <button onclick="prevMonth()">&#8592;</button>
        <h2 id="monthYear"></h2>
        <button onclick="nextMonth()">&#8594;</button>
      </div>
      <div class="days">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div class="dates" id="calendarDates"></div>
    </div>
  </div>

  <script>
    const monthYear = document.getElementById("monthYear");
    const calendarDates = document.getElementById("calendarDates");
    const eventList = document.getElementById("eventList");

    let date = new Date();
    let selectedCell = null;

    const events = {
      "2025-01-01": ["🎉 New Year"],
      "2025-01-14": ["🪁 Sankranthi"],
      "2025-01-26": ["🇮🇳 Republic Day"],
      "2025-03-01": ["🛕 Maha Shivratri"],
      "2025-08-15": ["🇮🇳 Independence Day"],
      "2025-08-19": ["🧵 Raksha Bandhan"],
      "2025-10-12": ["🎆 Dasara"],
      "2025-10-29": ["🪔 Diwali"],
      "2025-12-25": ["🎄 Christmas"]
    };

    function isFourthSaturday(dateObj) {
      const day = dateObj.getDate();
      const dayOfWeek = dateObj.getDay();
      if (dayOfWeek !== 6) return false;

      const firstDay = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1).getDay();
      const saturdaysBefore = Math.floor((day + firstDay - 1) / 7);
      return saturdaysBefore === 3;
    }

    function renderCalendar() {
      const year = date.getFullYear();
      const month = date.getMonth();

      const firstDay = new Date(year, month, 1).getDay();
      const lastDate = new Date(year, month + 1, 0).getDate();
      const today = new Date();

      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

      monthYear.textContent = `${monthNames[month]} ${year}`;
      calendarDates.innerHTML = "";

      for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement("div");
        calendarDates.appendChild(emptyCell);
      }

      for (let day = 1; day <= lastDate; day++) {
        const cell = document.createElement("div");
        cell.className = "date";
        cell.textContent = day;

        const current = new Date(year, month, day);
        const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

        if (
          today.getDate() === day &&
          today.getMonth() === month &&
          today.getFullYear() === year
        ) {
          cell.classList.add("today");
        }

        if (current.getDay() === 0 || isFourthSaturday(current)) {
          cell.classList.add("holiday");
        }

        if (events[key]) {
          cell.classList.add("holiday");
        }

        cell.addEventListener("click", () => {
          if (selectedCell) selectedCell.classList.remove("selected");
          cell.classList.add("selected");
          selectedCell = cell;
          showEvents(key);
        });

        calendarDates.appendChild(cell);
      }
    }

    function showEvents(key) {
      eventList.innerHTML = "";
      if (events[key]) {
        events[key].forEach(e => {
          const item = document.createElement("div");
          item.className = "event-item";
          item.textContent = e;
          eventList.appendChild(item);
        });
      } else {
        eventList.innerHTML = "<p>No events on this day.</p>";
      }
    }

    function prevMonth() {
      date.setMonth(date.getMonth() - 1);
      selectedCell = null;
      renderCalendar();
      eventList.innerHTML = "<p>Select a date to see events</p>";
    }

    function nextMonth() {
      date.setMonth(date.getMonth() + 1);
      selectedCell = null;
      renderCalendar();
      eventList.innerHTML = "<p>Select a date to see events</p>";
    }

    renderCalendar();
  </script>
</body>
</html>
