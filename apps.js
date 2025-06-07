// Navigation Script
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
});

function showApp(appName) {
    // Hide all app sections
    const allSections = document.querySelectorAll('.app-section');
    allSections.forEach(section => section.classList.remove('active'));
    
    // Show selected app
    document.getElementById(appName + '-app').classList.add('active');
    
    // Close mobile menu
    navMenu.classList.remove('active');
}

// Number Multiplier Functions
function displaySelection() {
    const operation = document.getElementById("operation").value;
    const selectionDisplay = document.getElementById("selection-display");
    selectionDisplay.innerHTML = operation;
}

function calculateResult() {
    const inputElement = document.getElementById("inputNumber");
    const inputValue = parseFloat(inputElement.value);
    const operationElement = document.getElementById("operation");
    const operation = operationElement.value;
    const resultElement = document.getElementById("calculation-result");
    
    if (isNaN(inputValue)) {
        resultElement.textContent = "Invalid input. Please enter a number.";
        return;
    }
    
    let result;
    let operationText;
    
    if (operation === "double") {
        result = inputValue * 2;
        operationText = "doubled";
    } else if (operation === "triple") {
        result = inputValue * 3;
        operationText = "tripled";
    }
    
    resultElement.textContent = `${inputValue} ${operationText} = ${result.toFixed(2)}`;
}

function clearResult() {
    document.getElementById("inputNumber").value = "";
    document.getElementById("calculation-result").innerHTML = "";
}

// Magic 8 Ball Functions
const answers = [
    "It is certain",
    "It is decidedly so",
    "Without a doubt",
    "Yes definitely",
    "You may rely on it",
    "As I see it, yes",
    "Most likely",
    "Outlook good",
    "Yes",
    "Signs point to yes",
    "Reply hazy, try again",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again",
    "Don't count on it",
    "My reply is no",
    "My sources say no",
    "Outlook not so good",
    "Very doubtful"
];

let historyItems = [];

function getRandomAnswer() {
    const randomIndex = Math.floor(Math.random() * answers.length);
    return answers[randomIndex];
}

function shakeBall() {
    const question = document.getElementById('question').value.trim();
    const ball = document.getElementById('ball');
    const answerElement = document.getElementById('answer');
    const questionDisplay = document.getElementById('question-display');
    const questionInput = document.getElementById('question');
    
    if (question === '') {
        alert('Please ask a question first!');
        return;
    }

    answerElement.textContent = '8';
    
    ball.style.transform = 'translateX(-5px)';
    setTimeout(() => { ball.style.transform = 'translateX(5px)'; }, 100);
    setTimeout(() => { ball.style.transform = 'translateX(-5px)'; }, 200);
    setTimeout(() => { ball.style.transform = 'translateX(5px)'; }, 300);
    setTimeout(() => { ball.style.transform = 'translateX(0)'; }, 400);
    
    setTimeout(() => {
        const randomAnswer = getRandomAnswer();
        answerElement.textContent = randomAnswer;
        questionDisplay.textContent = `"${question}"`;
        questionDisplay.style.opacity = 1;
        addToHistory(question);
    }, 500);
    
    questionInput.value = '';
}

function resetBall() {
    document.getElementById('answer').textContent = '8';
    document.getElementById('question-display').textContent = '';
    document.getElementById('question-display').style.opacity = 0;
    document.getElementById('question').value = '';
}

function addToHistory(question) {
    historyItems.unshift(question);
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const questionHistory = document.getElementById('question-history');
    questionHistory.innerHTML = '';
    
    historyItems.forEach((question, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'history-item';
        listItem.textContent = question;
        questionHistory.appendChild(listItem);
    });
}

function clearHistory() {
    historyItems = [];
    updateHistoryDisplay();
}

// Task List Functions
let taskList = [];

function addTask() {
  const taskInput = document.getElementById("task-input");
  const dateInput = document.getElementById("date-input");
  const timeInput = document.getElementById("time-input");

  const taskText = taskInput.value.trim();
  const date = dateInput.value.trim();
  const time = timeInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  const priority = determinePriority(date, time);

  const newTask = {
    text: taskText,
    date: date,
    time: time,
    priority: priority,
  };

  taskList.push(newTask);
  sortTasks();
  renderTasks();

  taskInput.value = "";
  dateInput.value = "";
  timeInput.value = "";
}

function determinePriority(date, time) {
  if (!date || !time) return 5; // Lowest priority if no time/date

  const now = new Date();
  const [month, day] = date.split("/").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  const dueDate = new Date(now.getFullYear(), month - 1, day, hour, minute);

  const diffMinutes = Math.floor((dueDate - now) / (1000 * 60));

  if (diffMinutes < 0) return 1;
  if (diffMinutes <= 60) return 2;
  if (diffMinutes <= 180) return 3;
  if (diffMinutes <= 360) return 4;
  return 5;
}

function sortTasks() {
  taskList.sort((a, b) => {
    const aDate = new Date(`2000/${a.date} ${a.time}`);
    const bDate = new Date(`2000/${b.date} ${b.time}`);
    return aDate - bDate;
  });
}

function renderTasks() {
  const taskListElement = document.getElementById("task-list");
  taskListElement.innerHTML = "";

  taskList.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.className = "task-item";

    const priorityDot = document.createElement("span");
    priorityDot.className = `priority-indicator priority-${task.priority}`;
    listItem.appendChild(priorityDot);

    const taskText = document.createTextNode(task.text);
    listItem.appendChild(taskText);

    const dueText = document.createElement("span");
    dueText.className = "due-date-text";
    dueText.textContent = `Due: ${task.date} ${task.time}`;
    listItem.appendChild(dueText);

    taskListElement.appendChild(listItem);
  });
}

function clearInput() {
  document.getElementById("task-input").value = "";
  document.getElementById("date-input").value = "";
  document.getElementById("time-input").value = "";
}

function clearTasks() {
  taskList = [];
  renderTasks();
}

function addRandomTask() {
  const suggestions = [
    "Drink water",
    "Stretch your back",
    "Take deep breaths",
    "Look away from the screen for 1 minute",
    "Write in a journal",
    "Take a 5-min walk",
    "Do 10 jumping jacks",
    "Organize your desk",
    "Eat a healthy snack",
    "Send a kind message to someone",
  ];

  const randomIndex = Math.floor(Math.random() * suggestions.length);
  const taskInput = document.getElementById("task-input");
  taskInput.value = suggestions[randomIndex];
}

// Countdown Timer Functions
let timerDisplay;
let motivationDisplay;
let secondsInput;
let startBtn;
let resetBtn;
let statusDisplay;
let countdown;
let timeLeft;
let phraseIndex = 0;

const motivationalPhrases = [
    "Every second counts!",
    "You're making progress!",
    "Keep going, you're doing great!",
    "Stay focused, stay strong!",
    "You've got this!",
    "One step at a time!",
    "Believe in yourself!",
    "Success is just ahead!",
    "Don't give up now!",
    "The best is yet to come!",
    "Each moment brings you closer to your goal!",
    "Small steps lead to big results!",
    "Your determination is inspiring!",
    "Progress happens one second at a time!",
    "Keep that momentum going!"
];

window.addEventListener('load', function() {
    timerDisplay = document.getElementById('timer');
    motivationDisplay = document.getElementById('motivation');
    secondsInput = document.getElementById('seconds');
    startBtn = document.getElementById('startBtn');
    resetBtn = document.getElementById('resetBtn');
    statusDisplay = document.getElementById('status');
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function updateTimerDisplay() {
    timerDisplay.textContent = formatTime(timeLeft);
}

function startCountdown() {
    const seconds = parseInt(secondsInput.value);

    if (isNaN(seconds) || seconds <= 0) {
        statusDisplay.textContent = "Please enter a valid number of seconds";
        return;
    }
    
    startBtn.disabled = true;
    secondsInput.disabled = true;
    statusDisplay.textContent = "Countdown in progress...";
    
    timeLeft = seconds;
    updateTimerDisplay();
    
    countdown = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft % 5 === 0 || timeLeft === seconds - 1) {
            phraseIndex = (phraseIndex + 1) % motivationalPhrases.length;
            motivationDisplay.textContent = motivationalPhrases[phraseIndex];
        }
        
        if (timeLeft <= 0) {
            clearInterval(countdown);
            timerDisplay.textContent = "00:00";
            motivationDisplay.textContent = "🎉 Congratulations! You've completed the countdown!";
            startBtn.disabled = false;
            secondsInput.disabled = false;
            statusDisplay.textContent = "Countdown complete!";
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(countdown);
    timerDisplay.textContent = "00:00";
    motivationDisplay.textContent = "Enter seconds and start the timer for motivation!";
    startBtn.disabled = false;
    secondsInput.disabled = false;
    statusDisplay.textContent = "";
    secondsInput.value = "30";
}

// NATO Converter Functions
const natoLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
                        "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
                        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

const natoWords = ["Alfa", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot", "Golf", "Hotel",
                    "India", "Juliett", "Kilo", "Lima", "Mike", "November", "Oscar", "Papa",
                    "Quebec", "Romeo", "Sierra", "Tango", "Uniform", "Victor", "Whiskey", "X-ray",
                    "Yankee", "Zulu", "One", "Two", "Three", "Four", "Five", "Six", 
                    "Seven", "Eight", "Nine", "Zero"];

function chToNato(ch) {
    const upperCh = ch.toUpperCase();
    const index = natoLetters.indexOf(upperCh);
    if (index !== -1) {
        return natoWords[index];
    }
    return ch;
}

function wordToNato(word) {
    const characters = word.split("");
    const natoCharacters = characters.map(ch => chToNato(ch));
    return natoCharacters.join(" ");
}

function sentenceToNato(sentence) {
    const words = sentence.split(" ");
    const natoWords = words.map(word => wordToNato(word));
    return natoWords.join(" ");
}

function verbalize() {
    const inputString = document.getElementById("inputString").value;
    const natoResult = sentenceToNato(inputString);
    document.getElementById("natoResult").textContent = natoResult;
}

function clearNATOInputs() {
    document.getElementById("inputString").value = "";
    document.getElementById("natoResult").textContent = "";
}

// Calculator Functions
let display = document.getElementById("display");
let historyDisplay = document.getElementById("history");
let memory = 0;

function appendToDisplay(value) {
  display.value += value;
}

function clearAll() {
  display.value = "";
  historyDisplay.innerText = "";
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    const expression = display.value;
    const result = eval(expression);
    historyDisplay.innerText = expression + " = " + result;
    display.value = result;
  } catch (error) {
    display.value = "Error";
  }
}

function insertMathFunction(funcName) {
  const value = display.value;
  if (value !== "") {
    try {
      let result;
      if (funcName === "pow") {
        const [base, exponent] = value.split(",").map(Number);
        result = Math.pow(base, exponent);
      } else {
        result = Math[funcName](parseFloat(value));
      }
      historyDisplay.innerText = `${funcName}(${value}) = ${result}`;
      display.value = result;
    } catch {
      display.value = "Error";
    }
  }
}

function insertMathConstant(constant) {
  try {
    const value = eval(constant);
    display.value += value;
  } catch {
    display.value = "Error";
  }
}

function clearMemory() {
  memory = 0;
}

function recallMemory() {
  display.value += memory;
}

function addToMemory() {
  memory += parseFloat(display.value || 0);
}

function subtractFromMemory() {
  memory -= parseFloat(display.value || 0);
}

// Contacts App Functions
let contactsData = {
    "contacts": [
        {
            "id": 1,
            "name": "John Doe",
            "email": "john@example.com",
            "phone": "555-123-4567",
            "type": "personal"
        },
        {
            "id": 2,
            "name": "Jane Smith",
            "email": "jane@company.com",
            "phone": "555-987-6543",
            "type": "work"
        },
        {
            "id": 3,
            "name": "Bob Johnson",
            "email": "bob@family.net",
            "phone": "555-555-5555",
            "type": "family"
        }
    ]
};

function displayContacts(contacts = contactsData.contacts) {
    const contactsList = document.getElementById('contacts-list');
    contactsList.innerHTML = '';
    
    if (contacts.length === 0) {
        contactsList.innerHTML = '<p>No contacts found.</p>';
        return;
    }
    
    contacts.forEach(contact => {
        const div = document.createElement('div');
        div.className = 'contact-card';
        div.innerHTML = `
            <h3>${contact.name}</h3>
            <p>Email: ${contact.email}</p>
            <p>Phone: ${contact.phone}</p>
            <p>Type: ${contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}</p>
        `;
        contactsList.appendChild(div);
    });
}

function updateJSONDisplay() {
    const jsonContent = document.getElementById('json-content');
    jsonContent.textContent = JSON.stringify(contactsData, null, 4);
}

function searchContacts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    
    if (!searchTerm) {
        displayContacts();
        return;
    }
    
    const filteredContacts = contactsData.contacts.filter(contact => {
        return contact.name.toLowerCase().includes(searchTerm) ||
                contact.email.toLowerCase().includes(searchTerm) ||
                contact.phone.includes(searchTerm) ||
                contact.type.toLowerCase().includes(searchTerm);
    });
    
    displayContacts(filteredContacts);
}

function addContact() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const type = document.getElementById('type').value;
    
    let newId;
    if (contactsData.contacts.length > 0) {
        const maxId = Math.max(...contactsData.contacts.map(function(c) { 
            return c.id; 
        }));
        newId = maxId + 1;
    } else {
        newId = 1;
    }
    
    const newContact = {
        id: newId,
        name,
        email,
        phone,
        type
    };
    
    contactsData.contacts.push(newContact);
    document.getElementById('contact-form').reset();
    displayContacts();
    updateJSONDisplay();
    alert('Contact added successfully!');
    switchTab('view');
    
    return false;
}

function resetSearch() {
    document.getElementById('search-input').value = '';
    displayContacts();
}

function switchTab(tabId) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        if (tab.textContent.toLowerCase().includes(tabId)) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        if (content.id === `${tabId}-contacts` || content.id === `${tabId}-contact` || content.id === `${tabId}-view`) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
    
    if (tabId === 'json') {
        updateJSONDisplay();
    }
}

function updateFormula() {
  const conversionType = document.getElementById("conversion-type").value;
  const formulaElement = document.getElementById("formula");

  if (conversionType === "ftoc") {
    formulaElement.textContent = "(F - 32) * 5/9 = C";
  } else {
    formulaElement.textContent = "(C * 9/5) + 32 = F";
  }
}

function assessTemperature(temp, scale) {
  const tempElement = document.getElementById("temp-assessment");
  let assessment = "";
  let color = "";

  if (scale === "celsius") {
    if (temp <= 0) {
      assessment = "Very Cold";
      color = "#3498db";
    } else if (temp < 10) {
      assessment = "Cold";
      color = "#7fb3d5";
    } else if (temp < 20) {
      assessment = "Cool";
      color = "#a9cce3";
    } else if (temp < 30) {
      assessment = "Moderate";
      color = "#2ecc71";
    } else if (temp < 40) {
      assessment = "Warm";
      color = "#f39c12";
    } else {
      assessment = "Hot";
      color = "#e74c3c";
    }
  } else {
    if (temp <= 32) {
      assessment = "Very Cold";
      color = "#3498db";
    } else if (temp < 50) {
      assessment = "Cold";
      color = "#7fb3d5";
    } else if (temp < 68) {
      assessment = "Cool";
      color = "#a9cce3";
    } else if (temp < 86) {
      assessment = "Moderate";
      color = "#2ecc71";
    } else if (temp < 104) {
      assessment = "Warm";
      color = "#f39c12";
    } else {
      assessment = "Hot";
      color = "#e74c3c";
    }
  }

  tempElement.textContent = `Temperature Assessment: ${assessment}`;
  tempElement.style.color = color;
  tempElement.style.fontWeight = "bold";
}

function convertTemperature() {
  const temperatureInput = document.getElementById("temperature").value;
  const temperatureValue = parseFloat(temperatureInput);
  const conversionType = document.getElementById("conversion-type").value;
  const resultElement = document.getElementById("conversion-result");

  if (isNaN(temperatureValue)) {
    resultElement.textContent = "Invalid input. Please enter a number.";
    document.getElementById("temp-assessment").textContent = "";
    return;
  }

  let result;

  if (conversionType === "ftoc") {
    result = (temperatureValue - 32) * 5 / 9;
    resultElement.textContent = `${temperatureValue}°F is ${result.toFixed(2)}°C`;
    assessTemperature(result, "celsius");
  } else {
    result = (temperatureValue * 9 / 5) + 32;
    resultElement.textContent = `${temperatureValue}°C is ${result.toFixed(2)}°F`;
    assessTemperature(result, "fahrenheit");
  }
}

function clearConverter() {
  document.getElementById("temperature").value = "";
  document.getElementById("conversion-result").textContent = "";
  document.getElementById("temp-assessment").textContent = "";
}



// Initialize contacts on load
window.addEventListener('load', function() {
    displayContacts();
    updateJSONDisplay();
});

