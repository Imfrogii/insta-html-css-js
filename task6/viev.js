class View {
  static showHeader() {
    let template = document.querySelector("#header-menu");
    let temp = template.content.cloneNode(true);
    let u = temp.querySelectorAll('u');
    u[0].innerHTML = "user1";
    template.parentNode.appendChild(temp);
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

  static _createPost(post) {
    let template = document.querySelector("#photo-template");
    let content = template.content.cloneNode(true);
    let all = (content.querySelector(".all-photos")).parentNode;
    all.setAttribute("id", post.id);
    View.showPhoto(post, content);
    View.showHeaderPost(post, content);
    View.showLikes(post, content);
    View.showComments(post, content);
    return content;
  }

  static showPost(post) {
    let template = document.querySelector("#photo-template");
    template.parentNode.appendChild(View._createPost(post));
  }


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

  static showExamples(last3Filters, inWhichFilter) {
    let template = document.querySelector("#search-help");
    // document.getElementById('search-line0').options[i].text = "Txt";
    let content = template.content.cloneNode(true);
    let datalist = content.querySelectorAll("#search-line0")[0];

    // let option = datalist[0].querySelector("option");
    for (let i = 0; i < inWhichFilter; i++) {
      if (last3Filters[i].author !== undefined) {
        // alert(datalist.options[i].text);
        // option[i].value = last3Filters[i].author;
        datalist.options[i].text = last3Filters[i].author;
        // document.getElementById("#search-line0").options[i].text = "Txt";
        // alert(datalist.options[i].text);
      }
    }
    //     datalist = content.querySelector("#search-line1");
    //     option = datalist[0].querySelectorAll("option");
    //     for(let i = 0; i<inWhichFilter; i++){
    //       if(last3Filters[i].likes!==undefined)
    //       option[i].value = last3Filters[i].likes;
    //     }
    //
    // datalist = content.querySelector("#search-line2");
    //     option = datalist[2].querySelectorAll("option");
    //     for(let i = 0; i<inWhichFilter; i++){
    //       if(last3Filters[i].hashtags!==undefined)
    //       option[i].value = last3Filters[i].hashtags;
    //     }
    //
    //     datalist = content.querySelector("#search-line3");
    //     option = datalist[3].querySelectorAll("option");
    //     for(let i = 0; i<inWhichFilter; i++){
    //       if(last3Filters[i].skip!==undefined)
    //       option[i].value = last3Filters[i].skip;
    //     }
    //
    //     datalist = content.querySelector("#search-line4");
    //     option = datalist[0].querySelectorAll("option");
    //     for(let i = 0; i<inWhichFilter; i++){
    //       if(last3Filters[i].top!==undefined)
    //       option[i].value = last3Filters[i].top;
    //     }

    // content.appendChild(datalist)
    template.parentNode.appendChild(content);
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
    let node = document.getElementById(id);
    if (node !== null) {
      main.replaceChild(View._createPost(post), node);
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
