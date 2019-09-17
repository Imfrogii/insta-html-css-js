class PostCollection {
  constructor(posts) {
    this._photoPosts = posts; //.slice();
    this._sortDates = function compare(a, b) {
      return b.createdAt - a.createdAt;
    }
  }


  getPage(skip = 0, top = 10, filter = {}) {
    if (typeof(skip) === "object") {
      filter = skip;
      skip = 0;
    }
    if (typeof(top) === "object") {
      filter = top;
      top = 10;
    }
    // top = top || 10;
    let answer = [];
    if (filter != {}) {
      let filteredArr = this._findFilter(filter);

      if (skip > filteredArr.length) {
        return [];
      }
      answer = filteredArr.slice(skip, top);
    } else {
      answer = this._photoPosts.slice(skip, top + skip);
    }
    return answer.sort(this._sortDates);
  }




  _findFilter(filter) {
    let arrFilter = [];
    if (filter.author != undefined) {
      if (arrFilter.length === 0) {
        for (let item of this._photoPosts) {
          if (item.author === filter.author) {
            arrFilter.push(item);
          }
        }
      } else {
        let i = 0;
        for (let item of arrFilter) {
          if (item.author !== filter.author) {
            delete arrFilter[i];
          }
          i++;
        }
      }
      arrFilter.clean(undefined);
    }
    if (filter.hashtags != undefined) {
      if (arrFilter.length === 0) {
        for (let item of this._photoPosts) {
          let countTags = 0;
          for (let i = 0; i < item.hashtags.length; i++) {
            for (let j = 0; j < filter.hashtags.length; j++) {
              if (item.hashtags[i].toLowerCase() === filter.hashtags[j].toLowerCase()) {
                countTags++;
              }
            }
          }
          if (countTags >= filter.hashtags.length) {
            arrFilter.push(item);
          }
        }
      } else {
        let i = 0;
        for (let item of arrFilter) {
          let countTags = 0;
          for (let i = 0; i < item.hashtags.length; i++) {
            for (let j = 0; j < filter.hashtags.length; j++) {
              if (item.hashtags[i].toLowerCase() === filter.hashtags[j].toLowerCase()) {
                countTags++;
              }
            }
          }
          if (countTags < filter.hashtags.length) {
            delete arrFilter[i];
          }
          i++;
        }
      }
      arrFilter.clean(undefined);
    }

    if (filter.likes != undefined) {
      if (arrFilter.length === 0) {
        for (let item of this._photoPosts) {
          for (let i = 0; i < item.likes.length; i++) {
            if (item.likes[i].toLowerCase() === filter.likes.toLowerCase()) {
              arrFilter.push(item);
            }
          }
        }
      } else {
        let i = 0;
        for (let item of arrFilter) {
          let flag = false;
          for (let i = 0; i < item.likes.length; i++) {
            if (item.likes[i].toLowerCase() === arrFilter.likes.toLowerCase()) {
              flag = true;
            }
          }
          if (flag === false) {
            delete arrFilter[i];
          }
          i++;
        }
      }
      arrFilter.clean(undefined);
    }
    return arrFilter;
  }

  get(id) {
    for (let item of this._photoPosts) {
      if (item.id === id) {
        return item;
      }
    }
    return false;
  }

  static _validatePhotoPost(post) {
    if (post.id != undefined &&
      post.createdAt != undefined &&
      post.descriprion != undefined &&
      post.descriprion.length <= 200 &&
      post.descriprion.length > 0 &&
      post.author != undefined &&
      post.photoLink != undefined) {

      if ((typeof(post.id) == "string") &&
        (typeof(post.descriprion) == "string") &&
        (typeof(post.author) == "string") &&
        (typeof(post.photoLink) == "string") &&
        (post.createdAt instanceof Date)) {

        if ((Array.isArray(post.likes)) &&
          (Array.isArray(post.hashtags))) {
          return true;
        } else {
          return false;
        }
        return true;
      } else {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  add(photoPost) {
    if (this._photoPosts.length !== 0) {
      photoPost.id = ((parseInt((this._photoPosts[this._photoPosts.length - 1].id)) + 1) + "");
    } else photoPost.id = "0";
    photoPost.createdAt = new Date();
    photoPost.likes = [];
    if (photoPost.hashtags === undefined) {
      photoPost.hashtags = [];
    }
    if (PostCollection._validatePhotoPost(photoPost)) {
      this._photoPosts.push(photoPost);
      console.log(photoPost);
      console.log(this._photoPosts);
      return true;
    } else return false;
  }

  addAll(morePosts) {
    let badPosts = new Array();
    for (let i = 0; i < morePosts.length; i++) {
      if (this.add(morePosts[i]) === true) {
        this._photoPosts.push(morePosts[i]);
      } else badPosts.push(morePosts[i]);
    }
    return badPosts;
  }

  edit(id, photoPost) {
    let i = 0;
    for (let item of this._photoPosts) {
      if (item.id === id) {
        photoPost.id = item.id;
        photoPost.createdAt = item.createdAt;
        photoPost.likes = item.likes;
        photoPost.author = item.author;
        if (photoPost.hashtags === undefined) {
          photoPost.hashtags = item.hashtags;
        }
        if (photoPost.photoLink === undefined) {
          photoPost.photoLink = item.photoLink;
        }
        if (photoPost.descriprion === undefined) {
          photoPost.descriprion = item.descriprion;
        }
        if (PostCollection._validatePhotoPost(photoPost)) {
          this._photoPosts[i] = photoPost;
          console.log(photoPost);
          console.log(this._photoPosts);
          return true;
        } else return false;
      }
      i++;
    }
    return false;
  }

  remove(id) {
    let i = 0;
    for (let item of this._photoPosts) {
      if (item.id === id) {
        delete this._photoPosts[i];
        this._photoPosts.clean(undefined);
        console.log(this._photoPosts);
        return true;
      }
      i++;
    }
    return false;
  }



  clear() {
    while (this._photoPosts.length !== 0) {
      this._photoPosts.pop();
    }
    return true;
  }
}

Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

let posts = [{
    id: '1',
    descriprion: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
    createdAt: new Date('2018-06-03T23:00:00'),
    author: 'User1',
    photoLink: 'E:/web/img/photo1',
    hashtags: ["#ку", "#привет", "#ао"],
    likes: ["nnds", "dfg", "yyeh", "jsdfg"],
  },
  {
    id: '2',
    descriprion: 'Красота какая',
    createdAt: new Date('2018-02-11T23:00:00'),
    author: 'ALek',
    photoLink: 'E:/web/img/photo2',
    hashtags: ["#hi"],
    likes: ["2TTs", "lhdf", "tyho", "11G"],
  },
  {
    id: '3',
    descriprion: 'Красота какая[2]',
    createdAt: new Date('2018-03-23T23:00:00'),
    author: 'AjsS',
    photoLink: 'E:/web/img/photo3',
    hashtags: ["#ку"],
    likes: ["TTs", "lhdf", "yyeh", "jsdfg"],
  },
  {
    id: '4',
    descriprion: 'Добавил новую фотку',
    createdAt: new Date('2018-02-20T23:00:00'),
    author: 'Man',
    photoLink: 'E:/web/img/photo2',
    hashtags: ["#hi", "#add"],
    likes: [],
  },
  {
    id: '5',
    descriprion: 'Женщины - крута',
    createdAt: new Date('2018-12-12T23:00:00'),
    author: 'Women',
    photoLink: 'E:/web/img/photo3',
    hashtags: ["#ку"],
    likes: ["JSa"],
  },
  {
    id: '6',
    descriprion: 'иду в школу',
    createdAt: new Date('2018-02-04T23:00:00'),
    author: 'Child112',
    photoLink: 'E:/web/img/photo2',
    hashtags: [],
    likes: ["john", "YYf66", "Aleks", "Fedor", "JSa"],
  },
  {
    id: '7',
    descriprion: 'А как ваши дела',
    createdAt: new Date('2018-02-02T23:00:00'),
    author: 'Find_Me',
    photoLink: 'E:/web/img/photo3',
    hashtags: ["#ку"],
    likes: ["Aleks", "Fedor", "JSa"],
  },
  {
    id: '8',
    descriprion: 'Красиво',
    createdAt: new Date('2018-09-11T23:00:00'),
    author: 'Find_Me',
    photoLink: 'E:/web/img/photo3',
    hashtags: ["#ку", "#yyeh"],
    likes: ["Aleks", "Fedor", "JSa", "112", "Boy228"],
  },
  {
    id: '9',
    descriprion: 'Уехать бы сюда',
    createdAt: new Date('2018-12-10T23:00:00'),
    author: 'Bolll',
    photoLink: 'E:/web/img/photo3',
    hashtags: ["#krasota"],
    likes: ["Aleks", "Fedor", "JSa"],
  },
  {
    id: '10',
    descriprion: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
    createdAt: new Date('2018-10-03T23:00:00'),
    author: 'Admin',
    photoLink: 'E:/web/img/photo1',
    hashtags: ["#ку", "#привет", "#TOOOOp"],
    likes: ["User1", "dfg", "yyeh", "jsdfg"],
  },

  {
    id: '11',
    descriprion: 'Cборная Беларуси выиграла эстафету в Пхёнчхане!!!',
    createdAt: new Date('2018-09-09T23:00:00'),
    author: 'User1',
    photoLink: 'E:/web/img/photo1',
    hashtags: ["#sport", "#belarus", "#ао"],
    likes: ["nnds"],
  },
  {
    id: '12',
    descriprion: 'Работаю',
    createdAt: new Date('2018-03-03T23:00:00'),
    author: 'Орк',
    photoLink: 'E:/web/img/photo1',
    hashtags: ["#жизнь_за_нерзулла", "#построить", "#радость"],
    likes: ['Орк[1]', "Орк[2]"],
  },
  {
    id: '13',
    descriprion: 'Поздравляем наших девочек',
    createdAt: new Date('2018-01-05T23:00:00'),
    author: 'admin22',
    photoLink: 'E:/web/img/photo1',
    hashtags: ["#8марта", "#девочки", "#праздник"],
    likes: ["yyeh", "jsdfg"],
  },
  {
    id: '14',
    descriprion: 'Поздравляем нас',
    createdAt: new Date('2018-05-02T23:00:00'),
    author: 'ТвояМама',
    photoLink: 'E:/web/img/photo1',
    hashtags: [],
    likes: [],
  },

  {
    id: '15',
    descriprion: 'С 8 МАРТА!!!',
    createdAt: new Date('2018-06-09T23:00:00'),
    author: 'Девочка',
    photoLink: 'E:/web/img/photo1',
    hashtags: [],
    likes: ["Aleks", "Fedor", "JSa", "112", "Boy228"],
  },

  {
    id: '16',
    descriprion: 'мне подарили цветы дадада',
    createdAt: new Date('2018-01-03T23:00:00'),
    author: 'girl1',
    photoLink: 'E:/web/img/photo1',
    hashtags: ["#цветы", "#жизнб", "#радость"],
    likes: [],
  },
  {
    id: '17',
    descriprion: 'за Орудууу',
    createdAt: new Date('2018-16-03T23:00:00'),
    author: 'Орк',
    photoLink: 'E:/web/img/photo1',
    hashtags: ["#жизнь_за_нерзулла", "#построить", "#радость"],
    likes: ['OldFag', 'NewFag', 'SonO'],
  },
  {
    id: '18',
    descriprion: 'за Орудууу[2]',
    createdAt: new Date('2018-02-03T23:00:00'),
    author: 'Орк[2]',
    photoLink: 'E:/web/img/photo1',
    hashtags: ["#жизнь_за_нерзулла[2]", "#построить", "#радость"],
    likes: ['OldFag', 'NewFag'],
  },
  {
    id: '19',
    descriprion: 'за Орудууу[3]',
    createdAt: new Date('2018-06-04T23:00:00'),
    author: 'Орк[3]',
    photoLink: 'E:/web/img/photo1',
    hashtags: ["#жизнь_за_нерзулла", "#построить", "#работа-радость"],
    likes: ['OldFag', 'NewFag'],
  },
  {
    id: '20',
    descriprion: 'Урааа',
    createdAt: new Date('2018-06-05T23:00:00'),
    author: 'Aleks',
    photoLink: 'E:/web/img/photo1',
    hashtags: ["#жизнь_за_нерзулла", "#построить", "#радость"],
    likes: ['Aleks'],
  },
];

let morePosts = [{
    descriprion: 'за Орудууу[2]',
    photoLink: 'E:/web/img/photo1',
    hashtags: ["#жизнь_за_нерзулла[2]", "#построить", "#радость"],
  },
  {
    descriprion: "",
    author: 'Орк[5]',
    photoLink: 'E:/web/img/photo1',
    hashtags: ["#жизнь_за_нерзулла", "#построить", "#работа-радость"],
  },
  {
    descriprion: 'Урааа',
    author: 'Aleks',
    photoLink: 'E:/web/img/photo1',
    hashtags: ["#жизнь_за_нерзулла", "#построить", "#радость"],
  },
];

let collection = new PostCollection(posts);


console.log("collection.getPage(0, 10, {author: 'Орк', hashtags: ['#радость', '#caTS']})");
console.log(collection.getPage(0, 10, {author: 'Орк', hashtags: ['#радость', '#caTS']}));

console.log("collection.getPage(1, 10, {author: 'Орк', hashtags: ['#радость']})");
console.log(collection.getPage(1, 10, {author: 'Орк', hashtags: ['#радость']}));

console.log("collection.getPage({author: 'Орк', hashtags: ['#радость']}");
console.log(collection.getPage({author: 'Орк', hashtags: ['#радость']}));

console.log("collection.getPage(12, {author: 'Орк', hashtags: ['#радость']}");
console.log(collection.getPage(12, {author: 'Орк', hashtags: ['#радость']}));

console.log("collection.getPage(0, 10, {author: 'Орк[2]'}");
console.log(collection.getPage(0, 10, {author: 'Орк[2]'}));

console.log("collection.add({descriprion: 'Hello, 16', photoLink: 'images/example16', hashtags:['#JS']}");
console.log(collection.add({descriprion: 'Hello, 16', photoLink: 'images/example16', hashtags:['#JS']}));

console.log("collection.edit('1',{photoLink: 'images/Hello_JS.jpg'}");
console.log(collection.edit('1',{photoLink: 'images/Hello_JS.jpg'}));

console.log("collection.edit('1',{photoLink: ['Hello', 'Andrey']}");
console.log(collection.edit('1',{photoLink: ['Hello', 'Andrey']}));

console.log("collection.remove(\"0\")");
console.log(collection.remove("0"));

console.log("collection.get(\"0\")");
console.log(collection.get("0"));

console.log("collection.get(\"5\")");
console.log(collection.get("5"));

console.log("collection.add({descriprion: 'Hello, 16',author: 'WindowsUser',photoLink: 'images/example16', hashtags:['#JS']}");
console.log(collection.add({descriprion: 'Hello, 16',author: 'WindowsUser',photoLink: 'images/example16', hashtags:['#JS']}));

console.log("collection.getPage(0,5)");
console.log(collection.getPage(0,5));

console.log("collection.clear()");
console.log(collection.clear());

console.log("collection.add({descriprion: 'Hello, 16',author: 'WindowsUser',photoLink: 'images/example16', hashtags:['#JS']}");
console.log(collection.add({descriprion: 'Hello, 16',author: 'WindowsUser',photoLink: 'images/example16', hashtags:['#JS']}));

console.log("collection.addAll(morePosts)");
console.log(collection.addAll(morePosts));

console.log("collection.remove(\"50\")");
console.log(collection.remove("50"));

console.log("collection.add({descriprion: 'Hello, 16', photoLink: 'images/example16', hashtags:['#JS']}");
console.log(collection.add({descriprion: 'Hello, 16', photoLink: 'images/example16', hashtags:['#JS']}));

console.log("collection.add({descriprion: 'Hello, 16',author: 'WindowsUser', hashtags:['#JS']}");
console.log(collection.add({descriprion: 'Hello, 16',author: 'WindowsUser', hashtags:['#JS']}));

console.log("collection.add({descriprion: 'Hello, 16',author: 'WindowsUser',photoLink: 'images/example16', hashtags:['#JS']}");
console.log(collection.add({descriprion: 'Hello, 16',author: 'WindowsUser',photoLink: 'images/example16', hashtags:['#JS']}));
