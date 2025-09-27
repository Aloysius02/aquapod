const navLinks = [
    {
        id: "welcome",
        label: "Welcome",
        link: "#welcome"
    },
    {
        id: "introduction",
        label: "Introduction",
        link: "#introduction"
    },
    {
        id: "discover",
        label: "Discover",
        link: "#discover"
    },
    {
        id: "why-aquapod",
        label: "Why Aquapod®",
        link: "#why-aquapod"
    },
    {
        id: "activity",
        label: "Activities",
        link: "#activity"
    },
    {
        id: "feedback",
        label: "Feedback",
        link: "#feedback"
    }
];

const Aquapods = [
    {
        id: "classic",
        title: "Classic Aquapod®",
        src: "images/classic.jpg",
        description:
            "A minimalist haven for 2, with plush seating and panoramic ocean views through glass. Ideal for quiet reflection amid gentle waves.",
        detail: [
            { "Bed type": "Queen size" },
            { "Air conditioning": "Available" },
            { "Wi-Fi": "High Speed" },
            { "Smart lighting": "Voice-controlled" },
            { Deck: "None" }
        ],
        price: "1,500"
    },
    {
        id: "deck",
        src: "images/deck.jpg",
        title: "Deck Aquapod®",
        description:
            "Mid-tier retreat for 2-4, featuring a private deck for sunset lounging and smart amenities. Perfect for tranquil stargazing.",
        detail: [
            { "Bed type": "Queen + Twin" },
            { "Air conditioning": "Available" },
            { "Plunge pool": "Available" },
            { "Artificial reef": "Pod-integrated" },
            { "Snorkel gear": "Included" }
        ],
        price: "2,200"
    },
    {
        id: "reef",
        title: "Reef Aquapod®",
        src: "images/reef2.jpg",
        description:
            "Premium pod for 4, with snorkeling entry and underwater cameras for marine views. Unforgettable ocean connections await.",
        detail: [
            { "Bed type": "Two Queens" },
            { "Air conditioning": "Available" },
            { "Plunge pool": "Available" },
            { Deck: "Integrated reef access with cameras" },
            { "Wi-Fi": "High-speed" }
        ],
        price: "3,000"
    }
];

const whyAquapodData = [
    {
        id: 1,
        title: "Enjoy the Endless Ocean View Through Panoramic Windows",
        description: "Through the wide panoramic ocean windows",
        src: "images/why-card1.jpg"
    },
    {
        id: 2,
        title: "Sound of Serenity on the Water Away From City Rush",
        description: "Out of the city rush with complete water privacy",
        src: "images/why2.png"
    },
    {
        id: 3,
        title: "Relax Yourself in Solar-Heated Plunge Pool Bliss",
        description:
            "In—solar-heated plunge pool Let gentle waves and bubbles transport you to pure bliss.",
        src: "images/why4.jpg"
    }
];

const Activities = [
    {
        id: 1,
        difficulty: "Easy",
        percentage: "40%",
        duration: "2-3h",
        title: "Paddleboard Yoga on Calm Waters",
        description:
            "Float into mindfulness with guided yoga on a stable paddleboard, surrounded by gentle ocean swells and sunrise views.",
        src: "images/activity1.jpg"
    },
    {
        id: 2,
        difficulty: "Medium",
        percentage: "60%",
        duration: "4-8h",
        title: "Guided Sunset Kayaking Adventure",
        description:
            "Paddle through tranquil bays as the sun dips below the horizon, spotting marine life and enjoying the rhythmic waves.",
        src: "images/activity2.jpg"
    },
    {
        id: 2,
        difficulty: "Hard",
        percentage: "80%",
        duration: "8-12h",
        title: "Night Snorkel in Glowing Reefs",
        description:
            "Dive into a magical world of glowing plankton and coral, with expert guides for a safe, enchanting underwater journey.",
        src: "images/activity3.jpg"
    }
];

const testimony = [
    {
        id: 1,
        quote: "AquaPods® was the perfect ocean hideaway – stylish, peaceful, and fully surrounded by stunning views day and night,with the gentle sound of waves lulling me into a deep relaxation.",
        name: "Jason Whitaker",
        location: "San Francisco, California",
        src: "images/avatar1.jpg"
    },
    {
        id: 2,
        quote: "The bioluminescent snorkel from the Reef A® pod was magical – the glowing waters and marine life made me feel truly connected to the sea.",
        name: "Sophia M.",
        location: "Cape Town, South Africa",
        src: "images/avatar2.jpg"
    },
    {
        id: 3,
        quote: "Floating in the solar-heated plunge pool at dusk was pure bliss – the gentle waves and starry sky above created an unforgettable sense of tranquility and renewal.",
        name: "Liam K.",
        location: "Sydney, Australia",
        src: "images/avatar3.jpg"
    }
];

export { navLinks, Aquapods, whyAquapodData, Activities, testimony };
