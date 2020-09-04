const search = $(".search");
const inputForm = $("#input");
const message = document.getElementById("message");
const sendButton = document.getElementById("send-button");
const chatCanvas = $("#chat-canvas");
const firstCanvas = $(".first-canvas");
const secondCanvas = $(".second-canvas");
const lastChats = $("#last-chats");
let currentCanvas = firstCanvas; // to add messages to the current chat box
const notificationPopUp = $("#side-notification");

const searchIcon = $(".fa-search");
const inputSearch = $(".search input");
const contactsIcon = $(".contacts .inbox");
const contacts = $(".contacts");

const firstContact = $(".first-contact");
const firstContactName = firstContact.children().eq(1).children().eq(0)[0];

const secondContact = $(".second-contact");

const thirdContact = $(".third-contact");
const thirdContactPar = thirdContact.children().eq(1).children().eq(1)[0];
const thirdContactName = thirdContact.children().eq(1).children().eq(0)[0];
const thirdContactNot = thirdContact.children().eq(2).children().eq(1)[0];

const titleImg = $(".current-chat-img");
const titleName = $(".current-chat-friend");

const firstChat = $(".first-canvas");
const secondChat = $(".second-canvas");

// A working search box with proper styling
search.on("click", function(){

    // modifying navigation icons' styles
    inputSearch.removeClass("display");
    contacts.css("background", "#E6E7E8");
    contactsIcon.css("background", "#b2bec3");
    $(".arrow-down").addClass("arrow-down-unselected")
    $(".contacts .inner").css("background", "white");

    // searching for a specific contact
    inputSearch.on("keyup", function(e){
        const term = e.target.value.toLowerCase(); // input letters
        const friends = $(".chats h4");

        for (let friend of friends){
            const name = friend.textContent.toLowerCase(); // a contact name

            if(name.indexOf(term) != -1){
                // the letter exists in a contact's name
                friend.parentElement.parentElement.style.display = "grid";
            } else {
                // the letter is not found
                friend.parentElement.parentElement.style.display = "none";
            };
        };
    });
});

// changing the button background
inputForm.on("keyup", function(){
    // Send only if there is a message
    if (message.value){
        sendButton.classList.add("active-button");
    } else if (!message.value){
        sendButton.classList.remove("active-button");
    }
});

// Sending a text message
inputForm.on("submit", function(e){
    // preventing the browser from reloading
    e.preventDefault();
    if (message.value){
        // making a clone from the sending form
        let node = $(".send-form").clone().first();

        // changing the sent message
        let nodePar = node.children().eq(1)[0];
        nodePar.innerHTML = "<p>"+message.value+"</p>";
        // appending to the current canvas through the animation
        node.appendTo(currentCanvas);

        // keep the canvas always scrolling down
        currentCanvas.scrollTop(currentCanvas[0].scrollHeight);

        // clearing the input field
        message.value = "";
    }
});

// New message animation
setInterval(function(){
    // fading out the new message to the left
    thirdContact.animate({width:'toggle'}, 300, function(){
        // appending new message to the top of the side nav
        thirdContact.prependTo(lastChats);
        thirdContact.animate({width:'toggle'}, 300, function(){
            // changing properties to the unread message style
            thirdContactPar.style.color = "#00A69C"; // turquoise
            thirdContactNot.classList.remove("display");

            // animating notification pop up
            notificationPopUp.animate({width: 'toggle'}, 200);
            setTimeout(function() {
                notificationPopUp.animate({width: 'toggle'}, 200);
            }, 1500);

            // wait for 2 seconds to read the new message
            setTimeout(function(){
                // new properties while reading the message
                thirdContact[0].style.background = "#F1F1F2"; // light gray
                thirdContactNot.classList.add("display");
                thirdContactPar.style.color = "#9A9A9D"; // dark gray
                thirdContactName.style.color = "#00A69C";

                firstContact[0].style.background = "white";
                firstContactName.style.color = "#9A9A9D";

                // switching to the other chat canvas
                firstChat[0].classList.add("display");
                secondChat[0].classList.remove("display");
                currentCanvas = secondCanvas;

                // changinging chat title properties
                titleImg.attr("src", "images/3.jpg");
                titleName[0].textContent = "CHAT WITH PENNY ROGERS"

                // reset the whole design to the beginning
                setTimeout(function(){
                    reset();
                }, 5000);
            }, 2000);
        });
    });
}, 30000);

// reset the whole design to the beginning
function reset(){
    // $("body")[0].style.background = "red";

    // reset navigation buttons
    inputSearch.addClass("display");
    contacts.css("background", "#00A69C");
    contactsIcon.css("background", "#F1F1F2");
    $(".arrow-down").removeClass("arrow-down-unselected");
    $(".contacts .inner").css("background", "#00A69C");

    // reordering recent chats
    secondContact.prependTo(lastChats);
    firstContact.prependTo(lastChats);

    // switching back to the first chat canvas
    currentCanvas = firstCanvas;
    secondChat[0].classList.add("display");
    firstChat[0].classList.remove("display");

    // restyling original current chat
    thirdContact[0].style.background = "white";
    thirdContactName.style.color = "#9A9A9D";

    firstContact[0].style.background = "#F1F1F2";
    firstContactName.style.color = "#00A69C";

    // resetting initial chat title
    titleImg.attr("src", "images/1.jpg");
    titleName[0].textContent = "CHAT WITH LINSEY CRUZ";
}

