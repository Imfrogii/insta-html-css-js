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
    if(more)
      more.parentNode.removeChild(more);
  }
  static showMorePostsButton(){
    let more = document.getElementsByClassName("more-photos-template")[0];
      let content= more.content.cloneNode(true);
      more.parentNode.appendChild(content);
      const morePosts = document.getElementsByClassName("more-photos")[0];
      morePosts.addEventListener("click", function(event){
        event.preventDefault();
        main.get(main.getNumPosts() - main.getMorePosts());
        scroll(0,0);
      });
  }
  static update(post) {
    let template = document.getElementById(post.id);
    View.showLikes(post, template);
  }

  static _createPost(post, postOfUser) {
    let template = document.querySelector("#photo-template");
    let content = template.content.cloneNode(true);
    let all = (content.querySelector(".all-photos")).parentNode;
    all.setAttribute("id", main.getId(post));
    let buttons = content.querySelector(".buttons-user");
    let buttonLike = content.querySelector(".button-like");
    buttonLike.setAttribute("id", main.getId(post));
    let del = buttons.querySelector(".delete");
    del.setAttribute("id", main.getId(post));
    let refactor = buttons.querySelector(".refactor");
    refactor.setAttribute("id", main.getId(post));
    View.showPhoto(post, content);
    View.showHeaderPost(post, content);
    View.showLikes(post, content);
    View.showComments(post, content);
    if (postOfUser) {
      View.showButtonsUser(content);
      refactor.addEventListener("click", showRefactor);
      del.addEventListener("click", doDelete);
    }
    buttonLike.addEventListener("click", doLike);
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

  static showRefact(photo) {
    let refactorPopUp = document.querySelector('.refactor-form');
    refactorPopUp.style.display = "grid";
    let photoRefactor = refactorPopUp.querySelector("img");
    photoRefactor.src = photo.photoLink;
    let descriptionRefactor = refactorPopUp.querySelector(".descriprion-refactor");
    descriptionRefactor.value = photo.descriprion;
    let hashtagsRefactor = refactorPopUp.querySelector(".hashtags-refactor");
    if (photo.hashtags !== {}) {
      let string = "";
      for (let i of photo.hashtags)
        string += i + " ";
      string = string.slice(0, -1);
      hashtagsRefactor.value = string;
    }
  }

  static showAdd(photo) {
    let addPopUp = document.querySelector('#add-form');
    addPopUp.style.display = "grid";
  }

  static showLikes(post, content) {
    let likes = content.querySelector(".people-likes");
    if (post.likes.length !== 0) {
      let endStr = post.likes[0].toString() + " и еще " + (post.likes.length - 1).toString() + " лайкнули";
      likes.innerHTML = endStr;
      let username = main.getUserName();
      for (let i of post.likes) {
        if (i === username) {
          let button = content.querySelector(".button-like");
          button.src = "img/like2.png";
        }
      }
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
    let hashtags = template.querySelector(".hashtags");
    if (post.hashtags.length !== 0)
      for (let i = 0; i < post.hashtags.length; i++) {
        let tags = document.createElement("a");
        hashtags.appendChild(tags);
        tags.innerHTML = post.hashtags[i];
        tags.style.display = "inline-block";
        tags.addEventListener("click", findOnClickHashtags);
      }
  }

  static showExamples(photoPosts, lastFilter) {
    let template = document.getElementsByClassName("search-form")[0];
    let datalist = template.querySelector("#search-line0");
    for (let i = 0; i < photoPosts._photoPosts.length; i++) {
      let option = document.createElement('option');
      option.text = photoPosts._photoPosts[i].author; //просто чтобы показать, в итоге будет по зарегистрированным пользователям
      datalist.appendChild(option);
    }
    datalist = template.querySelector("#search-line1");
    for (let i = 0; i < photoPosts._photoPosts.length; i++) { //просто чтобы показать, в итоге будет по зарегистрированным пользователям
      if (lastFilter.likes !== undefined) {
        let option = document.createElement('option');
        option.text = photoPosts._photoPosts[i].author;
        datalist.appendChild(option);
      }
    }
    datalist = template.querySelector("#search-line2");
    let str = "";
    if (lastFilter.hashtags !== undefined) {
      for (let item of lastFilter.hashtags) {
        str += item + " ";
      }
      let option = document.createElement('option');
      option.text = str;
      datalist.appendChild(option);
    }
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
          main.replaceChild(View._createPost(post, true, true), i);
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
