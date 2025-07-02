// script.js

document.addEventListener("DOMContentLoaded", function () {
  const timelineContainer = document.getElementById("timeline-container");
  const timeline = document.querySelector(".timeline");
  const filterContainer = document.getElementById("filters");
  const filteredList = document.getElementById("filtered-list");
  const overviewSection = document.getElementById("religion-overview");
  const eventTitle = document.getElementById("event-title");
  const eventDate = document.getElementById("event-date");
  const eventDetails = document.getElementById("event-details");

  // Enable horizontal scroll with vertical wheel movement
  timelineContainer.addEventListener("wheel", function(e) {
    if (e.deltaY !== 0) {
      e.preventDefault();
      timelineContainer.scrollLeft += e.deltaY;
    }
  }, { passive: false });

  const summaries = {
    Filipino: "",
    Makah: "",
    Yurok: "",
    LDS: "",
    General: "These events relate to multiple or interfaith topics across various religious traditions in the West Pacific region. A timeline of all events is located at the top of the page. Selecting one will display more information about the event. To explore the history of a particular group, click on the filter by religion. This will display all the events related to that religion. An overview of that group will also appear at the bottom of the screen. This project is the culmination of my research and work in RELS1512. It sis not meant to be an overarching history of religion of the West Pacific United states, but rather e a culmination of what i have learned this semester."
  };


  // Show general summary on page load
  overviewSection.innerHTML = `
    <h2>Religion Overview</h2>
    <p><strong>General</strong>: ${summaries.General}</p>
  `;

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

        // Default color for all timeline items
        item.style.backgroundColor = "#86BBD8";
        item.style.color = "#000";

        // Hover effect
        item.addEventListener("mouseenter", () => {
          if (!item.classList.contains("selected")) {
            item.style.backgroundColor = "#336699";
            item.style.color = "#fff";
          }
        });
        item.addEventListener("mouseleave", () => {
          if (!item.classList.contains("selected")) {
            item.style.backgroundColor = "#86BBD8";
            item.style.color = "#000";
          }
        });

        item.addEventListener("click", () => {
          document.querySelectorAll(".timeline-item").forEach(el => {
            el.classList.remove("selected");
            el.style.backgroundColor = "#86BBD8";
            el.style.color = "#000";
          });
          item.classList.add("selected");
          item.style.backgroundColor = "#336699";
          item.style.color = "#fff";

          eventTitle.textContent = entry.name;
          eventDate.textContent = entry.date;
          eventDetails.innerHTML = entry.detailed_description || entry.short_description || "No details available.";
        });

        timeline.appendChild(item);
        timelineItems.push({ element: item, entry });
        if (entry.religion) religions.add(entry.religion);
      });

      const itemCount = timeline.children.length;
      const itemWidth = 250;
      timeline.style.minWidth = `${itemCount * itemWidth}px`;

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

          const summary = summaries[religion] || "No overview available for this religion.";
          overviewSection.innerHTML = `
            <h2>Religion Overview</h2>
            <p><strong>${religion}</strong>: ${summary}</p>
          `;
        });
        filterContainer.appendChild(button);
      });
    }
  });
});
