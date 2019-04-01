let main = (function() {
      let photoPosts = new PostCollection([{
          id: '1',
          descriprion: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
          createdAt: new Date('2018-06-03T23:00:00'),
          author: 'User1',
          photoLink: 'img/photo1.jpg',
          hashtags: ["#ку", "#привет", "#ао"],
          likes: ["nnds", "dfg", "yyeh", "jsdfg"],
        },
        {
          id: '2',
          descriprion: 'Красота какая',
          createdAt: new Date('2018-02-11T23:00:00'),
          author: 'ALek',
          photoLink: 'img/photo2.jpg',
          hashtags: ["#hi"],
          likes: ["2TTs", "lhdf", "tyho", "11G"],
        },
        {
          id: '3',
          descriprion: 'Красота какая[2]',
          createdAt: new Date('2018-03-23T23:00:00'),
          author: 'AjsS',
          photoLink: 'img/photo3.jpg',
          hashtags: ["#ку"],
          likes: ["TTs", "lhdf", "yyeh", "jsdfg"],
        },
        {
          id: '4',
          descriprion: 'Добавил новую фотку',
          createdAt: new Date('2018-02-20T23:00:00'),
          author: 'Man',
          photoLink: 'img/photo2.jpg',
          hashtags: ["#hi", "#add"],
          likes: [],
        },
        {
          id: '5',
          descriprion: 'Женщины - крута',
          createdAt: new Date('2018-12-12T23:00:00'),
          author: 'Women',
          photoLink: 'img/photo3.jpg',
          hashtags: ["#ку"],
          likes: ["JSa"],
        },
        {
          id: '6',
          descriprion: 'иду в школу',
          createdAt: new Date('2018-02-04T23:00:00'),
          author: 'Child112',
          photoLink: 'img/photo2.jpg',
          hashtags: [],
          likes: ["john", "YYf66", "Aleks", "Fedor", "JSa"],
        },
        {
          id: '7',
          descriprion: 'А как ваши дела',
          createdAt: new Date('2018-02-02T23:00:00'),
          author: 'Find_Me',
          photoLink: 'img/photo3.jpg',
          hashtags: ["#ку"],
          likes: ["Aleks", "Fedor", "JSa"],
        },
        {
          id: '8',
          descriprion: 'Красиво',
          createdAt: new Date('2018-09-11T23:00:00'),
          author: 'Find_Me',
          photoLink: 'img/photo3.jpg',
          hashtags: ["#ку", "#yyeh"],
          likes: ["Aleks", "Fedor", "JSa", "112", "Boy228"],
        },
        {
          id: '9',
          descriprion: 'Уехать бы сюда',
          createdAt: new Date('2018-12-10T23:00:00'),
          author: 'Bolll',
          photoLink: 'img/photo3.jpg',
          hashtags: ["#krasota"],
          likes: ["Aleks", "Fedor", "JSa"],
        },
        {
          id: '10',
          descriprion: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
          createdAt: new Date('2018-10-03T23:00:00'),
          author: 'Admin',
          photoLink: 'img/photo1.jpg',
          hashtags: ["#ку", "#привет", "#TOOOOp"],
          likes: ["User1", "dfg", "yyeh", "jsdfg"],
        },

        {
          id: '11',
          descriprion: 'Cборная Беларуси выиграла эстафету в Пхёнчхане!!!',
          createdAt: new Date('2018-09-09T23:00:00'),
          author: 'User1',
          photoLink: 'img/photo1.jpg',
          hashtags: ["#sport", "#belarus", "#ао"],
          likes: ["nnds"],
        },
        {
          id: '12',
          descriprion: 'Работаю',
          createdAt: new Date('2018-03-03T23:00:00'),
          author: 'Орк',
          photoLink: 'img/photo1.jpg',
          hashtags: ["#жизнь_за_нерзулла", "#построить", "#радость"],
          likes: ['Орк[1]', "Орк[2]"],
        },
        {
          id: '13',
          descriprion: 'Поздравляем наших девочек',
          createdAt: new Date('2018-01-05T23:00:00'),
          author: 'admin22',
          photoLink: 'img/photo1.jpg',
          hashtags: ["#8марта", "#девочки", "#праздник"],
          likes: ["yyeh", "jsdfg"],
        },
        {
          id: '14',
          descriprion: 'Поздравляем нас',
          createdAt: new Date('2018-05-02T23:00:00'),
          author: 'ТвояМама',
          photoLink: 'img/photo1.jpg',
          hashtags: [],
          likes: [],
        },

        {
          id: '15',
          descriprion: 'С 8 МАРТА!!!',
          createdAt: new Date('2018-06-09T23:00:00'),
          author: 'Девочка',
          photoLink: 'img/photo1.jpg',
          hashtags: [],
          likes: ["Aleks", "Fedor", "JSa", "112", "Boy228"],
        },

        {
          id: '16',
          descriprion: 'мне подарили цветы дадада',
          createdAt: new Date('2018-01-03T23:00:00'),
          author: 'girl1',
          photoLink: 'img/photo1.jpg',
          hashtags: ["#цветы", "#жизнб", "#радость"],
          likes: [],
        },
        {
          id: '17',
          descriprion: 'за Орудууу',
          createdAt: new Date('2018-16-03T23:00:00'),
          author: 'Орк',
          photoLink: 'img/photo1.jpg',
          hashtags: ["#жизнь_за_нерзулла", "#построить", "#радость"],
          likes: ['OldFag', 'NewFag', 'SonO'],
        },
        {
          id: '18',
          descriprion: 'за Орудууу[2]',
          createdAt: new Date('2018-02-03T23:00:00'),
          author: 'Орк[2]',
          photoLink: 'img/photo1.jpg',
          hashtags: ["#жизнь_за_нерзулла[2]", "#построить", "#радость"],
          likes: ['OldFag', 'NewFag'],
        },
        {
          id: '19',
          descriprion: 'за Орудууу[3]',
          createdAt: new Date('2018-06-04T23:00:00'),
          author: 'Орк[3]',
          photoLink: 'img/photo1.jpg',
          hashtags: ["#жизнь_за_нерзулла", "#построить", "#работа-радость"],
          likes: ['OldFag', 'NewFag'],
        },
        {
          id: '20',
          descriprion: 'Урааа',
          createdAt: new Date('2018-06-05T23:00:00'),
          author: 'Aleks',
          photoLink: 'img/photo1.jpg',
          hashtags: ["#жизнь_за_нерзулла", "#построить", "#радость"],
          likes: ['Aleks'],
        },
      ]);
      let last3Filters = [{}];
      let inWhichFilter = 0;
      let userName = "admin";
      return {
        show() {
          View.showHeader();
        },
        showHelp(){
        View.showExamples(last3Filters,inWhichFilter);
      },
        get(skip = 0, top = 10, filterConfig) {
          if (typeof(skip) === "object") {
            filterConfig = skip;
            skip = 0;
          }
          if (typeof(top) === "object") {
            filterConfig = top;
            top = 10;
          }
          if (filterConfig !== undefined) {
            if (inWhichFilter === 2)
              inWhichFilter = 0;
            last3Filters[inWhichFilter] = filterConfig;
            inWhichFilter++;
          }
          View.clear();
          let showPhotoPosts = photoPosts.getPage(skip, top, filterConfig);

          for (let item of showPhotoPosts)
            View.showPost(item);
            View.showExamples(last3Filters,inWhichFilter);
        },

        add(post) {
          if (userName!=="")
            post.author = userName;
          if (photoPosts.add(post)) {
            this.get(0, 10, last3Filters[inWhichFilter]);
            return true;
          }
          return false;
        },

        deletePost(id) {
          if (userName !== "") {
            if (photoPosts.remove(id)) {
              // this.get(0, 10, last3Filters[inWhichFilter]);
              View.delete(id);
              return true;
            } else return false;
          } else return false;
        },

        editPost(id, post) {
          if (userName !== "") {
            if (photoPosts.edit(id, post)) {
              // this.get(0, 10, last3Filters[inWhichFilter]);
              View.refactor(id,post);
              return true;
            } else return false;
          }
          return false;
        }


        }
      }());

    main.show();


    main.get(0,5);
    main.get(0,2);
    main.editPost('1',{descriprion:"Hi Guys", hashtags:["#Js","#JavaScript"]});
    main.deletePost(2);
    // main.deletePost(5);
    main.get({author: "Aleks"});
    main.showHelp();
    // main.get();
