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

    } else if (buttonId == "open") {
        allButton.classList.remove("btn-primary");
        openButton.classList.add("btn-primary");
        closeButton.classList.remove("btn-primary");
        const filterData = allDataCard.filter(problem=>problem.priority==="high" || problem.priority==="medium")
        displayData(filterData)

        cardSize.innerText = filterData.length;

    } else if (buttonId == "close") {
        allButton.classList.remove("btn-primary");
        openButton.classList.remove("btn-primary");
        closeButton.classList.add("btn-primary");
        const filterData = allDataCard.filter(problem=>problem.priority==="low")
        displayData(filterData)

        cardSize.innerText = filterData.length;
    }

}

let allDataCard = [];
async function loadDate() {

    const res = await (fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues"));
    const data = await res.json();
    allDataCard = data.data;
    displayData(allDataCard);

}
const cardContainer = document.getElementById('card-container');

const displayData = (array) => {
    console.log(array);
    cardContainer.innerHTML="";
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
         <div id="ItemDesign" class="p-4 card shadow-2xl border-t-4 ${cardBorderClass}">

                    <div class="flex justify-between mb-2">
                        <img class="w-6 h-6" src="./assets/Open-Status.png" alt="">
                        <h2 id="priority" class="font-semibold px-6 py-2 rounded-full ${priorityClass}">${problem.priority}</h2>
                    </div>

                    <div class="space-y-4">
                        <div>
                            <h2 class="font-bold line-clamp-1">${problem.title}</h2>
                            <p class="text-[#64748B] line-clamp-2">${problem.description}</p>
                        </div>

                        <div class="flex gap-3 labels-container">
                            
                        </div>

                        <div class="divider"></div>

                        <div>
                            <p>#1 by ${problem.author}</p>
                            <p>${formattedDate}</p>
                        </div>
                    </div>

                </div>
        `;

        const labelsContainer = card.querySelector(".labels-container");


        problem.labels.forEach(function (label) {

            const labelsCard = document.createElement("div");
            labelsCard.innerHTML = `
             <h2 class="bg-[#FEECEC] text-red-700 font-normal px-4 text-center py-1 rounded-full whitespace-nowrap">
                                <i class="fa-solid fa-bug text-sm"></i> ${label}
                            </h2>
            `;
            labelsContainer.appendChild(labelsCard);
        });

        cardContainer.appendChild(card)

    });
}
loadDate();