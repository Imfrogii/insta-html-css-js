class View {
  static showHeader(userName) {
    let template = document.querySelector(".user");
    if (View._showIfLogIn(userName)) {
      let u = template.querySelectorAll('u');
      u[0].innerHTML = userName;
    } else
      View._showToLog();
  }

  static _showIfLogIn(userName) {
    let content = document.getElementsByClassName("menu_line")[0];
    let log = content.querySelector(".not-logIn");
    if (userName !== "") {
      let diffButtons = content.querySelector(".user-logined");
      log.style.display = "none";
      if (window.screen.availWidth > "910")
        diffButtons.style.display = "inline";
      else diffButtons.style.display = "none";

      //       if(window.screen.availWidth>"910")
      //       log.style.display = "inline-block";
      //       let diffButtons = content.querySelector(".user-logined");
      //       diffButtons.style.display = "none";
      //         window.addEventListener("resize", function() {
      //           if(window.screen.availWidth<="910"){
      //           log.style.display = "none";
      //       }
      //       else if(window.screen.availWidth>"910")
      //       log.style.display = 'inline-block';
      // }, false);
      return true;
    } else
      return false;
  }

  static _showToLog() {
    let content = document.getElementsByClassName("menu_line")[0];
    let log = content.querySelector(".not-logIn");
    let diffButtons = content.querySelector(".user-logined");
    diffButtons.style.display = "none";
    if (window.screen.availWidth <= "910")
      log.style.display = "none";
    else
      log.style.display = "inline-block";
  }

  static clear() {
    let full = document.getElementsByClassName("full-post");
    for (let i = 0; i < full.length; i++) {
      while (full[i])
        full[i].parentNode.removeChild(full[i]);
    }
    let more = document.getElementsByClassName("more-photos")[0];
    if (more.firstChild)
      more.removeChild(more.firstChild);
  }

  static update(post) {
    let template = document.getElementById(post.id);
    // View.showPhoto(post, template);
    View.showLikes(post, template);
    View.showComments(post, template);
  }

  static _createPost(post, postOfUser) {
    let template = document.querySelector("#photo-template");
    let content = template.content.cloneNode(true);
    let all = (content.querySelector(".all-photos")).parentNode;
    all.setAttribute("id", post.id);
    let buttons = content.querySelector(".buttons-user");
    let buttonLike = content.querySelector(".button-like");
    buttonLike.setAttribute("id", post.id);
    if (buttons !== "undefined") {
      let del = buttons.querySelector(".delete");
      del.setAttribute("id", post.id);
      let refactor = buttons.querySelector(".refactor");
      refactor.setAttribute("id", post.id);
    }
    View.showPhoto(post, content);
    View.showHeaderPost(post, content);
    View.showLikes(post, content);
    View.showComments(post, content);
    if (postOfUser)
      View.showButtonsUser(content);
    return content;
  }

  static showButtonsUser(content) {
    let buttons = content.querySelector(".buttons-user");
    buttons.style.display = "block";
  }

  static showPost(post, postOfUser) {
    let template = document.querySelector("#photo-template");
    template.parentNode.appendChild(View._createPost(post, postOfUser));
  }

  // static showPopUp() {
  //   let template = document.querySelector("#refact");
  //   template.parentNode.appendChild(template.firstChild);
  // }

  static showLikes(post, content) {
    let likes = content.querySelector(".people-likes");
    if (post.likes.length !== 0) {
      let endStr = post.likes[0].toString() + " и еще " + (post.likes.length - 1).toString() + " лайкнули";
      likes.innerHTML = endStr;
    } else likes.innerHTML = 0;

  }

  static showPhoto(post, content) {
    let photol = content.querySelector(".photo img");
    photol.src = post.photoLink;
  }

  static showHeaderPost(post, content) {
    let userPhoto = content.querySelector(".user-photo");
    let imgUser = userPhoto.querySelector("img");
    imgUser.src = "img/user-logo.png";
    let userName = userPhoto.querySelector(".username");
    userName.innerHTML = post.author;
    let time = userPhoto.querySelector(".time");
    time.innerHTML = View._createdAtToString(post.createdAt);
  }


  static showComments(post, content) {
    let template = content.querySelector(".all-comments");
    let userName = template.querySelector(".username u b");
    userName.innerHTML = post.author;
    let description = template.querySelector("i");
    if (post.descriprion.length < 30) {
      description.innerHTML = post.descriprion;
    } else {
      description.innerHTML = post.descriprion.slice(0, 30) + "...";
      let button = content.querySelector(".more-description");
      button.style.visibility = "visible";
      button.style.display = "inline";
    }
    let hashtags = template.querySelectorAll(".hashtags a");
    if (post.hashtags.length !== 0)
      for (let i = 0; i < post.hashtags.length; i++)
        hashtags[i].innerHTML = post.hashtags[i];
  }

  static showExamples(photoPosts, lastFilter) {
    let template = document.getElementsByClassName("search-form")[0];
    let datalist = template.querySelector("#search-line0");
    for (let i = 0; i < photoPosts._photoPosts.length; i++) {
      // datalist.option.innerHTML = photoPosts[i].author;
      let option = document.createElement('option');
      option.text = photoPosts._photoPosts[i].author; //просто чтобы показать, в итоге будет по зарегистрированным пользователям
      datalist.appendChild(option);
    }
    datalist = template.querySelector("#search-line1");
    // option = datalist.querySelectorAll("option");
    // for (let i = 0; i < inWhichFilter; i++) {
    for (let i = 0; i < photoPosts._photoPosts.length; i++) { //просто чтобы показать, в итоге будет по зарегистрированным пользователям
      if (lastFilter.likes !== undefined) {
        let option = document.createElement('option');
        option.text = photoPosts._photoPosts[i].author;
        datalist.appendChild(option);
      }
    }
    datalist = template.querySelector("#search-line2");
    // option = datalist.querySelectorAll("option");
    let str = "";
    // for (let i = 0; i < inWhichFilter; i++) {
    if (lastFilter.hashtags !== undefined) {
      for (let item of lastFilter.hashtags) {
        str += item + " ";
      }
      let option = document.createElement('option');
      option.text = str;
      datalist.appendChild(option);
    }
    // template.appendChild(datalist);
  }



  static delete(id) {
    let template = document.querySelector(".full-post").parentNode;
    let toDel = document.getElementById(id);
    if (toDel !== null) {
      template.removeChild(toDel);
    }
  }

  static refactor(id, post) {
    let main = document.querySelector('.full-post').parentNode;
    let node = document.querySelectorAll(".full-post");
    for (let i of node) {
      if (i.id == post.id) {
        if (i !== null)
          main.replaceChild(View._createPost(post, true), i);
        break;
      }
    }
  }


  static _createdAtToString(createdAt) {
    let result = '';
    if (createdAt.getHours() < 10) {
      result += '0'
    }
    result += createdAt.getHours() + ':';
    if (createdAt.getMinutes() < 10) {
      result += '0';
    }
    result += createdAt.getMinutes() + '<br>';
    if (createdAt.getDate() < 10) {
      result += '0';
    }
    result += createdAt.getDate() + ':';
    if (createdAt.getMonth() < 9) {
      result += '0';
    }
    result += (createdAt.getMonth() + 1) + ':' + createdAt.getFullYear();
    return result;
  }
}
