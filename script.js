debugger

// getAllBreedsPromise()
// getBreedByStringPromise(breedQuery)

// + 1. Создать функцию для получения всех пород собак (возврощает промис)
// + 2.1 Создать функцию для получения породы собаки по строке (возврощает промис) https://api.thedogapi.com/v1/breeds/search?q=ala
// + 2.2 Создать функцию для получения картинки по id породы (возврощает промис)
// 3. Создать функцию для вывода списка пород
// 4. Создать функцию для вывода карточки с породой


createListFromBreeds(brredsArray) {

    return ; // новый елемент в котором уже создан список пород.
}

createCardFromBreed(breed) {

    return ; // новый елемент в котором уже создана карточка с породой.
}


$(document).ready(() => {
    const listContainer = document.getElementById('container');
    const cardContainer = document.getElementById('card-container');
    const searchBreedBtn = document.getElementById('js-btn-search');
    const userBreedInput = document.getElementById('js-input-search');

    getAllBreedsPromise()
        .then(breedsArray => listContainer.appendChild(createListFromBreeds(breedsArray)));

    searchBreedBtn.addEventListener('click', (event) => {

        getBreedByStringPromise(userBreedInput.value)
            .then(breedInfo => cardContainer.appendChild(createCardFromBreed(breedInfo)))
    });
});









const searchBreedBtn = document.getElementById('js-btn-search');  //записываю кнопку поиска
const userBreedInput = document.getElementById('js-input-search'); //записываю инпут

const infoTextAboutBreedContainer = document.getElementById('js-info__text');  //записываю див инфы
const infoTextBreedName = document.getElementById('js-info__name');  //заголовок названия породы

const infoTextAboutBreed = document.createElement('p');  //создаю абзац для текст с хар-ми

const infoText = document.getElementById('js-display-none');  //класс для скрытия/показа дива с инфой

let breedId;  //переменная для записи ид

const dogImgContainer = document.getElementById('js-info__image');  //контейнер-див для фото

const dogImg = document.createElement('img');  //фото породы  и класс
dogImg.className = 'image-dog';

const spinner = document.getElementById('js-spinner-id');


searchBreedBtn.addEventListener('click', (event) => {
    spinner.classList.remove('js-spinner');  //показываю спиннер загрузки
    superagent
        .get('https://api.thedogapi.com/v1/breeds')

        .then((res) => {
            //сравнение введеной породы и даты с дог апи
            // const filteredNames = res.body.find(obj=> {return userBreedInput.value == obj.name;} );
            // console.log('filteredNames: ', filteredNames);

            res.body.forEach(obj => {
                if (userBreedInput.value == obj.name) {
                    infoTextBreedName.innerText = obj.name;  //добавляю имя породы в загаловок
                    //добавляю описание породы в абзац инфо
                    infoTextAboutBreed.innerText = `Weight: ${obj.weight.metric} kg \n Height: ${obj.height.metric} cm \n ${obj.temperament} \n Life span: ${obj.life_span}`
                    infoTextAboutBreedContainer.append(infoTextAboutBreed);  //добавляю абзац инфо в див контейнер

                    breedId = obj.id;   //сохраняю  и вовзращаю айди породы для поиска картинки
                }
            })
            return superagent
                .get('https://api.thedogapi.com/v1/images/search?breed_id=' + breedId); //поиск фото по айди;
        })

        .then((res) => {
            dogImg.src = res.body[0].url;  //сохраняю ссылку в тег картинки и добавляю в контейнер

            dogImgContainer.append(dogImg);

            spinner.classList.add('js-spinner');  //убираю спиннер

            infoText.classList.remove("dogs__about"); //убираю класс скрытия
        })
        .catch(err =>
            console.log('ERROR')
        );
})
