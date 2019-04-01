class PostCollection {
  constructor(posts) {
    this._photoPosts = posts; //.slice();
    this._sortDates = function compare(a, b) {
      return b.createdAt - a.createdAt;
    }
  }


  getPage(skip = 0, top = 10, filter) {
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
    if (filter===undefined) {
      answer = this._photoPosts.slice(skip, top + skip);
    } else {
      let filteredArr = this._findFilter(filter);
      if (skip > filteredArr.length) {
        return [];
      }
      answer = filteredArr.slice(skip, top);
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
      if (item.id == id) {
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

let posts = [
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


// console.log("collection.getPage(0, 10, {author: 'Орк', hashtags: ['#радость', '#caTS']})");
// console.log(collection.getPage(0, 10, {author: 'Орк', hashtags: ['#радость', '#caTS']}));
//
// console.log("collection.getPage(1, 10, {author: 'Орк', hashtags: ['#радость']})");
// console.log(collection.getPage(1, 10, {author: 'Орк', hashtags: ['#радость']}));
//
// console.log("collection.getPage({author: 'Орк', hashtags: ['#радость']}");
// console.log(collection.getPage({author: 'Орк', hashtags: ['#радость']}));
//
// console.log("collection.getPage(12, {author: 'Орк', hashtags: ['#радость']}");
// console.log(collection.getPage(12, {author: 'Орк', hashtags: ['#радость']}));
//
// console.log("collection.getPage(0, 10, {author: 'Орк[2]'}");
// console.log(collection.getPage(0, 10, {author: 'Орк[2]'}));
//
// console.log("collection.add({descriprion: 'Hello, 16', photoLink: 'images/example16', hashtags:['#JS']}");
// console.log(collection.add({descriprion: 'Hello, 16', photoLink: 'images/example16', hashtags:['#JS']}));
//
// console.log("collection.edit('1',{photoLink: 'images/Hello_JS.jpg'}");
// console.log(collection.edit('1',{photoLink: 'images/Hello_JS.jpg'}));
//
// console.log("collection.edit('1',{photoLink: ['Hello', 'Andrey']}");
// console.log(collection.edit('1',{photoLink: ['Hello', 'Andrey']}));
//
// console.log("collection.remove(\"0\")");
// console.log(collection.remove("0"));
//
// console.log("collection.get(\"0\")");
// console.log(collection.get("0"));
//
// console.log("collection.get(\"5\")");
// console.log(collection.get("5"));
//
// console.log("collection.add({descriprion: 'Hello, 16',author: 'WindowsUser',photoLink: 'images/example16', hashtags:['#JS']}");
// console.log(collection.add({descriprion: 'Hello, 16',author: 'WindowsUser',photoLink: 'images/example16', hashtags:['#JS']}));
//
// console.log("collection.getPage(0,5)");
// console.log(collection.getPage(0,5));
//
// console.log("collection.clear()");
// console.log(collection.clear());
//
// console.log("collection.add({descriprion: 'Hello, 16',author: 'WindowsUser',photoLink: 'images/example16', hashtags:['#JS']}");
// console.log(collection.add({descriprion: 'Hello, 16',author: 'WindowsUser',photoLink: 'images/example16', hashtags:['#JS']}));
//
// console.log("collection.addAll(morePosts)");
// console.log(collection.addAll(morePosts));
//
// console.log("collection.remove(\"50\")");
// console.log(collection.remove("50"));
//
// console.log("collection.add({descriprion: 'Hello, 16', photoLink: 'images/example16', hashtags:['#JS']}");
// console.log(collection.add({descriprion: 'Hello, 16', photoLink: 'images/example16', hashtags:['#JS']}));
//
// console.log("collection.add({descriprion: 'Hello, 16',author: 'WindowsUser', hashtags:['#JS']}");
// console.log(collection.add({descriprion: 'Hello, 16',author: 'WindowsUser', hashtags:['#JS']}));
//
// console.log("collection.add({descriprion: 'Hello, 16',author: 'WindowsUser',photoLink: 'images/example16', hashtags:['#JS']}");
// console.log(collection.add({descriprion: 'Hello, 16',author: 'WindowsUser',photoLink: 'images/example16', hashtags:['#JS']}));
