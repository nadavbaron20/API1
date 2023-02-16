class DisplayToHtml {
    #title;
    #image;
    #description;
    constructor(imageInput, descriptionInput, titleInput){
        this.#title = titleInput;
        this.#image = imageInput;
        this.#description = descriptionInput;
    }
    render() {
        let titleID = document.getElementById('titleID');
        let imgID = document.getElementById('imgID');
        let descriptionID = document.getElementById('descriptionID');
        
        titleID.innerText = this.#title;
        imgID.src = this.#image;
        descriptionID.innerText = this.#description;
    }
}
class LocalStorageControl {
    constructor() {}
    saveToLocalStorage(newData) {
        let arrayFromStorage = [];
        if(localStorage.getItem('skyInfo')) {
            arrayFromStorage = JSON.parse(localStorage.getItem('skyInfo'));
            arrayFromStorage.push(newData);
        } else {
            arrayFromStorage.push(newData);
        }
        localStorage.setItem('skyInfo', JSON.stringify(arrayFromStorage));
    }
    compareWithExistentData(newData) {
        let isObjectSaved = false;
        let localInformation = JSON.parse(localStorage.getItem('skyInfo'));
        
        if (localInformation != null) {
                localInformation.forEach((oldPicture)=>{
                if(oldPicture.url == newData.url) {
                    isObjectSaved = true;
                }
            });
        }
        return isObjectSaved;
    }
}
class HandleAPIResponse {
    #response;
    constructor(inputResponse) {
        this.#response = inputResponse;
    }
    save() {
        let newLocalStorage = new LocalStorageControl();
        if (!newLocalStorage.compareWithExistentData(this.#response)) {
            newLocalStorage.saveToLocalStorage(this.#response);
        }
    }
    display() {
        let screen = new DisplayToHtml(this.#response.url, this.#response.explanation, this.#response.title);
        screen.render();
    }
}
let Request = fetch("https://go-apod.herokuapp.com/apod");
Request.then((response)=>response.json()).then((data)=>{
    let newResponse = new HandleAPIResponse(data);
    newResponse.save();
    newResponse.display();
});