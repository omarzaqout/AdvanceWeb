export function activateChatEvents() {
  console.log("sameer");
// Object to store the Msg of every Admin
let chat_Data = {
  adham: [],
  omar: [],
  mohammed: []
};

// Load saved data from Local Storage when the page loads
function loadChatData() {
  const savedData = localStorage.getItem("chat_Data");
  if (savedData) {
    chat_Data = JSON.parse(savedData);
  }
}

// Save the current chat data to Local Storage
function saveChatData() {
  localStorage.setItem("chat_Data", JSON.stringify(chat_Data));
}

let ctAdmin = null;

function filterAdmins() {
  const search_v = document.getElementById("search").value.toLowerCase();
  const admins = document.querySelectorAll(".admin");

  admins.forEach(admin => {
    const admin_n = admin.getAttribute("data-name").toLowerCase();
    if (admin_n.includes(search_v)) {
      admin.style.display = "flex";
    } else {
      admin.style.display = "none";
      
    }
  });
}

function openChat(admin_n) {
  ctAdmin = admin_n;
  document.getElementById("chatSection").classList.add("active");
  document.getElementById("chat-admin-name").textContent = capitalize(admin_n);

  if (chat_Data[ctAdmin].length === 0) {
    chat_Data[ctAdmin].push({
      sender: capitalize(ctAdmin),
      text: "Hello! How can I assist you today?"
    });
    saveChatData(); // Save to Local Storage
  }
  displayMessages(); 
}

function displayMessages() {
  const msg_Container = document.getElementById("chatMessages");
  msg_Container.innerHTML = ""; 

  chat_Data[ctAdmin].forEach(message => {
    const msg_Element = document.createElement("p");
    const isUser = message.sender === "You";
    const textColor = isUser ? "#94dc81" : "#4d93e9"; 
    const nameColor = "gray"; 

    msg_Element.innerHTML = `<strong style="color: ${nameColor};">${message.sender}:</strong> <span style="color: ${textColor};">${message.text}</span>`;
    msg_Container.appendChild(msg_Element);
  });

  msg_Container.scrollTop = msg_Container.scrollHeight; 
}

function sendMessage() {
  const input = document.getElementById("chatInput");
  const message = input.value.trim();

  if (message && ctAdmin) {
    chat_Data[ctAdmin].push({ sender: "You", text: message });
    saveChatData(); // Save to Local Storage
    displayMessages();

    setTimeout(() => {
      const adminReply = { sender: capitalize(ctAdmin), text: "Sure! please provide your account details." };
      chat_Data[ctAdmin].push(adminReply);
      saveChatData(); // Save to Local Storage
      displayMessages();
    }, 1000);

    input.value = ""; 
  }
}

function capitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

// Load chat data when the page loads
window.openChat = openChat;
window.filterAdmins = filterAdmins;
window.sendMessage =sendMessage ;

window.onload = loadChatData;
}
