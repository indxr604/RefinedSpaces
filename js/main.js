const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");




(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Service carousel
    $(".service-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:2
            }
        }
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });


    // Team carousel
    $(".team-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ]
    });
    
})(jQuery);

const companyData = {
    name: "Refined Spaces",
    email: "refinedspaces65@gmail.com",
    phone: "7986610238",
    address: "123 Model Town, Ludhiana",
    website: "https://refinedspaces.com"
};

const ceoInfo = {
    name: "Inderjeet Singh",
    title: "Founder & CEO",
    bio: "Inder is a visionary leader with over 1.5 years of experience in interior design, creating unique and inspiring spaces for homes and businesses worldwide.",
    email: "inderjeet221777@gmail.com",
    linkedin: "https://linkedin.com/in/inder"
};

const managerInfo = {
    name: "Harman Chopra",
    title: "Project Manager",
    bio: "Harman is a project manager with over 1 year of experience in interior design, managing projects from concept to completion.",
    email: "harman123@gmail.com",
    linkedin: "https://linkedin.com/in/harman"
};

const assistantInfo = {
    name: "Gagandeep Singh",
    title: "Assistant Manager",
    bio: "Gagan is an assistant manager with over 1 year of experience in interior design, assisting in project management and client communication.",
    email: "gagandeep456@gmail.com",
    linkedin: "https://linkedin.com/in/gagan"
}

const companyPurpose = `✨ Our Purpose at Refined Spaces ✨  
We specialize in transforming spaces into beautiful, functional, and inspiring environments!  
🏡 Enhancing Aesthetic Appeal  
📐 Optimizing Functionality  
🎨 Providing Custom Solutions  
🏠 Increasing Property Value  
🌱 Sustainable & Smart Designs  
Let us bring your vision to life!🚀
`;


const services = `
🔹 Full-Service Interior Design  
🏡 Residential Interior Design  
🏢 Commercial Interior Design  
📐 Space Planning & Layout Optimization  
🛋️ Furniture Selection & Customization  
🎨 Color Consultation & Material Selection  
🖥️ 3D Visualization & Rendering  
🔨 Renovation & Remodeling  
💡 Smart Home & Lighting Design  
🌱 Sustainable & Eco-Friendly Design  
🏠 Staging & Styling  
`; // Services offered by the company


let userMessage = null; // Variable to store user's message
const inputInitHeight = chatInput.scrollHeight;

// API configuration
const API_KEY = "AIzaSyBraQ3zwBRRz_ijdqScdvxPdV65BpnG26Y"; // Your API key here
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const createChatLi = (message, className) => {
  // Create a chat <li> element with passed message and className
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", `${className}`);
  let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined"><img class="chatpng" src="chat-bot (1).png"></span><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi; // return chat <li> element
};

const generateResponse = async (chatElement) => {
  const messageElement = chatElement.querySelector("p");

     if (userMessage.toLowerCase().includes("contact") || userMessage.toLowerCase().includes("company")) {
    messageElement.textContent = `📢 Company Info:\nName: ${companyData.name}\n📧 Email: ${companyData.email}\n📞 Phone: ${companyData.phone}\n📍 Address: ${companyData.address}\n🌐 Website: ${companyData.website}`;
    return;
}

if (userMessage.toLowerCase().includes("ceo") || userMessage.toLowerCase().includes("founder")) {
    messageElement.textContent = `👤 Meet Our CEO  
🔹 Name: ${ceoInfo.name}  
🏢 Title: ${ceoInfo.title}  
📖 Bio: ${ceoInfo.bio}  
✉️ Email: ${ceoInfo.email}  
🔗 LinkedIn: ${ceoInfo.linkedin}`;
    return;
}

if (userMessage.toLowerCase().includes("manager") || userMessage.toLowerCase().includes("project manager")) {
    messageElement.textContent = `👤 Meet Our Project Manager 
🔹 Name: ${managerInfo.name}
🏢 Title: ${managerInfo.title}
📖 Bio: ${managerInfo.bio}
✉️ Email: ${managerInfo.email}
🔗 LinkedIn: ${managerInfo.linkedin}`;
    return;
    }

if (userMessage.toLowerCase().includes("assistant") || userMessage.toLowerCase().includes("assistant manager")) {
    messageElement.textContent = `👤 Meet Our Assistant Manager
🔹 Name: ${assistantInfo.name}
🏢 Title: ${assistantInfo.title}
📖 Bio: ${assistantInfo.bio}
✉️ Email: ${assistantInfo.email} 
🔗 LinkedIn: ${assistantInfo.linkedin}`;
    return;
}   

if (userMessage.toLowerCase().includes("services") || userMessage.toLowerCase().includes("service")) {
    messageElement.textContent = `📢 Services Offered:\n${services}`;
    return;
}

if (userMessage.toLowerCase().includes("purpose") || userMessage.toLowerCase().includes("mission")) {
    messageElement.textContent = companyPurpose;
    return;
}

  // Define the properties and message for the API request
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: userMessage }],
        },
      ],
    }),
  };

  // Send POST request to API, get response and set the reponse as paragraph text
  try {
    const response = await fetch(API_URL, requestOptions);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error.message);

    // Get the API response text and update the message element
    messageElement.textContent = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1");
  } catch (error) {
    // Handle error
    messageElement.classList.add("error");
    messageElement.textContent = error.message;
  } finally {
    chatbox.scrollTo(0, chatbox.scrollHeight);
  }
};

const handleChat = () => {
  userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
  if (!userMessage) return;

  // Clear the input textarea and set its height to default
  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;

  // Append the user's message to the chatbox
  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {
    // Display "Thinking..." message while waiting for the response
    const incomingChatLi = createChatLi("Thinking...", "incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    generateResponse(incomingChatLi);

       if (userMessage.toLowerCase().includes("contact") || userMessage.toLowerCase().includes("company")) {
        incomingChatLi.querySelector("p").textContent = `📢 Company Info:\nName:${companyData.name}\n📧 Email: ${companyData.email}\n📞 Phone: ${companyData.phone}\n📍 Address: ${companyData.address}\n🌐 Website: ${companyData.website}`;
    } 
    
    if (userMessage.toLowerCase().includes("ceo") || userMessage.toLowerCase().includes("founder")) {
        incomingChatLi.querySelector("p").textContent = `👤 Meet Our CEO  
        🔹 Name: ${ceoInfo.name}  
        🏢 Title: ${ceoInfo.title}  
        📖 Bio: ${ceoInfo.bio}  
        ✉️ Email: ${ceoInfo.email}  
        🔗 LinkedIn: ${ceoInfo.linkedin}`;
    }

    if (userMessage.toLowerCase().includes("manager") || userMessage.toLowerCase().includes("project manager")) {
        incomingChatLi.querySelector("p").textContent = `👤 Meet Our Project Manager
        🔹 Name: ${managerInfo.name}
        🏢 Title: ${managerInfo.title}
        📖 Bio: ${managerInfo.bio}
        ✉️ Email: ${managerInfo.email}
        🔗 LinkedIn: ${managerInfo.linkedin}`;
    }

    if (userMessage.toLowerCase().includes("assistant") || userMessage.toLowerCase().includes("assistant manager")) {
        incomingChatLi.querySelector("p").textContent = `👤 Meet Our Assistant Manager
        🔹 Name: ${assistantInfo.name}
        🏢 Title: ${assistantInfo.title}
        📖 Bio: ${assistantInfo.bio}
        ✉️ Email: ${assistantInfo.email}
        🔗 LinkedIn: ${assistantInfo.linkedin}`;
    }

    if (userMessage.toLowerCase().includes("services") || userMessage.toLowerCase().includes("service")) {
        incomingChatLi.querySelector("p").textContent = `📢 Services Offered:\n${services}`;
    }
    if (userMessage.toLowerCase().includes("purpose") || userMessage.toLowerCase().includes("mission")) {
        incomingChatLi.querySelector("p").textContent = companyPurpose;
    }
    else {
        generateResponse(incomingChatLi);
    }
  }, 600);
};

chatInput.addEventListener("input", () => {
  // Adjust the height of the input textarea based on its content
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  // If Enter key is pressed without Shift key and the window
  // width is greater than 800px, handle the chat
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
