// script.js

document.addEventListener("DOMContentLoaded", function () {
  const timelineContainer = document.getElementById("timeline-container");
  const timeline = document.querySelector(".timeline");
  const filterContainer = document.getElementById("filters");
  const filteredList = document.getElementById("filtered-list");
  const overviewSection = document.getElementById("religion-overview");

  // Enable horizontal scroll with vertical wheel movement
  timelineContainer.addEventListener("wheel", function(e) {
    if (e.deltaY !== 0) {
      e.preventDefault();
      timelineContainer.scrollLeft += e.deltaY;
    }
  }, { passive: false });

  Papa.parse("events.csv", {
    download: true,
    header: true,
    complete: function(results) {
      const data = results.data;
      const religions = new Set();
      const timelineItems = [];

      data.forEach(entry => {
        if (!entry.date || !entry.name) return;

        const year = new Date(entry.date).getFullYear();
        const item = document.createElement("div");
        item.className = "timeline-item";
        item.dataset.year = year;
        item.dataset.religion = entry.religion;
        item.innerHTML = `<div>${entry.date}</div><div>${entry.name}</div>`;

        // Assign color directly if necessary
        const fallbackColors = {
          2019: "#9EE493",
          2020: "#DAF7DC",
          2022: "#336699",
          2024: "#86BBD8",
          2025: "#FFB347",
          2026: "#F67280"
        };

        if (fallbackColors[year]) {
          item.style.backgroundColor = fallbackColors[year];
          item.style.color = year === 2025 || year === 2026 ? "#fff" : "#000";
        }

        item.addEventListener("click", () => {
          document.getElementById("event-title").textContent = entry.name;
          document.getElementById("event-date").textContent = entry.date;
          document.getElementById("event-details").innerHTML = entry.detailed_description || entry.short_description || "No details available.";
        });

        timeline.appendChild(item);
        timelineItems.push({ element: item, entry });
        if (entry.religion) religions.add(entry.religion);
      });

      // Set dynamic width for the timeline line
      const itemCount = timeline.children.length;
      const itemWidth = 225;
      timeline.style.minWidth = `${itemCount * itemWidth}px`;

      // Create buttons for each religion
      religions.forEach(religion => {
        const button = document.createElement("button");
        button.textContent = religion;
        button.addEventListener("click", () => {
          filteredList.innerHTML = `<h3>${religion} Events</h3>`;
          timelineItems.forEach(({ element, entry }) => {
            if (entry.religion === religion) {
              const entryBtn = document.createElement("button");
              entryBtn.textContent = `${entry.date}: ${entry.name}`;
              entryBtn.addEventListener("click", () => {
                element.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                element.click();
              });
              filteredList.appendChild(entryBtn);
            }
          });
        });
        filterContainer.appendChild(button);
      });
    }
  });
});
