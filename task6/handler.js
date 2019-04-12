// window.addEventListener("onload",function(){
  // let returnObj = JSON.parse(localStorage.getItem("Posts"));
//   document.addEventListener("onload",function(){
//   localStorage.setItem("Posts","");
//   if(localStorage["Posts"]!=="");
//   main.replaceLocalPhotoPosts();
// });

const like = document.getElementsByClassName("button-like");
for (let i of like)
  i.addEventListener("click", doLike);

function doLike(event) {
  let post = main.getPhotoPost(this.id);
  let indexStartPost = main.getPhotoposts().indexOf(post);
  let check = false;
  let userName = main.getUserName();
  if (userName ==="")
    return false;
  for (let i of post.likes) {
    if (userName === i) {
      check = true;
      this.src = "img/like.png"
      delete post.likes[post.likes.indexOf(i)];
      post.likes.clean(undefined);
      main.replaceSomePhotoPosts(indexStartPost, post);
      break;
    }
  }
  if (check === false) {
    this.src = "img/like2.png"
    post.likes.push(userName);
    main.replaceSomePhotoPosts(indexStartPost, post);
  }
  View.update(post);
  localStorage["Posts"] = JSON.stringify(main.getPhotoposts());
  console.log(post.likes);
}

const deletee = document.getElementsByClassName("delete");
for (let i of deletee)
  i.addEventListener("click", doDelete);

function doDelete(event) {
  if (confirm("Вы действительно хотите удалить пост?"))
    main.deletePost(this.id);
}

const refactor = document.getElementsByClassName("refactor");
for (let i of refactor)
  i.addEventListener("click", showRefactor);

const refactorPopUp = document.querySelector('.refactor-form');
let postId;

function showRefactor(event) {
  postId = this.id;
  View.showRefact(main.getPhotoPost(postId));
  document.addEventListener('mousedown', closeRefactor);
}

function closeRefactor(event) {
  if (event.target.closest('.refactor-form') === null) {
    refactorPopUp.style.display = 'none';
    document.removeEventListener('mousedown', closeRefactor);
  }
}

function addButtonsListeners() {
  for (let i of refactor)
    i.addEventListener("click", showRefactor);
  for (let i of deletee)
    i.addEventListener("click", doDelete);
  for (let i of like)
    i.addEventListener("click", doLike);
}

const buttonRefactorPopUp = refactorPopUp.querySelectorAll(".refactorOk");
for (let i of buttonRefactorPopUp)
  i.addEventListener("click", doRefactor);

function doRefactor(event) {
  event.preventDefault();
  let decript = refactorPopUp.querySelector(".descriprion-refactor");
  let hash = refactorPopUp.querySelector(".hashtags-refactor");
  let post = main.getPhotoPost(postId);
  let newPost = {};
  newPost = Object.assign(newPost, post);
  newPost.descriprion = decript.value;
  newPost.hashtags = hash.value.split(" ");
  if (PostCollection._validatePhotoPost(newPost)) {
    if (confirm("Вы действительно хотите редактировать пост?")) {
      post = newPost;
      main.editPost(main.getId(post), post);
      refactorPopUp.style.display = "none";
      addButtonsListeners();
      document.removeEventListener('mousedown', closeRefactor);
    }
  } else
    alert("Некорректные данные");
}

const searchForm = document.getElementsByClassName("search-form")[0];
const search = searchForm.getElementsByClassName("search-button")[0];
search.addEventListener("click", doSearch);

const linkSmallSearchForm = document.getElementById("small-search");
const smallSearchForm = linkSmallSearchForm.querySelector(".small-search-form");
linkSmallSearchForm.addEventListener("click",function(event){
  event.preventDefault();
  smallSearchForm.style.display = "block";
});
const smallSearch = smallSearchForm.querySelector("#small-search-button")
smallSearch.addEventListener("click", doSmallSearch);

function doSearch(event) {
  event.preventDefault();
  let inputes = searchForm.getElementsByTagName("input");
  let author = inputes[0];
  let likes = inputes[1];
  let hashtags = inputes[2];
  let filter = {};
  if (author.value !== "")
    filter.author = author.value;
  if (likes.value !== "")
    filter.likes = likes.value;
  if (hashtags.value !== "")
    filter.hashtags = hashtags.value.split(" ");
  main.get(filter);
  alert("Поиск");
}

function doSmallSearch(event) {
  event.preventDefault();
  let inputes = smallSearchForm.getElementsByTagName("input");
  let author = inputes[0];
  let likes = inputes[1];
  let hashtags = inputes[2];
  let filter = {};
  if (author.value !== "")
    filter.author = author.value;
  if (likes.value !== "")
    filter.likes = likes.value;
  if (hashtags.value !== "")
    filter.hashtags = hashtags.value.split(" ");
  main.get(filter);
  alert("Поиск");
}

function findOnClickHashtags(event) {
  event.preventDefault();
  let filter = {};
  filter.hashtags = [];
  filter.hashtags.push(this.text);
  main.get(filter);
  alert("Найдено по запросу: "+ this.text);
}

const add = document.getElementsByClassName("add-photo")[0];
add.addEventListener("click", showAdd);
const smallAdd = document.getElementById("small-add");
smallAdd.addEventListener("click", showAdd);

const addPopUp = document.querySelector('#add-form');

function showAdd(event) {
  event.preventDefault();
  View.showAdd();
  document.addEventListener('mousedown', closeAdd);
}

function closeAdd(event) {
  if (event.target.closest('#add-form') === null) {
    addPopUp.style.display = 'none';
    document.removeEventListener('mousedown', closeAdd);
  }
}

const buttonAddPopUp = addPopUp.querySelectorAll(".add-ok");
for (let i of buttonAddPopUp)
  i.addEventListener("click", doAdd);

function doAdd(event) {
  event.preventDefault();
  let decript = addPopUp.querySelector(".descriprion-add");
  let hash = addPopUp.querySelector(".hashtags-add");
  let post = {};
  if (decript.value !== "") {
    post.descriprion = decript.value;
    if (hash.value !== "")
      post.hashtags = hash.value.split(" ");
    let img = document.getElementsByClassName("to-upload-image")[0];
    post.photoLink = img.src;
  } else {
    alert("Добавьте описание");
    return;
  }
  if (main.add(post)) {
    alert("Добавлено успешно")
    addPopUp.style.display = "none";
    addButtonsListeners();
  } else
    alert("Некорректные данные");
}

let dropZone = document.getElementsByClassName("upload-container")[0];
dropZone.addEventListener("dragover", function(e) {
  e.preventDefault();
  e.stopPropagation();
  dropZone.classList.add('dragover');
});
dropZone.addEventListener("dragenter", function(e) {
  e.preventDefault();
  e.stopPropagation();
  dropZone.classList.add('dragover');
});

dropZone.addEventListener("dragleave", function(e) {
  e.preventDefault();
  e.stopPropagation();
  dropZone.classList.remove('dragover');
});
dropZone.addEventListener('drop', function(e) {
  e.preventDefault();
  e.stopPropagation();
  dropZone.classList.remove('dragover');
  let reader = new FileReader();
  let files = e.dataTransfer.files;
  reader.onloadend = function() {
    let img = document.getElementsByClassName("to-upload-image")[0];
    img.src = reader.result;
  }
  let link = reader.readAsDataURL(files[0]);
});

const moreDescr = document.getElementsByClassName("more-description");
for (let i of moreDescr)
  i.addEventListener("click", doMoreDescr);

function doMoreDescr(event) {
  alert("Еще");
}


const moreComm = document.getElementsByClassName("more-comments");
for (let i of moreComm)
  i.addEventListener("click", doMoreComm);

function doMoreComm(event) {
  alert("Показано");
}

const logSign = document.getElementsByClassName("not-logIn")[0];
const log = logSign.querySelector("a");
const sign = logSign.querySelectorAll("a")[1];

log.addEventListener("click", doLog);
sign.addEventListener("click", doSign);

function doLog(event) {
  event.preventDefault();
  let userLogin = logSign.querySelectorAll("input");
  let password = userLogin[1];
  let reg = /^[A-Za-z0-9]{3,}$/;
  if (reg.test(userLogin[0].value) && password.value !== "") {
    main.logIn(userLogin[0].value, password);
    userLogin[0].value = "";
    password.value = "";
  } else alert("Неправильный логин или пароль");
}

function doSign(event) {
  event.preventDefault();
  let userLogin = logSign.querySelectorAll("input");
  let email = userLogin[3].value;
  let password = userLogin[4].value;
  let confirmPassword = userLogin[5].value;
  let reg = /^[A-Za-z0-9]{3,}$/;
  if (reg.test(userLogin[2].value) && password.value !== "" && validate(email)) {
    if (password === confirmPassword) {
      main.signIn(userLogin[2].value, password, email);
      userLogin[2].value = "";
      userLogin[3].value = "";
      userLogin[4].value = "";
      userLogin[5].value = "";
    } else alert("Пароли не совпадают");
  } else alert("Введите корректные данные");
}

function validate(email) {
  let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (reg.test(email) == false) {
    return false;
  }
  return true;
}

const exit = document.getElementsByClassName("exit");
for(let i of exit)
i.addEventListener("click", doExit);

function doExit(event) {
  event.preventDefault();
  main.logOut();
  // for (let i of like)
  //   i.removeEventListener("click", doLike);
  alert("Выход");
}
