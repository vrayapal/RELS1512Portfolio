document.addEventListener("DOMContentLoaded", function () {
  Papa.parse("events.csv", {
    download: true,
    header: true,
    complete: function(results) {
      const data = results.data;
      const timeline = document.getElementById("timeline-scroll");

      data.forEach((entry, index) => {
        const item = document.createElement("div");
        item.className = "timeline-item";
        item.innerHTML = `<strong>${entry.date}</strong><br>${entry.name}`;
        item.addEventListener("click", () => {
          document.getElementById("event-title").textContent = entry.name;
          document.getElementById("event-date").textContent = entry.date;
          document.getElementById("event-details").textContent = entry.detailed_description;
        });
        timeline.appendChild(item);
      });
    }
  });
});
