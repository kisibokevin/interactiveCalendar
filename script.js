document.addEventListener("DOMContentLoaded", function () {
    
    const monthYear = document.getElementById("month__year");
    const datesContainer = this.getElementById("dates");

    const now = new Date();
    let currentMonth = now.getMonth();
    let currentYear = now.getFullYear();



    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    function renderCalendar(month, year) {
        monthYear.textContent = `${months[month]} ${year}`;
        datesContainer.innerHTML = "";

        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();
        const lastDateOfLastMonth = new Date(year, month, 0).getDate();

        const today = new Date();
        const isCurrentMonth = month === today.getMonth() && year === today.getFullYear();
        const currentDate = today.getDate();

        // Display dates of the previous month
        for (let i = firstDay - 1; i >= 0; i--) {
            const emptyDate = document.createElement("div");
            emptyDate.className = 'date prev__month';
            emptyDate.textContent = lastDateOfLastMonth - i;
            datesContainer.appendChild(emptyDate);
        }

        // Display dates of the current month
        for (let date = 1; date <= lastDate; date++) {
            const dateElement = document.createElement("div");
            dateElement.className = 'date';
            dateElement.textContent = date;

            if (isCurrentMonth && date === currentDate) {
            dateElement.classList.add('date__today');
            }

            datesContainer.appendChild(dateElement);
            
        }

        // Display dates of the next month
        // Fill the rest of the calendar with days from the next month
        const totalDays = firstDay + lastDate;
        const nextMonthDays = 7 - (totalDays % 7);
        if (nextMonthDays < 7) {
            for (let date = 1; date <= nextMonthDays; date++) {
                const dateElement = document.createElement('div');
                dateElement.className = 'date next__month';
                dateElement.textContent = date;
                datesContainer.appendChild(dateElement);
            }
        }
    }

    // prev & next month buttons functionality
    const icons = document.querySelectorAll('.icons i');
    icons.forEach(icon => {
        icon.addEventListener('click', () => {
            currentMonth = icon.id === 'prev' ? currentMonth - 1 : currentMonth + 1;
            if (currentMonth < 0 || currentMonth > 11) {
                currentYear = icon.id === 'prev' ? currentYear - 1 : currentYear + 1;
                currentMonth = icon.id === 'prev' ? 11 : 0;
            }
            renderCalendar(currentMonth, currentYear);
        });
    });

    renderCalendar(currentMonth, currentYear);
});