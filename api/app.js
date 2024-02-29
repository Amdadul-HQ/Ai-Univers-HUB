const loadData = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  const datas = await res.json();
  // console.log(datas);
  getData(datas);
};

const getData = async (datas) => {
  const data = datas.data.tools;
  const botMainContainer = getElementById("bots-main-container");
  console.log(botMainContainer);
  data.forEach((element) => {
    // console.log(element);
    const botContainer = document.createElement("div");
    botContainer.innerHTML = `
        <div class="p-6 rounded-2xl border h-[600px]">
                    <div>
                        <img class="rounded-2xl h-[250px] border" src="${element.image}" alt="">
                    </div>
                    <div class="space-y-4">
                        <h3 class="text-2xl font-semibold text-black mt-6">Features</h3>
                        <ol class="text-base font-normal pl-5 text-[#585858] list-decimal space-y-2">
                            <li>${element.features[0]}</li>
                            <li>${element.features[1]}</li>
                            <li>${element.features[2]}</li>
                        </ol>
                        <hr>
                        <div class="flex justify-between items-center">
                            <div class="space-y-4">
                                <h3 class="text-2xl font-semibold text-black">${element.name}</h3>
                                <p class="flex items-center gap-x-2">
                                    <img src="img/Frame.png" alt="">
                                    <span class="text-base font-medium text-[#585858]">${element.published_in}</span>
                                </p>
                            </div>
                            <div>
                                <button onclick="my_modal_4.showModal();showDeitls('${element.id}')" class="p-3 rounded-full bg-[rgba(254,247,247,1)]"><img src="img/arrow.png" alt=""></button>
                            </div>
                        </div>
                    </div>
                </div>`;
    botMainContainer.appendChild(botContainer);
  });
};

const showDeitls = async (id) => {
  console.log("clicked showDeitls");

  const res = await fetch(
    `https://openapi.programming-hero.com/api/ai/tool/${id}`
  );
  const data = await res.json();
  console.log(data);

  const showModal = getElementById("my_modal_4");
  showModal.innerHTML = `
    <div class="modal-box w-11/12 max-w-5xl">
    <div class="flex gap-3">
        <div class="p-9 bg-[rgba(235,87,87,0.05)] space-y-6 border-[#EB5757] border rounded-2xl h-[510px]">
            <h3 class="text-black font-semibold text-2xl w-[420px]">${data.data.description}</h3>
            <div class="flex text-base gap-x-2 justify-between font-bold text-center">
                <div class="text-[#03A30A] p-4 bg-white rounded-2xl">
                    <p>${data.data.pricing[0].price}</p>
                    <p>${data.data.pricing[0].plan}</p>
                </div>
                <div class="text-[#F28927] p-4 bg-white rounded-2xl">
                    <p>${data.data.pricing[1].price}</p>
                    <p>${data.data.pricing[1].plan}</p>
                </div>
                <div class="text-[#EB5757] p-4 bg-white rounded-2xl">
                    <p>${data.data.pricing[2].price}</p>
                    <p>${data.data.pricing[2].plan}</p>
                </div>
            </div>
            <div class="flex justify-between">
                <div>
                    <h3 class="text-black font-semibold text-2xl">Features</h3>
                    <ul class="text-base text-[#585858] font-normal list-disc">
                        <li>${data.data.features['1']?.feature_name}</li>
                        <li>${data.data.features['2']?.feature_name}</li>
                        <li>${data.data.features['3']?.feature_name}</li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-black font-semibold text-2xl">Integrations</h3>
                    <ul class="text-base text-[#585858] font-normal list-disc">
                        <li>${data.data.integrations[0] || ''}</li>
                        <li>${data.data.integrations[1] || ''}</li>
                        <li>${data.data.integrations[2] || ''}</li>
                </div>
            </div>
        </div>
        <div class="border rounded-2xl p-6 h-[510px]">
            <div class="relative">
            <img class="rounded-2xl border h-[340px] w-full" src="${data.data.image_link[0]}"/>
            <p class="px-3 py-2 text-white bg-[#EB5757] rounded-lg absolute top-0 right-0 mt-2 mr-2">${(data.data?.accuracy?.score)*100}% accuracy</p>
            </div>
            <h3 class="text-black font-semibold text-2xl text-center my-4">${data.data.input_output_examples[0].input}</h3>
            <p class="text-[#585858] font-normal text-base text-center">${data.data.input_output_examples[0].output}</p>
        </div>
    </div>           
        <div class="modal-action">
            <form method="dialog">
                 <!-- if there is a button, it will close the modal -->
                 <button class="btn">Close</button>
            </form>
        </div>
    </div>
    `;
};

loadData();
