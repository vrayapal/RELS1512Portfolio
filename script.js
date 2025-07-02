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
    Filipino: "<p>The history of Filipino Americans begins with colonization. After Spain ceded the Philippines to the U.S. in 1898, Filipinos went from Spanish subjects to U.S. nationals. This allowed them to move to American territories, but without the full rights of citizenship. That's why the first wave of Filipino migrants ended up in Hawaii in 1906, working on sugar plantations. They were cheap, exploitable labor, and their ambiguous national status made them a loophole in an otherwise anti-Asian immigration system.</p><p>By the 1920s and '30s, anti-Filipino sentiment was rising. White workers resented their presence, and violence followed, like the Watsonville Riots of 1930, where mobs attacked Filipino men. Congress responded with the Tydings-McDuffie Act of 1934, which reclassified Filipinos as “aliens” and capped immigration to just 50 people per year. This put them more in line with other Asian countries and stripped them of U.S. national status.</p> <p>Still, Filipinos kept coming; they built communities here. One of the most powerful histories I found was in the Delano Grape Strike of 1965. Led by Larry Itliong and the Agricultural Workers Organizing Committee (AWOC), Filipino farmworkers demanded fair wages and decent conditions. They were the first to strike. When Itliong invited Cesar Chavez and the Mexican American NFWA to join the strike, it created the United Farm Workers (UFW). The UFW represented a rare and important cross-racial alliance in American labor history. Striking together, the grape growers couldn’t find enough labor to break the strike.</p><p>Filipino workers were often sidelined. Itliong resigned from the UFW in 1971, frustrated with the way Filipino interests were being addressed. Filipino Americans were central to one of the most important labor movements in the U.S., but were left out of the final narrative. That silence is being corrected through organizations like the Filipino American National Historical Society (FANHS) and through films like Delano Manongs. More recently, California formally recognized Larry Itliong Day in 2019.</p>",
    Makah: "<p>The Makah Nation is primarily known for their deep cultural and spiritual ties with the marine ecosystem and whaling in particular. They have lived on the northwestern tip of Washington State for thousands of years. In 1855, the Makah signed the Treaty of Neah Bay with the U.S. government. This Treaty protected the tribe’s right to hunt whales and marine mammals and ceded most of their original land. Regulatory restrictions and international conservation agreements have prevented them from exercising their rights.</p><p>A mudslide uncovered a Makah village at Ozette in 1970. The village was dated to be from 1475 and resulted in the uncovering of over 55,000 artifacts. The excavation provided insight into pre-contact life and became a point of pride and cultural renewal. The opening of the Makah Museum in 1979 was a celebration of that history and cultural continuity. To this day, many of the uncovered artifacts are housed there and accessible to the Makah community.</p><p>When the Makah exercised their treaty right to whale hunt in 1999, their first legal hunt in over 70 years, it sparked national controversy. More recently, in 2024, the federal government approved a waiver under the Marine Mammal Protection Act, allowing the Makah to resume limited whale hunting under strict quotas. The Makah have continued to support whale population monitoring and contribute to research that balances cultural survival with conservation. For the Makah, it wasn’t about sport or politics, but the right to live as their ancestors did.</p>",
    Yurok: "<p>Out of all the groups I researched, the Yurok’s dedication to conservation, environmental justice, and indigenous-led climate action stood out.</p><p>The Yurok people have lived along California’s Klamath River and coastline. They had a society rooted in river-based trade, ceremonial life, and intergenerational knowledge. In 1848, the Gold Rush brought westward expansion to their region. In a few short years, the Yurok lost about 90% of their land and many of their people were killed or displaced. The Yurok story is the story of US colonialism: broken treaties, boarding schools, and aggressive assimilation policies that pushed their language and cultural practices to near extinction.</p><p>By the early 1900s, the Yurok language was in steep decline. 2013 was marked by the passing of Archie Thompson, the last native first-language Yurok speaker. However, several programs worked with Thompson and other elders to create revitalization programs in tribal schools, which by 2020 had produced dozens of fluent second-language speakers. They also began reintroducing Yurok into local high school curricula, making it count towards California’s foreign language requirements.</p><p>In 2025, the Yurok regained 47,000 acres in the Blue Creek watershed. The land return gave the tribe more control over forest management, carbon offset programs, and salmon restoration projects. In fact, the Yurok are now seen as leaders in Indigenous-led climate solutions. They’ve reforested thousands of acres, reintroduced cultural burning practices, and worked alongside federal agencies to repair entire river ecosystems. In addition, the Yurok Nation raises funds through California’s carbon credit program.</p><p>The Yurok story isn’t one of nostalgia or loss—it’s of a generational project to protect their nature and the nature around them. Their work is rooted in ancestral knowledge, but it's designed to serve the world we live in now.</p>",
    LDS: "<p>In exploring the Church of Jesus Christ of Latter-day Saints (LDS Church), I tried to rely on documentable sources as many of their events are key tenets of their faith. It was fascinating to watch how a religious movement grew over two centuries into a global institution with millions of members.</p><p>The Church began when Joseph Smith claimed to receive visions from God and translated the Book of Mormon from golden plates uncovered to him by the angel Moroni. The Church was officially organized in 1830 and gained followers, but it also faced significant persecution. Smith and his followers moved west from New York to find religious freedom. In 1838, the conflict resulted in Governor Lilburn Boggs of Missouri issuing an official “Extermination Order” against Mormons. The violence was indicative of how the greater public saw the practices and beliefs of the Mormons, especially plural marriage. After Smith was murdered in 1844, Brigham Young led the church west, eventually settling in the Salt Lake Valley.</p><p>The Church built theocratic communities and practiced plural marriage. This was considered an open secret at the time, and many Americans were staunchly opposed to the concept. This brought them into conflict with the U.S. federal government, culminating in the Utah War (1857–1858). The Utah War was a military standoff where U.S. troops were sent to Utah to suppress what the government saw as a rebellious semi-theocratic territory. In the end, it was resolved without bloodshed, as Brigham Young stepped down as governor, allowing for a presidentially appointed governor to take control. It highlighted the deep mistrust between the Church and the federal government. Utah still maintains a significant Mormon population.</p><p>Since then, the church has continued to evolve. Polygamy was officially renounced in 1890, and Utah gained statehood in 1896. In 1978, it lifted the ban on Black men holding the priesthood, and in the 21st century, it has pushed for global growth, humanitarian aid, and institutional modernization. With a focus on missions and outreach, the church looks to actively build its congregation across the globe.</p>",
    Japanese: "<p>The history of Japanese Americans in the West made me confront one of the clearest examples of exclusion in U.S. history.</p><p>Japanese migration to Hawaii and the U.S. mainland began in the late 1800s. The Immigration Convention of 1886 formally protected Japanese laborers recruited to work on Hawaiian sugar plantations, and many came as contract workers. But as Japanese immigrants gained visibility, anti-Asian sentiment surged. Laws like California’s Alien Land Act of 1913 targeted them directly, banning 'aliens ineligible for citizenship' and preventing them from owning land. Land ownership being one of the most common forms of generational wealth, served to prevent their inclusion in society. The 1924 Immigration Act explicitly barred further Japanese immigration.</p><p>After the attack on Pearl Harbor in 1941, fear and racism exploded. On February 19, 1942, President Roosevelt signed Executive Order 9066, which authorized the forced removal and incarceration of over 120,000 Japanese Americans, two-thirds of whom were U.S. citizens. Families were given days to pack and sent to remote camps surrounded by barbed wire. It wasn’t just a gross violation of civil rights—it was a permanent rupture. Homes, businesses, and entire neighborhoods were lost in a matter of weeks. Japanese Americans weren't fully released from the camps until March 1946.</p><p>Many Japanese Americans didn’t talk about their experience for decades. But starting in the 1970s, a grassroots redress movement began to push back. Survivors testified in front of Congress, and after years of organizing, the U.S. government formally apologized and passed the Civil Liberties Act of 1988, granting financial reparations to surviving internees. Programs such as Densho look to preserve the experience and history of time by providing educational materials, conducting interviews, and acting as a voice for many who were in the camps.</p><p>Today, the legacy of Japanese American incarceration has become a cautionary tale, especially in conversations about immigration, citizenship, and national security. Their history reminds us that civil liberties are to be protected, and the line between “American” and “outsider” can shift dangerously fast in times of fear.</p>",
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
