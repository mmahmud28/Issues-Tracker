const loadingSpinner = document.getElementById("loading-spinner");

function showLoading() {
    loadingSpinner.classList.remove('hidden')
}

function removeLoading() {
    loadingSpinner.classList.add('hidden')
}

const allButton = document.getElementById('all-button');
const openButton = document.getElementById('open-button');
const closeButton = document.getElementById('close-button');

let cardSize = document.getElementById('cardSize');

function buttonInactive(buttonId) {


    if (buttonId == "all") {
        allButton.classList.add("btn-primary");
        openButton.classList.remove("btn-primary");
        closeButton.classList.remove("btn-primary");
        searchInput.value = "";

    } else if (buttonId == "open") {
        allButton.classList.remove("btn-primary");
        openButton.classList.add("btn-primary");
        closeButton.classList.remove("btn-primary");
        const filterData = allDataCard.filter(problem => problem.priority === "high" || problem.priority === "medium")
        displayData(filterData)

        cardSize.innerText = filterData.length;

    } else if (buttonId == "close") {
        allButton.classList.remove("btn-primary");
        openButton.classList.remove("btn-primary");
        closeButton.classList.add("btn-primary");
        const filterData = allDataCard.filter(problem => problem.priority === "low")
        displayData(filterData)

        cardSize.innerText = filterData.length;

    }

}

let allDataCard = [];
async function loadDate() {
    showLoading();
    const res = await (fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues"));
    const data = await res.json();
    allDataCard = data.data;
    displayData(allDataCard);

}
const cardBox = document.getElementById('card-container-box');
const cardContainer = document.getElementById('card-container');

const searchInput = document.getElementById('seach-input');

function SearchData() {
    const searchData = searchInput.value;
    filterSearch(searchData);

    if(searchData==0){
        loadDate();
    }

    allButton.classList.add("btn-primary");
    openButton.classList.remove("btn-primary");
    closeButton.classList.remove("btn-primary");
}

async function filterSearch(searchData) {
    showLoading();
    const res = await (fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchData}`));
    const data = await res.json();
    allDataCard = data.data;
    displayData(allDataCard);
}

const displayData = (array) => {
    if(array.length==0){
        removeLoading();
        cardBox.classList.add("hidden");
    }else{
        cardBox.classList.remove("hidden");
    }
    cardContainer.innerHTML = "";
    cardSize.innerText = "";
    cardSize.innerText = array.length;
    array.forEach(problem => {

        const card = document.createElement("div");


        let priorityClass = "";
        let cardBorderClass = "";

        if (problem.priority === "high") {
            priorityClass = "bg-[#FEECEC] text-[#EF4444]";
            cardBorderClass = "border-[#00A96E]"
        } else if (problem.priority === "medium") {
            priorityClass = "bg-[#FFF6D1] text-[#F59E0B]";
            cardBorderClass = "border-[#00A96E]"
        } else if (problem.priority === "low") {
            priorityClass = "bg-[#EEEFF2] text-[#9CA3AF]";
            cardBorderClass = "border-[#A855F7]"
        }

        const datetime = problem.createdAt;
        const d = new Date(datetime);
        const formattedDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;

        card.innerHTML = `
         <div onclick="openModal(${problem.id})" id="ItemDesign" class="p-4 card shadow-2xl border-t-4 ${cardBorderClass}">

                    <div class="flex justify-between mb-2">
                        <img class="w-6 h-6" src="./assets/Open-Status.png" alt="">
                        <h2 id="priority" class="font-semibold px-6 py-2 rounded-full ${priorityClass}">${problem.priority || "No Data Available"}</h2>
                    </div>

                    <div class="space-y-4">
                        <div>
                            <h2 class="font-bold line-clamp-1">${problem.title || "No Data Available"}</h2>
                            <p class="text-[#64748B] line-clamp-2">${problem.description || "No Data Available"}</p>
                        </div>

                        <div class="flex gap-3 labels-container">
                            
                        </div>

                        <div class="divider"></div>

                        <div>
                            <p>#1 by ${problem.author || "No Data Available"}</p>
                            <p>${formattedDate || "No Data Available"}</p>
                        </div>
                    </div>

                </div>
        `;

        const labelsContainer = card.querySelector(".labels-container");


        problem.labels.forEach(function (label, index) {

            let icon = '<i class="fa-solid fa-bug"></i>';
            let bgColor = 'bg-[#FEECEC] text-[#EF4444] border-[#FECACA]';

            if (index === 1) {
                icon = '<i class="fa-solid fa-life-ring"></i>';
                bgColor = 'bg-[#FFF8DB] text-[#D97706] border-[#FDE68A]';
            }

            const labelsCard = document.createElement("div");
            labelsCard.innerHTML = `
             <h2 class="${bgColor} font-normal px-4 border text-center py-1 rounded-full whitespace-nowrap">
                                ${icon} ${label}
                            </h2>
            `;
            labelsContainer.appendChild(labelsCard);
        });

        cardContainer.appendChild(card)
        removeLoading();

    });
}
loadDate();

const myModal = document.getElementById("my_modal_4");
const modalTitle = document.getElementById("modal-title");
const mstatus = document.getElementById("status");
const assignee = document.getElementById("assignee");
const updatedAt = document.getElementById("updatedAt");
const description = document.getElementById("description");
const assignee2 = document.getElementById("assignee2");
const priority = document.getElementById("priority");
const labelContainer = document.getElementById("label-container");
const my_modal_4 = document.getElementById("my_modal_4");

async function openModal(cardId) {
    my_modal_4.classList.remove("hidden")
    const res = await (fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${cardId}`));
    const date = await res.json();
    const cardData = date.data;

    modalTitle.textContent = cardData.title || "No Data Available";
    mstatus.textContent = cardData.status || "No Data Available";
    assignee.textContent = "Opened by " + cardData.assignee || "No Data Available";
    updatedAt.textContent = cardData.updatedAt.split("T")[0] || "No Data Available";
    description.textContent = cardData.description || "No Data Available";
    assignee2.textContent = cardData.assignee || "No Data Available";


    mstatus.classList.remove("bg-[#00A96E]", "text-white",
        "bg-[#FEECEC]", "text-[#EF4444]");

    if (cardData.status === "closed") {
        mstatus.classList.add("bg-[#FEECEC]", "text-[#EF4444]");
    } else if (cardData.status === "open") {
        mstatus.classList.add("bg-[#00A96E]", "text-white");
    }
    mstatus.textContent = cardData.status || "No Data Available";

    priority.classList.remove("bg-[#FEECEC]", "text-[#EF4444]",
        "bg-[#FFF6D1]", "text-[#F59E0B]",
        "bg-[#EEEFF2]", "text-[#9CA3AF]");

    if (cardData.priority === "high") {
        priority.classList.add("bg-[#FEECEC]", "text-[#EF4444]");
    } else if (cardData.priority === "medium") {
        priority.classList.add("bg-[#FFF6D1]", "text-[#F59E0B]");
    } else if (cardData.priority === "low") {
        priority.classList.add("bg-[#EEEFF2]", "text-[#9CA3AF]");
    }

    priority.textContent = cardData.priority || "No Data Available";
    labelContainer.innerHTML = ""
    cardData.labels.forEach(function (label, index) {

        let icon = '<i class="fa-solid fa-bug"></i>';
        let bgColor = 'bg-[#FEECEC] text-[#EF4444] border-[#FECACA]';

        if (index === 1) {
            icon = '<i class="fa-solid fa-life-ring"></i>';
            bgColor = 'bg-[#FFF8DB] text-[#D97706] border-[#FDE68A]';
        }

        const labelsCard = document.createElement("div");
        labelsCard.innerHTML = `
            <h2 class="${bgColor} font-normal px-4 border text-center py-1 rounded-full whitespace-nowrap">
                                ${icon} ${label}
                            </h2>
            `;
        labelContainer.appendChild(labelsCard);
    });

    myModal.showModal();
}