
const hikes = [
    {
        name: "Bechler Falls",
        stub: "bechler_falls",
        distance: "3 miles",
        tags: ["Caves", "Yellowstone", "Waterfall"],
        difficulty: 1,
        description: "Beautiful short hike in Yellowstone along the Bechler river to Bechler Falls",
        directions: "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to the end of the Cave Falls road. There is a parking area at the trailhead.",
        trailhead: [44.14457, -110.99781]
    },
    {
        name: "Teton Canyon",
        stub: "teton_canyon",
        distance: "3 miles",
        tags: ["Canyon", "Tetons"],
        difficulty: 1,
        description: "Beautiful short (or long) hike through Teton Canyon.",
        directions: "Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Staline Road for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead.",
        trailhead: [43.75567, -110.91521]
    },
    {
        name: "Denanda Falls",
        stub: "denanda_falls",
        distance: "7 miles",
        tags: ["Caves", "Yellowstone", "Waterfall"],
        difficulty: 3,
        description: "Beautiful hike through Bechler meadows to Denanda Falls",
        directions: "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead.",
        trailhead: [44.14974, -111.04564]
    },
    {
        name: "Coffee Pot Rapids",
        stub: "coffee_pot",
        distance: "2.2 miles",
        tags: ["Rafting"],
        difficulty: 1,
        description: "Beautiful hike along the Henry's Fork of the Snake River to a set of rapids.",
        directions: "Take Highway 20 north to Island Park. Continue almost to Mack's Inn. From Highway 20, turn west on Flatrock Road for 1 mile then turn off on Coffee Pot Road and travel one-half mile to the campground entrance road. There is a parking lot right outside the campground.",
        trailhead: [44.49035, -111.36619]
    },
    {
        name: "Menan Butte",
        stub: "menan_butte",
        distance: "3.4 miles",
        tags: ["Volcanic", "View"],
        difficulty: 2,
        description: "A steep climb to one of the largest volcanic tuff cones in the world. 3.4 miles is the full loop around the crater, can be shortened.",
        directions: "Take Highway 33 West out of Rexburg for about 8 miles. Turn left onto E Butte Road, then right onto Twin Butte Road after about a mile. Follow that road for about 3 miles. You will see the parking lot/trailhead on the left.",
        trailhead: [43.78555, -111.98996]
    }
];


// Select HTML elements
const hikeContainer = document.querySelector("#hike-container");
const input = document.querySelector("#search");
const button = document.querySelector("#search-button");


// Search for hikes
function search() {
    const hikeQuery = input.value.toLowerCase().trim();

    // Filter hikes by name, description, and tags
    let filteredHikes = hikes.filter(function(hike) {
        return (
            hike.name.toLowerCase().includes(hikeQuery) ||
            hike.description.toLowerCase().includes(hikeQuery) ||
            hike.tags.find(tag =>
                tag.toLowerCase().includes(hikeQuery)
            )
        );
    });

    // Sort matching hikes by distance
    function compareHikes(a, b) {
        return parseFloat(a.distance) - parseFloat(b.distance);
    }

    let sortedHikes = filteredHikes.sort(compareHikes);

    // Display search results
    renderHikes(sortedHikes);
}


// Create HTML for hike tags
function tagTemplate(tags) {
    return tags.map((tag) =>
        `<button type="button">${tag}</button>`
    ).join(" ");
}


// Create HTML for difficulty rating
function difficultyTemplate(rating) {
    let html = `<span
        class="rating"
        role="img"
        aria-label="Difficulty: ${rating} out of 5">
        Difficulty: `;

    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            html += `<span aria-hidden="true">🥾</span>`;
        } else {
            html += `<span aria-hidden="true">▫️</span>`;
        }
    }

    html += `</span>`;

    return html;
}


// Create HTML for an individual hike
function hikesTemplate(hike) {
    return `
        <div class="hike-card">

            <div class="hike-content">
                <h2>${hike.name}</h2>

                <div class="hike-tags">
                    ${tagTemplate(hike.tags)}
                </div>

                <p>${hike.description}</p>

                <p>Distance: ${hike.distance}</p>

                <p>${difficultyTemplate(hike.difficulty)}</p>
            </div>
        </div>
    `;
}


// Display hikes on the page
function renderHikes(hikesToRender) {
    if (hikesToRender.length === 0) {
        hikeContainer.innerHTML = "<p>No matching hikes found.</p>";
        return;
    }

    hikeContainer.innerHTML = hikesToRender
        .map(hikesTemplate)
        .join("");
}


// Display a random hike when the page loads
function init() {
    const randomNum = Math.floor(Math.random() * hikes.length);

    renderHikes([hikes[randomNum]]);
}


// Search button event listener
button.addEventListener("click", search);


// Allow searching by pressing Enter
input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        search();
    }
});


// Initialize the application
init();
