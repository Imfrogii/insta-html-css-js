let photoPosts = [{
    id: '1',
    descriprion: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'aa2',
    photoLink: 'E:/web/img/photo1',
    hashtags: ["#ку", "#привет", "#ао"],
    likes: 160,
  },
  {
    id: '2',
    descriprion: 'Красота какая',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'aa1',
    photoLink: 'E:/web/img/photo2',
    hashtags:[],
    likes: 12,
  },
  {
    id: '3',
    descriprion: 'Красота какая',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'aa1',
    photoLink: 'E:/web/img/photo3',
    hashtags:["#ку"],
    likes: 125,
  },

];

function getAuthor(id) {
  for (let i = 0; i < photoPosts.length; i++) {
    if (photoPosts[i].id == id)
      return photoPosts[i].author;
  }
};

function getLikes(id) {
  for (let i = 0; i < photoPosts.length; i++) {
    if (photoPosts[i].id == id)
      return photoPosts[i].likes;
  }
};


function getDescripion(id) {
  for (let i = 0; i < photoPosts.length; i++) {
    if (photoPosts[i].id == id)
      return photoPosts[i].descriprion;
  }
};

function getDate(id) {
  for (let i = 0; i < photoPosts.length; i++) {
    if (photoPosts[i].id == id)
      return photoPosts[i].createdAt;
  }
};

function getImg(id) {
  for (let i = 0; i < photoPosts.length; i++) {
    if (photoPosts[i].id == id)
      return photoPosts[i].photoLink;
  }
};

String.prototype.replaceAll = function(search, replace){
return this.split(search).join(replace);
}

function getPhotoPosts(skip, top, ...filter) {
    if(filter.length>0){
    filteredArr = findFilter(...filter);
    for(let i = 0; i<filteredArr.length; i++){

    }
  }
}

function findFilter(...filter) {
  let n = arguments.length;
  let arrOfLex = "";
  let resArr = "";
  let endArr = [];
  for (let i = 0; i < filter.length; i++) {
    filter[i] = filter[i].toString();
    arrOfLex = filter[i].split(":")
    console.log(arrOfLex);

    switch (arrOfLex[0]) {
      case "author":
        arrOfLex[1] = arrOfLex[1].replace(/" "/g, "");
        for (let j = 0; j < photoPosts.length; j++) {
          if (photoPosts[j].author == arrOfLex[1]) {
            resArr += String(j);
            resArr += " ";
          }
        }
        break;
      //  console.log(resArr);

      case "createdAt":
        arrOfLex[1] = arrOfLex[1].replace(/" "/g, "");
        for (let j = 0; j < photoPosts.length; j++) {
          if (photoPosts[j].createdAt == arrOfLex[1]) {
            resArr += String(j);
            resArr += " ";
          }
        }
        break;

      case "hashtags":
        newArr = arrOfLex[1].split(" ");
        for (let j = 0; j < photoPosts.length; j++) {
          for (let k = 0; k < photoPosts[j].hashtags.length; k++) {
            for (let m = 0; m < newArr.length; m++) {
              if (photoPosts[j].hashtags[k].toLowerCase() == newArr[m].toLowerCase()) {
                resArr += String(j);
                resArr += " ";
                //console.log(resArr);
              }
            }
          }
        }
        break;
    }
  }
  var temp = resArr;
  while (resArr != "") {
    if (resArr[0] != " ") {

      if (temp.length - (resArr = resArr.replaceAll(resArr[0], "")).length == n) {//////////вот тут не проходит 2 элемент
        endArr.push(temp[0]);
      }
        temp = resArr;

    } else resArr = resArr.replace(resArr[0], "");
  }
  return endArr;
}

  console.log(getAuthor(2), getDate(2));
