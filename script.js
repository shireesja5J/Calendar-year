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
