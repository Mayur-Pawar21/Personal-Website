/* ==========================================================================
   Data.js  -  ALL OF YOUR CONTENT LIVES HERE
   --------------------------------------------------------------------------
   You never have to touch the layout code to add a new post, show, game or
   song. Copy one of the { ... }, blocks, paste it below the last one, and
   change the words. Watch the commas and quotation marks.

   Everything marked SAMPLE is fake content so the site doesn't look empty.
   Replace it with your own.
   ========================================================================== */


/* ---------- About you ---------- */
const SITE = {
  name: "Mayur Pawar",                              // EDIT: shows in the header, hero and tab title
  tagline: "Part-time overthinker, full-time snack enthusiast.", // EDIT: one line under your name
  email: "mayurpawar29.04@gmail.com",                       // EDIT: used by the "Copy my email" button
  timezone: "Asia/Kolkata"                                    // OPTIONAL: e.g. "America/New_York" or "Asia/Tokyo".
                                                  // Fill it in and the home page shows your local time.
};


/* ---------- Contact links (home page, "Find me" section) ---------- */
const CONTACTS = [
  { label: "Email",     text: "Mayur@gmail.com",  url: "mailto:mayurpawar29.04@gmail.com" },   // EDIT
  { label: "GitHub",    text: "Mayur-Pawar21",     url: "https://github.com" },      // EDIT
];


/* ---------- "Right now" strip on the home page ---------- */
const NOW = [
  { label: "Watching",  value: "Inception (again)" },  // EDIT
  { label: "Playing",   value: "Watch Dogs: 2" },                       // EDIT
  { label: "Listening", value: "Seedhe Maut" },                // EDIT
  { label: "Reading",   value: "Nothing, honestly" }                    // EDIT
];


/* ---------- Blog posts (Blog.html) ----------
   date:  YYYY-MM-DD
   tags:  any words you like, the filter buttons are made from them
   body:  each "..." is one paragraph
   image: optional. Paste an image link between the quotes, or leave "" for none */
const POSTS = [
  {
    title: "Website Update",                // SAMPLE
    date: "2026-09-12",
    tags: ["life", "meta"],
    image: "",                                        // PLACEHOLDER: image link for this post (optional)
    body: [
      "I have been making this site for quite a while now; left it for some day's, don't know it i will ever deploy it singing-out..."
    ]
  },
  {
    title: "Met some new people",            // SAMPLE
    date: "2026-09-18",
    tags: ["life"],
    image: "",
    body: [
      "Today I met this really cool guy who is super into rockets and is actually starting his own club, and honestly, I'm just so excited to hang out with him more and learn what he's all about.",
      "Later on, I ran into a girl and finally spotted someone I actually recognized, and it felt like such a huge relief to see a familiar face in the crowd."
    ]
  },
  {
    title: "College started",       // SAMPLE
    date: "2026-09-15",
    tags: ["life"],
    image: "",
    body: [
      "Today was the first day of the college felt normal can't describe the feeling. Also saw a classmate not sure if he is a student there. "
    ]
  }
];


/* ---------- Favourite shows (Shows.html) ----------
   status: "watching" | "finished" | "planned"
   rating: 1 to 5
   cover:  PLACEHOLDER: paste a poster image link, or leave "" and the site draws a coloured block */
const SHOWS = [
  { title: "Grave of FireFlies", genre: "Anime", status: "finished", rating: 5, note: "Perfect from start to finish.", cover: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.VHBVkOw8dNVrQM5WcDoAlAHaK-%3Fr%3D0%26pid%3DApi&f=1&ipt=0b40881242a71125c7105b5c2a48c23ffb35152cbdc6f432806ffb5c8107f34a&ipo=images" },   // SAMPLE
  { title: "Breaking Bad",                genre: "Drama",     status: "Planed", rating: 5, note: "Slow burn, huge payoff.",       cover: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.2tId6LqwWDYy74V0J2l6ZgHaLH%3Fr%3D0%26pid%3DApi&f=1&ipt=0cc0d792430dd34b2ef3b1d89a8b2920b3aa6bea30825261378588953b3727d1&ipo=images" },
  { title: "Interstellar",          genre: "Si-Fi",    status: "finished", rating: 5, note: "My background-noise show.",     cover: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.uiaj_IMaC7h3NoieAhcmVwHaLG%3Fr%3D0%26pid%3DApi&f=1&ipt=e86f91644dce854665652189fde316334d40ac4aed6f0b5a38f355a0f14ae4cf&ipo=images" },
  { title: "JJK: Jujutsu Kaisen",             genre: "Anime",     status: "finished", rating: 4, note: "Do not read spoilers.",         cover: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FM%2FMV5BMjBlNTExMDAtMWZjZi00MDc5LWFkMjgtZDU0ZWQ5ODk3YWY5XkEyXkFqcGc%40._V1_FMjpg_UX1000_.jpg&f=1&nofb=1&ipt=83799c0565803abf148f08ee917745dfb8ca9f53544bd17e84f15dd29f9d5422" },
  { title: "Stranger Things",             genre: "Sci-fi",    status: "planned",  rating: 3, note: "Still on the list.",            cover: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.yF97o7bQ9plTEOFzkJhhVQHaHa%3Fr%3D0%26pid%3DApi&f=1&ipt=299b40c151fc7c79c354288eb72de0867e07837dc9acfa7c3f458ddee938f59a&ipo=images" },
  { title: "The Office",                  genre: "Comedy",    status: "watching", rating: 4, note: "Good for bing watching.",     cover: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.1KSWRBovLO-N-7iULiriNAHaLH%3Fr%3D0%26pid%3DApi&f=1&ipt=41527e45e74ea7209a7a1b5ce1525145a2f451fd5d239c4abad99351495f0fe8&ipo=images" }
];


/* ---------- Favourite games (Games.html) ----------
   status: "playing" | "finished" | "backlog"
   hours:  rough hours played (the little bar is drawn from this)
   cover:  PLACEHOLDER: paste a cover image link, or leave "" */
const GAMES = [
  { title: "Stardew Valley",         platform: "PC",     hours: 51, status: "playing",  note: "One more day turns into forty.", cover: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.3Rd634UZN3CBne_tNkpS_gAAAA%3Fr%3D0%26pid%3DApi&f=1&ipt=914fec6f40b523000fd986cfb5431d83a5add2e9252ee6c996ef585b3a6aea69&ipo=images" },   // SAMPLE
  { title: "Hollow Knight",          platform: "PC",     hours: 5,  status: "playing", note: "Hard, beautiful, worth it.",     cover: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.BnFhrXY4LC_JgLFbhiS6ygHaKX%3Fr%3D0%26pid%3DApi&f=1&ipt=01f016e0d00014d9ec233f73d25028759c00e48ac24b923f55ebb3ea51810ce0&ipo=images" },
  { title: "RDR",                platform: "PC", hours: 37,  status: "finished", note: "Kind about difficulty.",         cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTccZFjJlDAfzniHWJ_OAwpQWKD4gu9GH16_do9DyQQJA&s=10" },
  { title: "Minecraft",              platform: "PC",     hours: 500, status: "playing",  note: "Always a world open somewhere.", cover: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.d-4aIbAq6_vPMqA1kAd-ngHaKr%3Fr%3D0%26pid%3DApi&f=1&ipt=d214cf61841e9bd3a2f424f909e47e78fa4585fba834eb4670ce94fb79314fd3&ipo=images" },
  { title: "Mafia: Definitive Edition",     platform: "PC", hours: 20, status: "finished", note: "State Of Art",           cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7GMr3HTM-dyctc68ToJ_bNONvTi-vIt3hX3Cge5EsxQ&s=10" },
  { title: "GTA V",          platform: "PC",     hours: 0,   status: "backlog",  note: "Everyone says start it.",        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-RVwNdFhU2nj-vEmlOjVp2trflPy5MaTu8Uys9z_CHg&s" }
];


/* ---------- Music playlist (Music.html) ----------
   link:  PLACEHOLDER: paste a Spotify / YouTube / Apple Music link for the song, or leave ""
   cover: PLACEHOLDER: album art image link, or leave "" */
const TRACKS = [
  { title: "Bure Din", artist: "Seedhe Maut",        mood: "celebrating life's ups and downs", link: "https://open.spotify.com/track/7xLQMDfhDx7dbShZ3tjoCX?autoplay_ok=1", cover: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.TbAow2ZNNYWfjGiClHiVSgHaHa%3Fpid%3DApi&f=1&ipt=31442a6531a742b0077ee27de860ff820233edb39473d02a0308d122a5d24594&ipo=images" },   // SAMPLE
  { title: "Yahan koi nahi",             artist: "Punit Singh",               mood: "It's just me",     link: "https://open.spotify.com/track/51uEHUBV7YCrdNZoWRVJPc?autoplay_ok=1", cover: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.np1XYsR3uF37vi0EswGoHQHaHa%3Fr%3D0%26pid%3DApi&f=1&ipt=ec45a066ee85247f4a7ddcb78f61947c0e0d197b6bde458a1e46e1ee911c86b3&ipo=images" },
  { title: "Maharani",            artist: "Arpit Bala",   mood: "Fun and Romantic  ",    link: "https://open.spotify.com/track/7CVw4gVPpH1TPQttQGVmhZ?autoplay_ok=1", cover: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.nEU3HeHqF0JVb8QHcVAkpgHaHa%3Fr%3D0%26pid%3DApi&f=1&ipt=8c7ff3fa91838cf60ce4b397d7b6028714d85c17bf80d98a70611563d013424f&ipo=images" },
  { title: "Ik Kudi",             artist: "Arpit Bala",      mood: "Romantic",   link: "https://open.spotify.com/track/7mTaeqTfEbbFpeG2JqQlkf?autoplay_ok=1", cover: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.AIVRal7aGriD-YBM42SeHQHaHa%3Fr%3D0%26pid%3DApi&f=1&ipt=916a9c9ec1203381ac5b17be394f17e19cf9c2c3e787131f0a04dc94b7e3c1d1&ipo=images" },
  { title: "Wish to die",         artist: "Arya",       mood: "Take This When You Are Down",     link: "https://open.spotify.com/track/3nDSk0ENb2EFol0Jk4fEm4?autoplay_ok=1", cover: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.scdn.co%2Fimage%2Fab67616d0000b273aac0be3cc8a8e7c620e9e766&f=1&nofb=1&ipt=207f43880aec992326f78a4de12e70babd71951d97db2583cdeb944a7613b872" },
  
];

/* PLACEHOLDER: full playlist player (Music.html, bottom).
   Spotify: open your playlist > ... > Share > Embed playlist > copy ONLY the src link
   from the code it gives you (it looks like https://open.spotify.com/embed/playlist/xxxx).
   Leave "" to show a placeholder box. */
const PLAYLIST_EMBED = "https://open.spotify.com/embed/playlist/7EcbqT52a9AHWIJdK28TMn?utm_source=generator&si=d0684bc12ead4400";
