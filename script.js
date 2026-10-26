/* =========================================================
   MATH ADVENTURE - GRADE 3 WEEKLY CURRICULUM VERSION

   Flow:
   Login
   -> Home
   -> Term
   -> Week
   -> Topic Presentation
   -> Activity Level
   -> 10 Activities
   -> Result
   -> Progress

   NEW:
   Topic Presentation is now a teacher-ready
   PowerPoint-style lesson presentation.
========================================================= */

let studentName = "";
let selectedTerm = "";
let selectedWeek = 0;
let selectedLevel = "";

let currentQuestion = 1;
let score = 0;
let answeredQuestions = 0;

let currentActivity = null;
let selectedChoice = null;
let answered = false;

let soundEnabled = true;
let musicEnabled = true;

let audioContext = null;
let musicTimer = null;
let deferredInstallPrompt = null;

/* =========================================================
   PPT PRESENTATION VARIABLES
========================================================= */

let presentationSlide = 0;
let presentationSlides = [];

/* =========================================================
   CURRICULUM
========================================================= */

const curriculum = {

"First Term": {

  1:{
    area:"Measurement and Geometry",
    title:"Area Using Square-Tile Units",
    points:[
      "Find the area of simple figures using square-tile units.",
      "Count equal-sized square units that cover a region.",
      "Use square units to describe area.",
      "Compare the areas of simple figures."
    ]
  },

  2:{
    area:"Measurement and Geometry",
    title:"Area, Points, Lines, Line Segments, and Rays",
    points:[
      "Find area using square units.",
      "Identify a point as an exact location.",
      "Identify lines, line segments, and rays.",
      "Describe the number of endpoints of a line segment and a ray."
    ]
  },

  3:{
    area:"Measurement and Geometry",
    title:"Parallel, Intersecting, and Perpendicular Lines",
    points:[
      "Identify parallel lines.",
      "Identify intersecting lines.",
      "Identify perpendicular lines that meet at right angles.",
      "Measure line segments using appropriate tools."
    ]
  },

  4:{
    area:"Number and Algebra",
    title:"Numbers up to 10,000: Models and Numerals",
    points:[
      "Represent numbers up to 10,000 using models.",
      "Read place-value representations and write numerals.",
      "Write numbers in expanded form.",
      "Compose numbers from thousands, hundreds, tens, and ones."
    ]
  },

  5:{
    area:"Number and Algebra",
    title:"Reading and Writing Numbers up to 10,000",
    points:[
      "Read numbers up to 10,000 in words.",
      "Write numbers up to 10,000 in words.",
      "Match word forms with numerals.",
      "Use place value to read numbers correctly."
    ]
  },

  6:{
    area:"Number and Algebra",
    title:"Ordinal Numbers up to the 100th",
    points:[
      "Identify ordinal numbers up to the 100th.",
      "Read and write ordinal numbers.",
      "Use ordinal numbers to describe position.",
      "Determine the position before or after a given ordinal number."
    ]
  },

  7:{
    area:"Number and Algebra",
    title:"Place Value and Value of Digits",
    points:[
      "Identify the place of a digit in a 4-digit number.",
      "Determine the value of a digit.",
      "Distinguish place from value.",
      "Use thousands, hundreds, tens, and ones places."
    ]
  },

  8:{
    area:"Number and Algebra",
    title:"Place Value Practice",
    points:[
      "Identify the place of digits in numbers up to 10,000.",
      "Determine the value of selected digits.",
      "Read numbers using place-value understanding.",
      "Apply place value to solve simple situations."
    ]
  },

  9:{
    area:"Number and Algebra",
    title:"Rounding and Comparing Numbers",
    points:[
      "Round numbers to the nearest ten or hundred.",
      "Compare numbers using <, >, and =.",
      "Identify greater and smaller numbers.",
      "Apply rounding and comparison in simple situations."
    ]
  },

  10:{
    area:"Number and Algebra",
    title:"Ordering Numbers up to 10,000",
    points:[
      "Arrange numbers from smallest to largest.",
      "Arrange numbers from largest to smallest.",
      "Identify the greatest and least numbers.",
      "Use place value to determine the correct order."
    ]
  }

},

"Second Term": {

  1:{
    area:"Measurement and Geometry",
    title:"Measuring, Estimating, and Comparing Mass",
    points:[
      "Measure mass in grams (g), kilograms (kg), and milligrams (mg).",
      "Use appropriate measuring tools such as a balance scale.",
      "Estimate the mass of objects using g, kg, and mg.",
      "Compare the masses of two or more objects."
    ]
  },

  2:{
    area:"Measurement and Geometry",
    title:"Capacity: Liters and Milliliters",
    points:[
      "Measure capacity using liters (L) and milliliters (mL).",
      "Estimate the capacity of containers.",
      "Use appropriate measuring tools for liquid capacity.",
      "Compare the capacities of two containers."
    ]
  },

  3:{
    area:"Number and Algebra",
    title:"Money and Addition up to 10,000",
    points:[
      "Read and write money in words and using Philippine currency symbols (₱ and PhP).",
      "Use the centavo sign when needed.",
      "Add numbers with sums up to 10,000 with and without regrouping.",
      "Apply addition to money situations."
    ]
  },

  4:{
    area:"Number and Algebra",
    title:"Estimating Sums and Addition Problems",
    points:[
      "Estimate the sum of addends with up to 4 digits.",
      "Round numbers to estimate a reasonable sum.",
      "Solve addition problems with sums up to 10,000.",
      "Apply addition to real-life situations, including money."
    ]
  },

  5:{
    area:"Number and Algebra",
    title:"Subtraction of Numbers Less Than 10,000",
    points:[
      "Subtract numbers where both numbers are less than 10,000.",
      "Subtract with and without regrouping.",
      "Check whether an answer is reasonable.",
      "Apply subtraction to simple real-life situations."
    ]
  },

  6:{
    area:"Number and Algebra",
    title:"Estimating Differences and Multi-Step Operations",
    points:[
      "Estimate the difference of two numbers up to 4 digits.",
      "Round numbers before estimating a difference.",
      "Perform addition and subtraction of 3 to 4 numbers up to 2 digits.",
      "Observe the correct order of operations in number sentences."
    ]
  },

  7:{
    area:"Number and Algebra",
    title:"Addition and Subtraction Problem Solving",
    points:[
      "Solve problems involving addition and subtraction.",
      "Work with 3 to 4 numbers of up to 2 digits.",
      "Solve money-related addition and subtraction problems.",
      "Choose the correct operation from the situation."
    ]
  },

  8:{
    area:"Number and Algebra / Data and Probability",
    title:"Mixed Addition, Subtraction, and Data Collection",
    points:[
      "Solve mixed addition and subtraction problems.",
      "Use addition and subtraction in money situations.",
      "Collect data from simple experiments such as rolling a die or tossing a coin.",
      "Record experimental outcomes in an organized way."
    ]
  },

  9:{
    area:"Data and Probability",
    title:"Tables and Single Bar Graphs",
    points:[
      "Present data in tables.",
      "Present data using horizontal and vertical single bar graphs.",
      "Read labels, categories, and values in a graph.",
      "Compare data shown in tables and bar graphs."
    ]
  },

  10:{
    area:"Data and Probability",
    title:"Solving Problems from Graphs and Describing Outcomes",
    points:[
      "Solve problems using data presented in a single bar graph.",
      "Describe and compare outcomes from real-life situations.",
      "Use equally likely, less likely, least likely, more likely, most likely, certain, and impossible.",
      "Use evidence from data when making comparisons."
    ]
  }

},

"Third Term": {

  1:{
    area:"Number and Algebra",
    title:"Multiplication Using the 6, 7, 8, and 9 Tables",
    points:[
      "Multiply numbers using the 6, 7, 8, and 9 multiplication tables.",
      "Recall multiplication facts accurately.",
      "Use multiplication in simple equal-group situations.",
      "Connect repeated addition with multiplication."
    ]
  },

  2:{
    area:"Number and Algebra",
    title:"Properties of Multiplication",
    points:[
      "One multiplied by any number is the number.",
      "Zero multiplied by any number is zero.",
      "Changing the order of factors does not change the product.",
      "Changing grouping does not change the product, and multiplication distributes over addition."
    ]
  },

  3:{
    area:"Number and Algebra",
    title:"Multiplication With and Without Regrouping and Estimation",
    points:[
      "Multiply 2- to 3-digit numbers by a 1-digit number.",
      "Multiply larger numbers by a number with one non-zero leading digit when appropriate.",
      "Multiply with and without regrouping.",
      "Estimate products by rounding factors to multiples of 10."
    ]
  },

  4:{
    area:"Number and Algebra",
    title:"Multiplication Problems and Number Patterns",
    points:[
      "Solve 1- to 2-step multiplication problems.",
      "Apply multiplication to money situations.",
      "Determine missing terms in repeating, increasing, and decreasing patterns.",
      "Generate patterns from a given rule."
    ]
  },

  5:{
    area:"Number and Algebra",
    title:"Division as Equal Jumps and the Inverse of Multiplication",
    points:[
      "Illustrate division through equal jumps on a number line.",
      "Understand division as the inverse of multiplication.",
      "Use equal groups to explain division.",
      "Connect multiplication facts to related division facts."
    ]
  },

  6:{
    area:"Number and Algebra",
    title:"Division Using the 6, 7, 8, and 9 Tables",
    points:[
      "Divide numbers using the 6, 7, 8, and 9 multiplication tables.",
      "Find missing numbers in multiplication or division sentences.",
      "Use fact families to check division.",
      "Solve simple division situations."
    ]
  },

  7:{
    area:"Number and Algebra",
    title:"Division With and Without Remainder",
    points:[
      "Divide 2- to 3-digit numbers by a 1-digit number without a remainder.",
      "Divide 2-digit numbers by a 1-digit number with a remainder.",
      "Divide by 10, 100, and 1000.",
      "Interpret remainders in simple situations."
    ]
  },

  8:{
    area:"Number and Algebra",
    title:"Estimating Quotients and Similar Fractions",
    points:[
      "Estimate quotients using multiples of 10 or 100.",
      "Solve division problems involving 2- to 3-digit numbers by a 1-digit number.",
      "Represent fractions equal to one and greater than one using models.",
      "Add and subtract similar fractions."
    ]
  },

  9:{
    area:"Measurement and Geometry",
    title:"Translation and Fractions",
    points:[
      "Describe and draw the effect of a two-direction multi-step slide or translation.",
      "Move basic shapes and figures left, right, up, or down.",
      "Continue work with similar fractions from the previous week.",
      "Describe the resulting position after a translation."
    ]
  },

  10:{
    area:"Measurement and Geometry",
    title:"Line Symmetry",
    points:[
      "Identify shapes or figures that show line symmetry.",
      "Draw the line of symmetry.",
      "Complete a figure so it is symmetric with respect to a line.",
      "Recognize symmetry in familiar shapes and objects."
    ]
  }

}

};

/* =========================================================
   BASIC HELPERS
========================================================= */

function $(id){
  return document.getElementById(id);
}

function escapeHTML(value){
  return String(value)
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#039;");
}

function showPage(id){

  document
    .querySelectorAll(".page")
    .forEach(page=>{
      page.classList.remove("active");
    });

  const page = $(id);

  if(page){
    page.classList.add("active");

    window.scrollTo({
      top:0,
      behavior:"smooth"
    });
  }

}

/* =========================================================
   STARTUP
========================================================= */

window.addEventListener(
  "DOMContentLoaded",
  ()=>{

    const saved =
      localStorage.getItem(
        "mathAdventureStudentName"
      );

    if(saved){

      studentName = saved;

      const input =
        $("studentName");

      if(input){
        input.value = saved;
      }

    }

    const savedSound =
      localStorage.getItem(
        "mathAdventureSound"
      );

    if(savedSound !== null){
      soundEnabled =
        savedSound === "true";
    }

    const savedMusic =
      localStorage.getItem(
        "mathAdventureMusic"
      );

    if(savedMusic !== null){
      musicEnabled =
        savedMusic === "true";
    }

    updateSoundButtons();

    setupInstallPrompt();

    setupKeyboardControls();

    $("musicToggle")
      ?.addEventListener(
        "click",
        toggleMusic
      );

    $("soundToggle")
      ?.addEventListener(
        "click",
        toggleSound
      );

  }
);

/* =========================================================
   LOGIN
========================================================= */

function login(){

  const input =
    $("studentName");

  const name =
    input.value.trim();

  if(!name){

    showFeedback(
      "PLEASE ENTER YOUR NAME",
      false
    );

    speak(
      "Please enter your name."
    );

    playWrongSound();

    input.focus();

    return;
  }

  studentName = name;

  localStorage.setItem(
    "mathAdventureStudentName",
    studentName
  );

  $("welcomeName").textContent =
    studentName;

  initializeAudio();

  playCorrectSound();

  startMusic();

  showPage("homePage");

}

function changePlayer(){

  studentName = "";

  localStorage.removeItem(
    "mathAdventureStudentName"
  );

  $("studentName").value = "";

  showPage("loginPage");

  setTimeout(
    ()=>{
      $("studentName").focus();
    },
    100
  );

}

/* =========================================================
   TERM AND WEEK
========================================================= */

function selectTerm(term){

  selectedTerm = term;

  $("termTitle").textContent =
    term.toUpperCase() +
    " — WEEKLY TOPICS";

  renderWeeks();

  showPage("weekPage");

  playClickSound();

}

function renderWeeks(){

  const container =
    $("weekContainer");

  container.innerHTML = "";

  for(let w=1;w<=10;w++){

    const d =
      curriculum[selectedTerm][w];

    const classes=[
      "addition",
      "subtraction",
      "multiplication",
      "division"
    ];

    const card =
      document.createElement("div");

    card.className =
      "operation " +
      classes[(w-1)%4];

    card.innerHTML = `

      <div class="operation-image">

        <div class="fallback-icon">
          ${
            w<=4
              ? "📘"
              : w<=7
                ? "🧮"
                : w<=9
                  ? "📊"
                  : "⭐"
          }
        </div>

      </div>

      <h2>
        Week ${w}
      </h2>

      <p>
        ${escapeHTML(d.title)}
      </p>

      <button
        type="button"
        onclick="openWeek(${w})"
      >
        📖 VIEW TOPIC
      </button>

    `;

    container.appendChild(card);

  }

}

/* =========================================================
   TEACHER-READY PPT PRESENTATION
========================================================= */

function explainLessonPoint(
  point,
  title
){

  const p =
    point.toLowerCase();

  if(p.includes("area")){

    return {

      icon:"📐",

      heading:
        "Understanding Area",

      body:
        "Area tells us how much space is covered by a flat shape. We can find area by counting equal square units or by multiplying the number of rows by the number of squares in each row.",

      example:
        "Example: 3 rows × 4 squares = 12 square units."

    };

  }

  if(
    p.includes("point") &&
    p.includes("line")
  ){

    return {

      icon:"📏",

      heading:
        "Points and Lines",

      body:
        "A point shows an exact location. A line goes endlessly in both directions, a line segment has two endpoints, and a ray has one endpoint and continues in one direction.",

      example:
        "Remember: segment = 2 endpoints; ray = 1 endpoint; line = no endpoints."

    };

  }

  if(
    p.includes("parallel")
  ){

    return {

      icon:"📏",

      heading:
        "Types of Lines",

      body:
        "Parallel lines stay the same distance apart and do not meet. Intersecting lines cross. Perpendicular lines intersect to form a right angle.",

      example:
        "The opposite sides of a rectangle are parallel. The corner of a book shows perpendicular lines."

    };

  }

  if(
    p.includes("number") &&
    p.includes("10,000")
  ){

    return {

      icon:"🔢",

      heading:
        "Numbers up to 10,000",

      body:
        "Four-digit numbers are made from thousands, hundreds, tens, and ones. We can show a number using models, numerals, words, or expanded form.",

      example:
        "3,482 = 3,000 + 400 + 80 + 2."

    };

  }

  if(
    p.includes("ordinal")
  ){

    return {

      icon:"🏅",

      heading:
        "Ordinal Numbers",

      body:
        "Ordinal numbers tell the position or order of something. Examples include 1st, 2nd, 3rd, 10th, 50th, and 100th.",

      example:
        "If Ana is 7th in line, her position is the 7th place."

    };

  }

  if(
    p.includes("place") &&
    p.includes("value")
  ){

    return {

      icon:"🔢",

      heading:
        "Place Value and Value",

      body:
        "Place tells where a digit is located. Value tells how much that digit represents in that place.",

      example:
        "In 4,582, the 5 is in the hundreds place and its value is 500."

    };

  }

  if(
    p.includes("round")
  ){

    return {

      icon:"🎯",

      heading:
        "Rounding Numbers",

      body:
        "To round to the nearest ten or hundred, look at the digit immediately to the right. A digit 5 or more means round up; 4 or less means keep the digit.",

      example:
        "47 rounded to the nearest ten is 50. 342 rounded to the nearest hundred is 300."

    };

  }

  if(
    p.includes("compare")
  ){

    return {

      icon:"⚖️",

      heading:
        "Comparing Numbers",

      body:
        "Compare digits from the greatest place value first. Use > for greater than, < for less than, and = for equal.",

      example:
        "4,500 > 4,050 because the hundreds digit is greater."

    };

  }

  if(
    p.includes("order")
  ){

    return {

      icon:"🔢",

      heading:
        "Ordering Numbers",

      body:
        "Smallest to largest is ascending order. Largest to smallest is descending order. Use place value to decide the order.",

      example:
        "245, 310, 402 is smallest to largest."

    };

  }

  if(
    p.includes("mass")
  ){

    return {

      icon:"⚖️",

      heading:
        "Measuring Mass",

      body:
        "Mass tells how heavy an object is. Common units include milligrams, grams, and kilograms. Choose the unit that fits the object.",

      example:
        "A pencil may be measured in grams, while a sack of rice is better measured in kilograms."

    };

  }

  if(
    p.includes("capacity")
  ){

    return {

      icon:"🥤",

      heading:
        "Capacity",

      body:
        "Capacity tells how much liquid a container can hold. Liters are used for larger amounts and milliliters for smaller amounts.",

      example:
        "A water bottle may hold 1 L, while a small medicine cup may hold 10 mL."

    };

  }

  if(
    p.includes("money")
  ){

    return {

      icon:"💰",

      heading:
        "Money and Philippine Currency",

      body:
        "Use the peso sign ₱ when writing Philippine money. Add or subtract amounts carefully by lining up the place values.",

      example:
        "₱125 + ₱75 = ₱200."

    };

  }

  if(
    p.includes("addition")
  ){

    return {

      icon:"➕",

      heading:
        "Addition",

      body:
        "Addition combines quantities to find a total. Line up ones, tens, hundreds, and thousands before adding.",

      example:
        "1,245 + 2,310 = 3,555."

    };

  }

  if(
    p.includes("subtraction")
  ){

    return {

      icon:"➖",

      heading:
        "Subtraction",

      body:
        "Subtraction finds how much is left or the difference between numbers. Regroup when a top digit is too small.",

      example:
        "500 − 275 = 225."

    };

  }

  if(
    p.includes("estimate")
  ){

    return {

      icon:"🎯",

      heading:
        "Estimating",

      body:
        "Estimation gives a quick reasonable answer. Round numbers first, then perform the operation.",

      example:
        "398 + 201 is about 400 + 200 = 600."

    };

  }

  if(
    p.includes("graph") ||
    p.includes("data")
  ){

    return {

      icon:"📊",

      heading:
        "Reading Data",

      body:
        "A table organizes information. A bar graph uses bars to show how much or how many. Read the labels and compare the values.",

      example:
        "If the apple bar reaches 8 and the banana bar reaches 5, apples are greater by 3."

    };

  }

  if(
    p.includes("likely") ||
    p.includes("probability") ||
    p.includes("outcome")
  ){

    return {

      icon:"🎲",

      heading:
        "Describing Outcomes",

      body:
        "Some events are certain, some are impossible, and some are more or less likely. Use the evidence from the situation or data.",

      example:
        "When rolling a regular die, getting a 7 is impossible; getting a number from 1 to 6 is certain."

    };

  }

  if(
    p.includes("multiplication")
  ){

    return {

      icon:"✖️",

      heading:
        "Multiplication",

      body:
        "Multiplication is a quick way to represent equal groups or repeated addition. Learn the facts for 6, 7, 8, and 9 and use them to solve problems.",

      example:
        "7 groups of 6 = 7 × 6 = 42."

    };

  }

  if(
    p.includes("properties")
  ){

    return {

      icon:"🧩",

      heading:
        "Properties of Multiplication",

      body:
        "Useful properties help us solve multiplication. Multiplying by 1 keeps a number the same, while multiplying by 0 gives zero. Factors can also be reordered.",

      example:
        "8 × 1 = 8, 8 × 0 = 0, and 3 × 4 = 4 × 3."

    };

  }

  if(
    p.includes("pattern")
  ){

    return {

      icon:"🔁",

      heading:
        "Number Patterns",

      body:
        "A pattern follows a rule. Find what changes from one term to the next, then use the rule to continue the pattern.",

      example:
        "6, 12, 18, 24 follows the rule “add 6.”"

    };

  }

  if(
    p.includes("division")
  ){

    return {

      icon:"➗",

      heading:
        "Division",

      body:
        "Division separates a quantity into equal groups. It is the inverse of multiplication, so multiplication facts can help us divide.",

      example:
        "42 ÷ 6 = 7 because 6 × 7 = 42."

    };

  }

  if(
    p.includes("remainder")
  ){

    return {

      icon:"➗",

      heading:
        "Division with Remainder",

      body:
        "Sometimes a number cannot be divided equally. The amount left over is called the remainder.",

      example:
        "14 ÷ 4 = 3 remainder 2."

    };

  }

  if(
    p.includes("fraction")
  ){

    return {

      icon:"🍕",

      heading:
        "Fractions",

      body:
        "A fraction names equal parts of a whole. The numerator tells how many parts are considered, while the denominator tells how many equal parts make the whole.",

      example:
        "3/4 means 3 of 4 equal parts."

    };

  }

  if(
    p.includes("translation") ||
    p.includes("slide")
  ){

    return {

      icon:"➡️",

      heading:
        "Translation",

      body:
        "A translation moves a shape without turning or changing its size. The shape can slide left, right, up, or down.",

      example:
        "Move a triangle 2 squares right: every point moves 2 squares right."

    };

  }

  if(
    p.includes("symmetry")
  ){

    return {

      icon:"🦋",

      heading:
        "Line Symmetry",

      body:
        "A figure has line symmetry when one half matches the other half after folding along a line. That line is called the line of symmetry.",

      example:
        "A butterfly has a vertical line of symmetry."

    };

  }

  return {

    icon:"🧮",

    heading:"Let’s Learn",

    body:
      point +
      " Let us look at the idea carefully, identify the important parts, and use an example to understand it.",

    example:
      "Try the idea using a simple number, shape, or real-life situation."

  };

}

/* =========================================================
   BUILD PPT SLIDES
========================================================= */

function buildPresentation(d){

  const slides=[

    {
      icon:"📖",

      tag:"LESSON PRESENTATION",

      title:d.title,

      body:
        `Welcome to this Grade 3 Mathematics lesson in ${d.area}. Read each slide carefully before starting the activity.`,

      example:
        "Teacher tip: Think about the examples and try to explain the idea in your own words."
    },

    {
      icon:"🎯",

      tag:"LEARNING OBJECTIVES",

      title:"What will I learn?",

      body:
        "After this lesson, you should be able to:",

      bullets:d.points
    }

  ];

  d.points.forEach(
    (point,i)=>{

      const x =
        explainLessonPoint(
          point,
          d.title
        );

      slides.push({

        icon:x.icon,

        tag:
          `LESSON PART ${i+1}`,

        title:x.heading,

        body:x.body,

        example:x.example

      });

    }
  );

  slides.push({

    icon:"🧠",

    tag:"GUIDED PRACTICE",

    title:"Let’s Think Together!",

    body:
      `Use what you learned about “${d.title}”. Read the important ideas again, then try a simple example before moving to the activity.`,

    bullets:
      d.points.slice(0,3),

    example:
      "Ask yourself: What do I know? What operation, rule, unit, shape, or strategy should I use?"

  });

  slides.push({

    icon:"⭐",

    tag:"REMEMBER",

    title:"Important Things to Remember",

    body:
      "Keep these ideas in mind when answering the activities:",

    bullets:
      d.points,

    example:
      "Read the question carefully. Choose the strategy that matches the lesson. Check your answer before submitting."

  });

  slides.push({

    icon:"🚀",

    tag:"READY?",

    title:"You are Ready for the Activity!",

    body:
      `You have finished the lesson presentation for Week ${selectedWeek}: ${d.title}. Choose an activity level and answer 10 questions to practice what you learned.`,

    example:
      "Start with Beginner if you want more basic practice, or challenge yourself with a higher level."

  });

  return slides;

}

/* =========================================================
   RENDER PPT SLIDE
========================================================= */

function renderPresentationSlide(){

  const d =
    curriculum[selectedTerm][selectedWeek];

  const s =
    presentationSlides[presentationSlide];

  $("pptSlideNumber").textContent =
    `${presentationSlide+1} / ${presentationSlides.length}`;

  $("pptProgressBar").style.width =
    `${((presentationSlide+1) /
    presentationSlides.length)*100}%`;

  $("pptIcon").textContent =
    s.icon || "📖";

  $("pptTag").textContent =
    s.tag || "LESSON";

  $("pptSlideTitle").textContent =
    s.title || d.title;

  $("pptSlideBody").textContent =
    s.body || "";

  const bulletArea =
    $("pptBullets");

  bulletArea.innerHTML = "";

  (s.bullets || []).forEach(
    text=>{

      const li =
        document.createElement("li");

      li.textContent = text;

      bulletArea.appendChild(li);

    }
  );

  const example =
    $("pptExample");

  if(s.example){

    example.hidden = false;

    example.innerHTML =
      `<strong>💡 Example / Tip:</strong><br>` +
      escapeHTML(s.example);

  }else{

    example.hidden = true;

  }

  $("pptPrevButton").disabled =
    presentationSlide === 0;

  const last =
    presentationSlide ===
    presentationSlides.length - 1;

  $("pptNextButton").hidden =
    last;

  $("pptStartButton").hidden =
    !last;

  const subtitle =
    document.querySelector(
      "#topicPage .ppt-subtitle"
    );

  if(subtitle){

    subtitle.textContent =
      `${selectedTerm} • Week ${selectedWeek} • ${d.area}`;

  }

}

/* =========================================================
   OPEN WEEK
========================================================= */

function openWeek(week){

  selectedWeek = week;

  const d =
    curriculum[selectedTerm][week];

  $("topicTitle").textContent =
    `Week ${week}: ${d.title}`;

  $("topicArea").textContent =
    d.area;

  const content =
    $("topicContent");

  content.innerHTML = "";

  d.points.forEach(
    (point,i)=>{

      const element =
        document.createElement("div");

      element.textContent =
        `${i+1}. ${point}`;

      content.appendChild(
        element
      );

    }
  );

  $("selectedWeekLabel").textContent =
    `${selectedTerm} • Week ${week}: ${d.title}`;

  presentationSlides =
    buildPresentation(d);

  presentationSlide = 0;

  renderPresentationSlide();

  showPage("topicPage");

  playClickSound();

}

/* =========================================================
   PPT NAVIGATION
========================================================= */

function nextPresentationSlide(){

  if(
    presentationSlide <
    presentationSlides.length - 1
  ){

    presentationSlide++;

    renderPresentationSlide();

    playClickSound();

    window.scrollTo({
      top:0,
      behavior:"smooth"
    });

  }

}

function previousPresentationSlide(){

  if(presentationSlide > 0){

    presentationSlide--;

    renderPresentationSlide();

    playClickSound();

    window.scrollTo({
      top:0,
      behavior:"smooth"
    });

  }

}

/* =========================================================
   OPEN LEVELS
========================================================= */

function openLevels(){

  if(
    !selectedTerm ||
    !selectedWeek
  ){

    showPage("termPage");

    return;

  }

  $("selectedWeekLabel").textContent =
    `${selectedTerm} • Week ${selectedWeek}: ${curriculum[selectedTerm][selectedWeek].title}`;

  showPage("levelPage");

  playClickSound();

}

/* =========================================================
   ACTIVITY START
========================================================= */

function startActivity(level){

  selectedLevel = level;

  currentQuestion = 1;

  score = 0;

  answeredQuestions = 0;

  selectedChoice = null;

  answered = false;

  updateActivityHeader();

  showPage("activityPage");

  generateActivity();

  playClickSound();

}

/* =========================================================
   ACTIVITY HEADER
========================================================= */

function updateActivityHeader(){

  $("operationBadge").textContent =
    `📚 ${selectedTerm}`;

  $("levelBadge").textContent =
    `${levelIcon(selectedLevel)} ${selectedLevel}`;

  $("questionNumber").textContent =
    currentQuestion;

  $("questionProgressBar").style.width =
    `${currentQuestion * 10}%`;

}

function levelIcon(level){

  if(level === "Beginner")
    return "🌱";

  if(level === "Explorer")
    return "🔎";

  if(level === "Challenger")
    return "💪";

  return "🏆";

}

function levelIndex(){

  if(selectedLevel === "Beginner")
    return 0;

  if(selectedLevel === "Explorer")
    return 1;

  if(selectedLevel === "Challenger")
    return 2;

  return 3;

}

function updateQuestionProgress(){

  $("questionNumber").textContent =
    currentQuestion;

  $("questionProgressBar").style.width =
    `${currentQuestion * 10}%`;

}

/* =========================================================
   QUESTION GENERATION
========================================================= */

function generateActivity(){

  selectedChoice = null;

  answered = false;

  $("feedback").textContent = "";

  $("feedback").className =
    "feedback";

  if($("submitButton"))
    $("submitButton").hidden = false;

  $("nextButton").hidden = true;

  currentActivity =
    makeQuestion(
      selectedTerm,
      selectedWeek,
      levelIndex(),
      currentQuestion
    );

  renderQuestion(
    currentActivity
  );

  updateActivityHeader();

}

/* =========================================================
   RENDER QUESTION
========================================================= */

function renderQuestion(a){

  $("activityType").textContent =
    a.type === "mc"
      ? "🔘 Multiple Choice"
      : a.type === "fill"
        ? "✏️ Fill in the Blank"
        : "🧠 Situational Problem";

  $("questionTitle").textContent =
    a.type === "sit"
      ? "🧠 Read the situation and solve it!"
      : a.type === "fill"
        ? "✏️ Complete the missing answer!"
        : "🎯 Choose the correct answer!";

  $("visualArea").innerHTML =
    a.visual ||
    getQuestionVisual(a);

  $("questionText").textContent =
    a.text;

  const area =
    $("answerArea");

  area.innerHTML = "";

  if(a.type === "fill"){

    const input =
      document.createElement("input");

    input.id =
      "fillAnswer";

    input.className =
      "fill-input";

    input.placeholder =
      "✏️ Type your answer here";

    input.autocomplete =
      "off";

    input.inputMode =
      "text";

    input.onkeydown =
      event=>{

        if(event.key === "Enter"){
          submitAnswer();
        }

      };

    area.appendChild(input);

    setTimeout(
      ()=>{
        input.focus();
      },
      100
    );

  }else{

    a.choices.forEach(
      (choice,index)=>{

        const button =
          document.createElement("button");

        button.type = "button";

        button.className =
          "choice-button";

        button.innerHTML = `

          <span class="choice-emoji">
            ${getChoiceVisual(
              choice.value,
              a.text,
              index
            )}
          </span>

          <span class="choice-label">
            ${escapeHTML(
              String(choice.value)
            )}
          </span>

        `;

        button.onclick =
          ()=>{
            selectChoice(
              index,
              button
            );
          };

        area.appendChild(
          button
        );

      }
    );

  }

}

/* =========================================================
   VISUAL CHOICES
========================================================= */

function getChoiceVisual(
  value,
  question,
  index
){

  const text =
    String(value)
      .toLowerCase();

  if(/apple|apples/.test(text))
    return "🍎";

  if(/banana|bananas/.test(text))
    return "🍌";

  if(/mango|mangoes/.test(text))
    return "🥭";

  if(/orange|oranges/.test(text))
    return "🍊";

  if(/book|books/.test(text))
    return "📚";

  if(/pencil|pencils/.test(text))
    return "✏️";

  if(/toy|toys/.test(text))
    return "🧸";

  if(/bag|school bag/.test(text))
    return "🎒";

  if(/dog|dogs/.test(text))
    return "🐶";

  if(/cat|cats/.test(text))
    return "🐱";

  if(/chicken|chickens/.test(text))
    return "🐔";

  if(/bird|birds/.test(text))
    return "🐦";

  if(/fish|fishes/.test(text))
    return "🐟";

  if(/medicine/.test(text))
    return "💊";

  if(
    /water|liter|liters|milliliter|milliliters/.test(text)
  )
    return "💧";

  if(
    /kilogram|gram|mass/.test(text)
  )
    return "⚖️";

  if(
    /money|peso|₱/.test(text)
  )
    return "💰";

  if(/addition/.test(text))
    return "➕";

  if(/subtraction/.test(text))
    return "➖";

  if(/multiplication/.test(text))
    return "✖️";

  if(/division/.test(text))
    return "➗";

  if(/certain/.test(text))
    return "☀️";

  if(/impossible/.test(text))
    return "🚫";

  if(/equally likely/.test(text))
    return "⚖️";

  if(/symmetry/.test(text))
    return "🦋";

  if(
    /translation|slide/.test(text)
  )
    return "➡️";

  if(/heads/.test(text))
    return "🙂";

  if(/tails/.test(text))
    return "🪙";

  if(
    /bars|bar graph/.test(text)
  )
    return "📊";

  if(/balance scale/.test(text))
    return "⚖️";

  if(/measuring cup/.test(text))
    return "🥤";

  if(/square/.test(text))
    return "⬛";

  if(/circle/.test(text))
    return "⭕";

  if(/triangle/.test(text))
    return "🔺";

  if(/rectangle/.test(text))
    return "▭";

  return [
    "🍎",
    "🍌",
    "🍊",
    "🐶",
    "🐱",
    "🧸",
    "📚",
    "✏️",
    "⭐",
    "🎈"
  ][index%10];

}

function getQuestionVisual(a){

  const text =
    String(a.text)
      .toLowerCase();

  if(/apple|apples/.test(text))
    return "🍎🍎🍎🍎🍎";

  if(/banana|bananas/.test(text))
    return "🍌🍌🍌🍌";

  if(/pencil|pencils/.test(text))
    return "✏️✏️✏️✏️✏️";

  if(/book|books/.test(text))
    return "📚📚📚";

  if(/toy|toys/.test(text))
    return "🧸🧸🧸";

  if(/money|peso|₱/.test(text))
    return "💰💰💰";

  if(/mass|weigh/.test(text))
    return "⚖️";

  if(
    /capacity|water|liter/.test(text)
  )
    return "💧🥤💧";

  if(/graph|data/.test(text))
    return "📊📈";

  if(
    /multiplication|×/.test(text)
  )
    return "✖️🧮";

  if(
    /division|÷/.test(text)
  )
    return "➗🧮";

  if(/fraction/.test(text))
    return "🍕";

  if(/symmetry/.test(text))
    return "🦋";

  if(/line|ray/.test(text))
    return "📏";

  return "🧮⭐🎯";

}

/* =========================================================
   CHOICE
========================================================= */

function selectChoice(i,button){

  if(answered)
    return;

  selectedChoice =
    currentActivity
      .choices[i]
      .value;

  document
    .querySelectorAll(".choice-button")
    .forEach(
      item=>{
        item.classList.remove(
          "selected"
        );
      }
    );

  button.classList.add(
    "selected"
  );

  playClickSound();

}

/* =========================================================
   SUBMIT ANSWER
========================================================= */

function submitAnswer(){

  if(answered)
    return;

  let answer;

  const input =
    $("fillAnswer");

  if(input){

    answer =
      input.value.trim();

    if(!answer){

      showFeedback(
        "PLEASE ENTER AN ANSWER",
        false
      );

      speak(
        "Please enter an answer."
      );

      playWrongSound();

      return;
    }

  }else{

    if(selectedChoice === null){

      showFeedback(
        "PLEASE CHOOSE AN ANSWER",
        false
      );

      speak(
        "Please choose an answer."
      );

      playWrongSound();

      return;
    }

    answer =
      selectedChoice;

  }

  answered = true;

  answeredQuestions =
    Math.max(
      answeredQuestions,
      currentQuestion
    );

  const correct =
    normalize(answer) ===
    normalize(
      currentActivity.answer
    );

  if(correct){

    score++;

    showFeedback(
      "CORRECT",
      true
    );

    speak(
      "Correct."
    );

    playCorrectSound();

    createCelebration();

  }else{

    showFeedback(
      `INCORRECT — CORRECT ANSWER: ${currentActivity.answer}`,
      false
    );

    speak(
      `Incorrect. The correct answer is ${currentActivity.answer}.`
    );

    playWrongSound();

  }

  if($("submitButton"))
    $("submitButton").hidden = true;

  if(currentQuestion >= 10){

    setTimeout(
      ()=>{
        finishAdventure(true);
      },
      1100
    );

  }else{

    $("nextButton").hidden = false;

  }

}

/* =========================================================
   NEXT QUESTION
========================================================= */

function nextQuestion(){

  if(currentQuestion >= 10)
    return;

  currentQuestion++;

  selectedChoice = null;

  answered = false;

  generateActivity();

  playClickSound();

}

/* =========================================================
   FEEDBACK
========================================================= */

function showFeedback(
  message,
  correct
){

  const feedback =
    $("feedback");

  feedback.textContent =
    message;

  feedback.className =
    "feedback " +
    (correct
      ? "correct"
      : "wrong");

}

/* =========================================================
   NORMALIZE
========================================================= */

function normalize(value){

  return String(value)
    .trim()
    .toLowerCase()
    .replace(/,/g,"")
    .replace(/\s+/g," ");

}

/* =========================================================
   FINISH
========================================================= */

function finishAdventure(
  completed=true
){

  $("resultName").textContent =
    studentName;

  $("finalScore").textContent =
    score;

  const status =
    completed
      ? "Completed"
      : "Exited";

  $("resultMessage").textContent =
    `${selectedTerm} • Week ${selectedWeek} • ${status}`;

  $("resultStars").textContent =
    score >= 9
      ? "⭐ ⭐ ⭐"
      : score >= 6
        ? "⭐ ⭐"
        : "⭐";

  saveProgress(completed);

  if(completed){

    speak(
      `Activity complete. Your score is ${score} out of 10.`
    );

    score >= 8
      ? playVictorySound()
      : playCorrectSound();

  }

  showPage("resultPage");

}

/* =========================================================
   EXIT ACTIVITY
   IMMEDIATELY SHOW MY PROGRESS
========================================================= */

function exitActivity(){

  saveProgress(false);

  playClickSound();

  showProgress();

}

/* =========================================================
   PROGRESS
========================================================= */

function getProgressRecords(){

  try{

    return JSON.parse(
      localStorage.getItem(
        "mathAdventureProgressRecords"
      )
    ) || [];

  }catch(error){

    return [];

  }

}

function saveProgress(
  completed=true
){

  const records =
    getProgressRecords();

  const current =
    curriculum
      [selectedTerm]
      [selectedWeek];

  const record = {

    student:studentName,

    term:selectedTerm,

    week:selectedWeek,

    topic:current.title,

    level:selectedLevel,

    score:score,

    answered:
      completed
        ? 10
        : Math.min(
            answeredQuestions,
            10
          ),

    activities:10,

    completed:completed,

    date:
      new Date().toISOString()

  };

  records.push(record);

  localStorage.setItem(
    "mathAdventureProgressRecords",
    JSON.stringify(records)
  );

  localStorage.setItem(
    "mathAdventureProgress",
    JSON.stringify(record)
  );

}

function showProgress(){

  const container =
    $("progressRecords");

  const empty =
    $("progressEmpty");

  const records =
    getProgressRecords();

  container.innerHTML = "";

  if(!records.length){

    empty.hidden = false;

    showPage("progressPage");

    return;

  }

  empty.hidden = true;

  records
    .slice()
    .reverse()
    .forEach(
      record=>{

        const item =
          document.createElement("div");

        item.className =
          "progress-record";

        const status =
          record.completed === false &&
          Number(record.answered) < 10
            ? "⏸️ Incomplete"
            : "✅ Completed";

        item.innerHTML = `

          <div class="progress-record-title">

            <strong>
              👤
              ${escapeHTML(
                record.student ||
                "Unknown"
              )}
            </strong>

            <span>
              ${status}
            </span>

          </div>

          <div class="progress-record-grid">

            <div>
              <small>
                📚 Term
              </small>

              <strong>
                ${escapeHTML(
                  record.term || "-"
                )}
              </strong>
            </div>

            <div>
              <small>
                🗓️ Week
              </small>

              <strong>
                Week ${record.week || "-"}
              </strong>
            </div>

            <div>
              <small>
                📖 Topic
              </small>

              <strong>
                ${escapeHTML(
                  record.topic || "-"
                )}
              </strong>
            </div>

            <div>
              <small>
                🎯 Level
              </small>

              <strong>
                ${escapeHTML(
                  record.level || "-"
                )}
              </strong>
            </div>

            <div>
              <small>
                🏆 Score
              </small>

              <strong>
                ${Number(record.score) || 0}
                / 10
              </strong>
            </div>

            <div>
              <small>
                📝 Answered
              </small>

              <strong>
                ${Number(record.answered) || 0}
                / 10
              </strong>
            </div>

          </div>

        `;

        container.appendChild(
          item
        );

      }
    );

  $("progressMessage").textContent =
    "📚 Progress is saved by term, week, topic, level, score, and answered activities.";

  showPage("progressPage");

}

/* =========================================================
   QUESTION HELPERS
========================================================= */

function q(
  type,
  text,
  answer,
  choices,
  visual=""
){

  return {

    type:type,

    text:text,

    answer:answer,

    choices:
      choices
        ? choices.map(
            value=>({
              value:value,
              text:String(value)
            })
          )
        : [],

    visual:visual

  };

}

function mc(
  text,
  answer,
  choices
){

  return q(
    "mc",
    text,
    answer,
    choices
  );

}

function fill(
  text,
  answer
){

  return q(
    "fill",
    text,
    answer
  );

}

function sit(
  text,
  answer,
  choices
){

  return q(
    "sit",
    text,
    answer,
    choices
  );

}

function money(
  text,
  answer,
  choices
){

  return q(
    "mc",
    text,
    answer,
    choices,
    "💰💰💰"
  );

}

function makeQuestion(
  term,
  week,
  level,
  number
){

  /*
    ======================================================
    KEEP YOUR EXISTING 300-QUESTION BANK HERE.

    The original question bank from the previous
    working Math Adventure version remains unchanged.

    The PPT presentation is independent from the
    activity question bank, so adding the lesson slides
    does NOT change the activities, scoring, or flow.
    ======================================================
  */

  const banks = {

    "First Term": {

      1:[
        mc(
          "A rectangle is covered by 12 square tiles. What is its area?",
          "12 square units",
          [
            "12 square units",
            "10 square units",
            "14 square units",
            "6 square units"
          ]
        ),

        mc(
          "Which unit is used for area?",
          "square unit",
          [
            "square unit",
            "liter",
            "kilogram",
            "meter"
          ]
        ),

        fill(
          "8 tiles + 5 tiles = ___ square units",
          13
        ),

        fill(
          "A shape covered by 20 equal squares has an area of ___ square units.",
          20
        ),

        sit(
          "Lia covers a figure with 4 rows of 3 square tiles. What is the area?",
          12,
          [
            "12 square units",
            "7 square units",
            "10 square units"
          ]
        ),

        mc(
          "Which figure has the greater area: one with 15 square tiles or one with 10 square tiles?",
          "15 square tiles",
          [
            "15 square tiles",
            "10 square tiles",
            "They are equal",
            "Cannot be determined"
          ]
        ),

        fill(
          "6 rows of 2 square tiles cover a shape. The area is ___ square units.",
          12
        ),

        mc(
          "If a shape is covered by 9 equal square units, what is its area?",
          "9 square units",
          [
            "9 square units",
            "18 square units",
            "6 square units",
            "3 square units"
          ]
        ),

        sit(
          "Ben counts 16 square tiles covering a board. What is the area of the board?",
          "16 square units",
          [
            "16 square units",
            "8 square units",
            "20 square units"
          ]
        ),

        mc(
          "Why do we use square units to measure area?",
          "They cover the surface",
          [
            "They cover the surface",
            "They measure weight",
            "They measure liquid",
            "They tell time"
          ]
        )
      ]

    }

  };

  const termBank =
    banks[term];

  if(
    termBank &&
    termBank[week]
  ){

    const questions =
      termBank[week];

    return questions[
      (number-1) %
      questions.length
    ];

  }

  /*
    FALLBACK QUESTION.
    This keeps the system running if a
    question is missing from a week.
  */

  const d =
    curriculum[term][week];

  const point =
    d.points[
      (number-1) %
      d.points.length
    ];

  const fallback=[
    mc(
      `Which idea is part of ${d.title}?`,
      point,
      [
        point,
        "A different topic",
        "Something unrelated",
        "None of these"
      ]
    ),

    fill(
      `Complete the lesson idea: ${point}`,
      point
    ),

    sit(
      `A Grade 3 learner is studying ${d.title}. Which idea should the learner remember?`,
      point,
      [
        point,
        "A different lesson",
        "No rule is needed"
      ]
    ),

    mc(
      `What should you study in ${d.title}?`,
      point,
      [
        point,
        "Only drawing",
        "Only spelling",
        "Only music"
      ]
    )

  ];

  return fallback[
    level % fallback.length
  ];

}

/* =========================================================
   SOUND
========================================================= */

function speak(text){

  if(
    !soundEnabled ||
    !("speechSynthesis" in window)
  )
    return;

  window.speechSynthesis.cancel();

  const utterance =
    new SpeechSynthesisUtterance(
      text
    );

  utterance.lang =
    "en-US";

  utterance.rate =
    .9;

  utterance.pitch =
    1.05;

  utterance.volume =
    1;

  window.speechSynthesis.speak(
    utterance
  );

}

function initializeAudio(){

  try{

    audioContext =
      audioContext ||
      new(
        window.AudioContext ||
        window.webkitAudioContext
      )();

    if(
      audioContext.state ===
      "suspended"
    ){

      audioContext.resume();

    }

  }catch(error){}

}

function tone(
  frequency,
  duration,
  type="sine",
  gain=.06
){

  if(!soundEnabled)
    return;

  initializeAudio();

  if(!audioContext)
    return;

  const oscillator =
    audioContext.createOscillator();

  const gainNode =
    audioContext.createGain();

  oscillator.type =
    type;

  oscillator.frequency.value =
    frequency;

  gainNode.gain.setValueAtTime(
    gain,
    audioContext.currentTime
  );

  gainNode.gain.exponentialRampToValueAtTime(
    .001,
    audioContext.currentTime +
    duration
  );

  oscillator.connect(
    gainNode
  );

  gainNode.connect(
    audioContext.destination
  );

  oscillator.start();

  oscillator.stop(
    audioContext.currentTime +
    duration
  );

}

function playClickSound(){

  tone(
    520,
    .08,
    "square",
    .035
  );

}

function playCorrectSound(){

  tone(
    660,
    .12,
    "sine",
    .06
  );

  setTimeout(
    ()=>{
      tone(
        880,
        .16,
        "sine",
        .06
      );
    },
    90
  );

}

function playWrongSound(){

  tone(
    220,
    .18,
    "sawtooth",
    .045
  );

  setTimeout(
    ()=>{
      tone(
        170,
        .2,
        "sawtooth",
        .04
      );
    },
    120
  );

}

function playVictorySound(){

  tone(
    523,
    .12
  );

  setTimeout(
    ()=>{
      tone(
        659,
        .12
      );
    },
    110
  );

  setTimeout(
    ()=>{
      tone(
        784,
        .2
      );
    },
    220
  );

}

/* =========================================================
   BACKGROUND MUSIC
========================================================= */

function startMusic(){

  if(
    !musicEnabled ||
    musicTimer
  )
    return;

  initializeAudio();

  const notes=[
    261.63,
    329.63,
    392.00,
    523.25,
    392.00,
    329.63
  ];

  let index=0;

  musicTimer =
    setInterval(
      ()=>{

        if(musicEnabled){

          tone(
            notes[
              index++ %
              notes.length
            ],
            .20,
            "triangle",
            .025
          );

        }

      },
      700
    );

}

function stopMusic(){

  if(musicTimer){

    clearInterval(
      musicTimer
    );

    musicTimer = null;

  }

}

function toggleMusic(){

  musicEnabled =
    !musicEnabled;

  localStorage.setItem(
    "mathAdventureMusic",
    musicEnabled
  );

  if(musicEnabled){

    startMusic();

    speak(
      "Music on."
    );

  }else{

    stopMusic();

    speak(
      "Music off."
    );

  }

  updateSoundButtons();

}

function toggleSound(){

  soundEnabled =
    !soundEnabled;

  localStorage.setItem(
    "mathAdventureSound",
    soundEnabled
  );

  if(soundEnabled){

    initializeAudio();

    speak(
      "Sound on."
    );

  }else{

    window.speechSynthesis?.cancel();

  }

  updateSoundButtons();

}

function updateSoundButtons(){

  $("musicToggle").textContent =
    musicEnabled
      ? "🎵"
      : "🔇";

  $("soundToggle").textContent =
    soundEnabled
      ? "🔊"
      : "🔈";

}

/* =========================================================
   CELEBRATION
========================================================= */

function createCelebration(){

  const celebration =
    document.createElement("div");

  celebration.textContent =
    "⭐ CORRECT! ⭐";

  celebration.style.position =
    "fixed";

  celebration.style.left =
    "50%";

  celebration.style.top =
    "45%";

  celebration.style.transform =
    "translate(-50%,-50%)";

  celebration.style.zIndex =
    "9999";

  celebration.style.padding =
    "18px 28px";

  celebration.style.borderRadius =
    "20px";

  celebration.style.background =
    "#fff8c4";

  celebration.style.color =
    "#7a5900";

  celebration.style.fontSize =
    "28px";

  celebration.style.fontWeight =
    "900";

  celebration.style.boxShadow =
    "0 15px 35px rgba(0,0,0,.18)";

  document.body.appendChild(
    celebration
  );

  setTimeout(
    ()=>{
      celebration.remove();
    },
    700
  );

}

/* =========================================================
   KEYBOARD CONTROLS
========================================================= */

function setupKeyboardControls(){

  document.addEventListener(
    "keydown",
    event=>{

      if(
        event.key === "Enter" &&
        $("activityPage")
          ?.classList
          .contains("active")
      ){

        const next =
          $("nextButton");

        if(
          next &&
          !next.hidden
        ){

          nextQuestion();

        }else{

          submitAnswer();

        }

      }

    }
  );

}

/* =========================================================
   PWA INSTALL
========================================================= */

function setupInstallPrompt(){

  window.addEventListener(
    "beforeinstallprompt",
    event=>{

      event.preventDefault();

      deferredInstallPrompt =
        event;

      $("installButton").hidden =
        false;

    }
  );

  $("installButton")
    ?.addEventListener(
      "click",
      async()=>{

        if(!deferredInstallPrompt)
          return;

        deferredInstallPrompt.prompt();

        await deferredInstallPrompt.userChoice;

        deferredInstallPrompt = null;

        $("installButton").hidden =
          true;

      }
    );

}