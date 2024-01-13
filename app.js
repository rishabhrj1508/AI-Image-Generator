const API_KEY = "your api key";

const submitIcon = document.querySelector("#submit-icon");

const inputElement = document.querySelector("input");

const imageSection = document.querySelector('.images-section');

const loadingSpinner = document.querySelector('.loading-spinner');

const getImages = async () => {

    loadingSpinner.style.display = 'block'; // Show the loading spinner

    // Clear previous images
    imageSection.innerHTML = '';

    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            prompt: inputElement.value,
            n: 1,
            size: "512x512",
        }),
    };
    try {
        const response = await fetch("https://api.openai.com/v1/images/generations", options);
        const data = await response.json();


        data?.data.forEach(imageObj => {

            const imageContainer = document.createElement('div');

            imageContainer.classList.add('image-container');

            const imageElement = document.createElement('img');

            imageElement.setAttribute('src', imageObj.url);

            imageContainer.append(imageElement);

            imageSection.append(imageContainer);

        });

    } catch (error) {
        console.error(error);
    } finally {
        loadingSpinner.style.display = 'none'; // Hide the loading spinner
    }
};

submitIcon.addEventListener('click', getImages);






