"use strict"
let submitBtn
// ---get some meals 
/* let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("search");
let submitBtn; */
async function getData(){
    $(function(){
        // $('.loading').fadeIn(300)
        $('.loading').fadeOut(1000,function(){
            closeNav()
        // $('.loading').remove()
        })
        $('body').css('overflow','auto')
    })
    const responseApi = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const finalresponse = await responseApi.json();
     
    displayData(finalresponse.meals)
}
getData();
function displayData(data){
    let cols = ``;
    for(let i = 0 ; i < data.length ; i++ ){
        cols += `
        <div class="col-3 mb-4">
                    <div onclick="getDetails('${data[i].idMeal}')" class="item overflow-hidden rounded-2">
                        <div>
                            <img src="${data[i].strMealThumb}" alt="" class="w-100">
                        </div>
                        <div class="text d-flex align-items-center">
                            <h3 class="px-2">${data[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
        `
    }
    $("#rowData").html(cols)  ;
}
 function closeNav(){
    let widthNav = $('.nav-links').outerWidth()
    $('#nav').animate({left: -widthNav},500)
    
    $(".open-close-icon").removeClass("fa-x");
    $(".open-close-icon").addClass("fa-align-justify");
    $(".links li").animate({top: 300}, 500)
    
 }
 closeNav()
 function openNav(){
    $('#nav').animate({left:0},500)
    
    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");
    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({top: 0}, (i + 5) * 100)
    }
   
 }
 $("#nav i.open-close-icon").click(() => {
    if ($("#nav").css("left") == "0px") {
        closeNav()
    } else {
        openNav()
    }
})
//  ---get categories data 
async function getCategories(){
    $("#search").html('');
    $('.loading').fadeIn(300)
    const responseApi = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    const finalresponse = await responseApi.json();
     
    disCategories(finalresponse.categories)
    $('.loading').fadeOut(300)
 }
function disCategories(data){
    let cols = ``;
    for(let i = 0 ; i < data.length ; i++ ){
        cols += `
        <div class="col-3 mb-4">
                    <div onclick="getCategoriesMeals('${data[i].strCategory}')" class="meal item overflow-hidden rounded-2">
                        <div>
                            <img src="${data[i].strCategoryThumb}" alt="" class="w-100">
                        </div>
                        <div class="text text-center">
                            <h3 class="px-2">${data[i].strCategory}</h3>
                            <p>${data[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                        </div>
                    </div>
                </div>
        `
    } 
    $("#rowData").html(cols)  ;
}
// ---get area data 
async function getArea(){
    $("#search").html('');
    $('.loading').fadeIn(300)
    const responseApi = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const finalresponse = await responseApi.json();
    disArea(finalresponse.meals)
    $('.loading').fadeOut(300)
 }
function disArea(data){
    let cols = ``;
    for(let i = 0 ; i < data.length ; i++ ){
        cols += `
        <div class="col-3 mb-4">
                    <div onclick="getAreaMeals('${data[i].strArea}')" class="meal pointer text-center text-white">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3 class="px-2">${data[i].strArea}</h3>
                    </div>
                </div>
        `
    } 
    $("#rowData").html(cols)  ;
}
// ---get Ingredients data 
async function getIngredients(){
    $("#search").html('');
    $('.loading').fadeIn(300)
    const responseApi = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const finalresponse = await responseApi.json();
     
    disIngredients(finalresponse.meals.slice(0, 20))
    $('.loading').fadeOut(300)
 }
function disIngredients(data){
    let cols = ``;
    for(let i = 0 ; i < data.length ; i++ ){
        cols += `
        <div class="col-3 mb-4">
                    <div onclick="getIngredientsMeals('${data[i].strIngredient}')" class="meal pointer text-center text-white">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3 class="px-2">${data[i].strIngredient}</h3>
                        <p>${data[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        `
    } 
    $("#rowData").html(cols)  ;
}
 function displayMeals(data){
    let cols = "";

    for (let i = 0; i < data.length; i++) {
        cols += ` 
        <div class="col-3 mb-4">
                    <div onclick="getDetails(${data[i].idMeal})" class="item overflow-hidden rounded-2">
                        <div>
                            <img src="${data[i].strMealThumb}" alt="" class="w-100">
                        </div>
                        <div class="text d-flex align-items-center">
                            <h3 class="px-2">${data[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
        `
    }
    $("#rowData").html(cols);
    
} 
 async function getCategoriesMeals(categories){
    $('.loading').fadeIn(300)
    const responseApi = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categories}`)
    const finalresponse = await responseApi.json();
    displayMeals(finalresponse.meals.slice(0,20))
    $('.loading').fadeOut(300)
} 
async function getAreaMeals(Area){
    $('.loading').fadeIn(300)
    const responseApi = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`)
    const finalresponse = await responseApi.json();
    displayMeals(finalresponse.meals.slice(0,20))
    $('.loading').fadeOut(300)
} 
async function getIngredientsMeals(Ingredients){
    $('.loading').fadeIn(300)
    const responseApi = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredients}`)
    const finalresponse = await responseApi.json();
    displayMeals(finalresponse.meals.slice(0,20))
    $('.loading').fadeOut(300)
} 
async function getDetails(id){
    $('.loading').fadeIn(300)
    const responseApi = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    const finalresponse = await responseApi.json();
    displayDetails(finalresponse.meals )
    $('.loading').fadeOut(300)
}
 
function displayDetails(data){
    let meal = data[0]
    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert-item m-2 p-1 rounded-2">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
            
        }
         
    }

    let tags = meal.strTags?.split(",")
    // let tags = meal.strTags.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }

    let cols = ``;
    for (let i = 0; i < data.length; i++) {
        cols += ` 
        <div class="col-4">
                <div class="rounded-3 overflow-hidden">
                    <img src="${data[i].strMealThumb}" alt="" class="w-100">
                </div>
                <h2 class="text-white">${data[i].strMeal}</h2>
            </div>
            <div class="col-8">
                <div class="text-white">
                    <h2>Instructions</h2>
                    <p>${data[i].strInstructions}</p>
                    <h3><span class="fw-bolder">Area :</span> ${data[i].strArea}</h3>
                    <h3><span class="fw-bolder">Category :</span> ${data[i].strCategory}</h3>
                    <h3><span class="fw-bolder">Recipes :</span></h3>
                    <ul class="d-flex list-unstyled text-black flex-wrap">
                    ${ingredients}
                     
                   </ul>
                    <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>
                     
                    <a href="${data[i].strSource}" target="_blank" class="btn btn-success">Sourse</a>   
                    <a href="${data[i].strYoutube}" target="_blank" class="btn btn-danger">Youtube</a> 
                </div>
            </div>
        `
    }
    $("#rowData").html(cols);
    
} 
// ---search 
function searchInput() {
    
    $("#search").html( `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFristLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`)

     
    $("#rowData").html('')
}
async function searchByName(name) {
    // closeNav()
    $("#rowData").html('');
    $(".loading").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    response = await response.json()
     
    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".loading").fadeOut(300)
}
async function searchByFristLetter(letter) {
    // closeNav()
    $("#rowData").html('');
    $(".loading").fadeIn(300)

    letter == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".loading").fadeOut(300)
}
// ----contact us
function showContact() {
    $("#rowData").html( `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center contain">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `)
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}