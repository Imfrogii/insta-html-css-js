let userName = main.getUserName();
const like = document.getElementsByClassName("button-like");
for (let i of like)
  i.addEventListener("click", doLike);

function doLike(event) {
  let post = main.getPhotoPost(this.id);
  let check = false;
  for (let i of post.likes) {
    if (userName === i) {
      check = true;
      this.src = "img/like.png"
      delete post.likes[post.likes.indexOf(i)];
      post.likes.clean(undefined);
      break;
    }
  }
  if (check === false) {
    this.src = "img/like2.png"
    post.likes.push(userName);
  }
  View.update(post);
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
      for (let i of refactor)
        i.addEventListener("click", showRefactor);
      for (let i of deletee)
        i.addEventListener("click", doDelete);
      for (let i of like)
        i.addEventListener("click", doLike);
      document.removeEventListener('mousedown', closeRefactor);
    }
  } else
    alert("Некорректные данные");
}


const search = document.getElementsByClassName("search-button")[0];
search.addEventListener("click", doSearch);

function doSearch(event) {
  event.preventDefault();
  alert("Поиск");
}

const add = document.getElementsByClassName("add-photo")[0];
add.addEventListener("click", showAdd);

const addPopUp = document.querySelector('#add-form');

function showAdd(event) {
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
    for (let i of refactor)
      i.addEventListener("click", showRefactor);
    for (let i of deletee)
      i.addEventListener("click", doDelete);
    for (let i of like)
      i.addEventListener("click", doLike);
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
     // sendFiles(files);
     reader.onloadend = function () {
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
  alert("Вход");
}

function doSign(event) {
  event.preventDefault();
  alert("Регистрация");
}

const exit = document.getElementsByClassName("exit")[0];
exit.addEventListener("click", doExit);

function doExit(event) {
  event.preventDefault();
  main.logOut();
  alert("Выход");
}
