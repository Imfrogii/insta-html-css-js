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

function showRefactor(event) {
  refactorPopUp.style.display = "grid";
  let photo = main.getPhotoPost(this.id);
  const photoRefactor = refactorPopUp.querySelector("img");
  photoRefactor.src = photo.photoLink;
  const descriptionRefactor = refactorPopUp.querySelector(".descriprion-refactor");
  descriptionRefactor.innerHTML = photo.descriprion;
  refactorPopUp.setAttribute("id", this.id);
  const hashtagsRefactor = refactorPopUp.querySelector(".hashtags-refactor");
  if (photo.hashtags !== {}) {
    let string = "";
    for (let i of photo.hashtags)
      string += i + " ";
    string = string.slice(0, -1);
    hashtagsRefactor.innerHTML = string;
  }
  document.addEventListener('mousedown', function(e) {
    if (e.target.closest('.refactor-form') === null) {
      refactorPopUp.style.display = 'none';
    }
  });
}


const buttonRefactorPopUp = refactorPopUp.querySelector("#refactorOk");
buttonRefactorPopUp.addEventListener("click", doRefactor)

function doRefactor(event) {
  event.preventDefault();
  let decript = refactorPopUp.querySelector(".descriprion-refactor");
  let hash = refactorPopUp.querySelector(".hashtags-refactor");
  let post = main.getPhotoPost(refactorPopUp.id);
  let newPost = {};
  newPost = Object.assign(newPost, post);
  newPost.descriprion = decript.value;
  newPost.hashtags = hash.value.split(" ");
  if (PostCollection._validatePhotoPost(newPost)) {
    if (confirm("Вы действительно хотите редактировать пост?")) {
      post.descriprion = decript.value;
      post.hashtags = hash.value.split(" ");
      refactorPopUp.style.display = 'none';
      main.editPost(main.getId(post), post);
      for (let i of refactor)
        i.addEventListener("click", showRefactor);
      for (let i of deletee)
        i.addEventListener("click", doDelete);
    }
  } else
    alert("Не корректные данные");
}


const search = document.getElementsByClassName("search-button")[0];
search.addEventListener("click", doSearch);

function doSearch(event) {
  event.preventDefault();
  alert("Поиск");
}

const add = document.getElementsByClassName("add-photo")[0];
add.addEventListener("click", doAdd);

function doAdd(event) {
  alert("Добавлено");
}


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
