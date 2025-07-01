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

      const itemCount = timeline.children.length;
      const itemWidth = 150;
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

          // TODO: Add overview summary below
          // Replace or update this line with religion-specific content
          const summaries = {
            Christianity: "Christianity is a monotheistic religion centered on the life and teachings of Jesus Christ.",
            Islam: "Islam is a monotheistic faith revealed through the Prophet Muhammad, emphasizing submission to Allah.",
            Judaism: "Judaism is one of the oldest monotheistic religions, centered on the covenant between God and the people of Israel.",
            Buddhism: "Buddhism is a spiritual tradition that focuses on personal spiritual development and the attainment of deep insight into the true nature of life.",
            Hinduism: "Hinduism is a diverse and ancient religion with a wide range of beliefs and practices rooted in Indian traditions.",
            General: "These events relate to multiple or interfaith topics, addressing broad themes across various religious traditions."
          };

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
