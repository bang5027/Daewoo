const UNSPLASH_API_KEY =
    "b491e86a6957b396f44f1e15e41d3d242e17aa982607f161b95defd195c7f4dd";
const UNSPLASH_URL = `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_API_KEY}&query=landscape&orientation=landscape`;

const body = document.querySelector("body");
const locationContainer = document.querySelector(".js-location span");
    
/**
 *  배경이미지 Load
 * 
 */
function loadBackground() {
    const savedImage = localStorage.getItem("bg");
    if (savedImage === null) {  // 로컬스토리지에 저장된 배경이 없으면
        getBackground();   
    } else {    // 로컬스토리이제 저장된 배경이 있으면
        const parsedImage = JSON.parse(savedImage);
        const today = new Date();
        if (today > parsedImage.expiresOn) {
            getBackground();
        } else {
            body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${
                parsedImage.url
            })`;
            locationContainer.innerHTML = `${parsedImage.name}, ${
                parsedImage.city
            }, ${parsedImage.country}`;
        }
    }
    return;
}

/**
 * 배경 이미지 가져오기
 */
function getBackground() {
   /**
    * ajax를 구현하는 기술 중 하나
    * fetch api는 네트워크 요청을 쉽게 활용할 수 있게 도와준다.
    * 
    *  */ 
    fetch(UNSPLASH_URL)
        .then(response => response.json())  // 받은 값을 json()을 통해 json으로 변환
        .then(json => {
            const image = json;
            if (image.urls && image.urls.full && image.location) {
                const fullUrl = image.urls.full;
                const location = image.location;
                const city = location.city;
                const country = location.country;
                const name = location.name;
                saveBackground(fullUrl, city, country, name);
            } else {
                getBackground();
            }
        });
    return;    
}

/**
 * 배경이미지 저장
 */
function saveBackground(imageUrl, city, country, name) {
    const savedImage = localStorage.getItem("bg");
    if (savedImage !== null) {  // 로컬스토리지에 저장된 배경이 있으면
        localStorage.removeItem("bg");  // 삭제
    }
    const expirationDate = new Date();  // 배경 만료일
    expirationDate.setDate(expirationDate.getDate() + 1);   // 배경은 하루동안 유지
    const imageObject = {
        url: imageUrl,
        expiresOn: expirationDate,
        city,
        country,
        name
    };
    localStorage.setItem("bg", JSON.stringify(imageObject));
    loadBackground();
    return;
}


function initApp() {
    loadBackground();
    return;
}

initApp();