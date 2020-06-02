var app1 = new Vue ({
    el: '#app1',
    data: {
     WhatWeCanDo : [
        {
           "caption" : "Стильные прически",
           "description" : "Важный элемент вашего образа, правильно подобраная прическа подчеркнет форму лица." ,
           "imgsrc" : "assets/images/services/4.png"
        },
        {
            "caption" : "Коррекция бороды",
            "description" : "Грамотная коррекция — это симметричность и четкие линии, аккуратность и презентабельность бороды.",
            "imgsrc" : "assets/images/services/5.png"
        },
        {
            "caption" : "Королевское бритьё",
            "description" : "Правильная опасная бритва и барбер, умеющий с ней обращаться, не пропустят ни одного волоска." ,
            "imgsrc" : "assets/images/services/6.png"
        }

     ]
    }
})


var app2 = new Vue({
   el: '#app2',
   data:{
      services : [
         {"id":"1", "name" : "МУЖСКАЯ СТРИЖКА","price" : "200 ₴"},
         {"id":"2","name" : "СТРИЖКА + БОРОДА","price" : "300 ₴"},
         {"id":"3","name" : "КОРЕКЦИЯ БОРОДЫ","price" : "100 ₴"},
         {"id":"4","name" : "КОРОЛЕВСКОЕ БРИТЬЕ","price" : "150 ₴"},
         {"id":"5","name" : "ДЕТСКАЯ СТРИЖКА","price" : "150 ₴"},
         {"id":"6","name" : "УДАЛЕНИЕ ВОЛОС ГОРЯЧИМ ВОСКОМ","price" : "50 ₴"},
         {"id":"7","name" : "КАМУФЛЯЖ СЕДИНЫ","price" : "200 ₴"}
     ]
   }
})




var app3 = new Vue({
   el: '#app3',
   data:{
      gallery : [  
                       {"imgsrc" : "assets/images/gallery/3col/1.jpg"},
                       {"imgsrc" : "assets/images/gallery/3col/2.jpg"},
                       {"imgsrc" : "assets/images/gallery/3col/3.jpg"},
                       {"imgsrc" : "assets/images/gallery/3col/4.jpg"},
                       {"imgsrc" :"assets/images/gallery/3col/5.jpg"},
                       {"imgsrc" : "assets/images/gallery/3col/6.jpg"},
                       {"imgsrc" :"assets/images/gallery/3col/7.jpg"},
                       {"imgsrc" : "assets/images/gallery/3col/8.jpg"},
                       {"imgsrc" :  "assets/images/gallery/3col/9.jpg"}                        
      ]
   }
})






var app4 = new Vue({
   el: '#app4',
   data:{
      masters : [
         {
            "id" : "1",
            "imgsrc" : "assets/images/team/grid/1.jpg",
            "name" : "Ryan Printz",
            "position" : "Barber"
         },
         {
            "id" : "2",
            "imgsrc" : "assets/images/team/grid/2.jpg",
            "name" : "Steve Martin",
            "position" : "Barber"
         },
         {
            "id" : "3",
            "imgsrc" : "assets/images/team/grid/3.jpg",
            "name" : "Bruce Sam",
            "position" : "Barber"
         },
         {
            "id" : "4",
            "imgsrc" : "assets/images/team/grid/4.jpg",
            "name" : "Mark Smith",
            "position" : "Barber"
         },
         {
            "id" : "5",
            "imgsrc" : "assets/images/team/grid/5.jpg",
            "name" : "Andrew John",
            "position" : "Barber"
         },
         {
            "id" : "6",
            "imgsrc" : "assets/images/team/grid/6.jpg",
            "name" : "AKevin Benny",
            "position" : "Barber"
         }

      ]

   }





})