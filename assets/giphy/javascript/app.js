$(document).ready(function (){

//CREATE YOUR VARIABLES
var miyazaki = ['Ponyo', 'Spirited Away', 'Princess Mononoke','Howls Moving Castle', 'Kikis Delivery Service', 'My Neighbor Totoro', 'Whisper of the Heart' ];

//FUNCTIONS
//GENERIC FUNCTION FOR DISPLAYING DATA

function renderButtons(){
    $('#buttonsView').empty(); //DELETES THE IMAGES PRIOR TO ADDING NEW ONES

//CREATE BUTTONS FROM THE TOPICS ARRAY 

    for(var i = 0; i < miyazaki.length; i++){
        var b = $('<button>'); //JQUERY NEEDS TO CREATE THE BEGINNING AND END TAG
        b.addClass('miyazaki'); //ADDED A CLASS
        b.attr('data-name', miyazaki[i]);//ADDED A DATA-ATTRIBUTE
        b.text(miyazaki[i]); //INITIAL BUTTON TEXT
        b.attr('data-state', $(this).attr('data-state', 'animate'));
        $('#buttonsView').append(b);//ADDS THE BUTTON TO THE HTML
    }
}

$('#addMiyazaki').on('click', function(){ //HANDLES EVENTS WHERE ONE BUTTON IS CLICKED
    var miyazaki = $('#miyazaki-input').val().trim(); //GRABS THE INPUT FROM THE TEXTBOX
    miyazaki.push(miyazaki); //TEXTBOX IS THEN ADDED TO OUR ARRAY
    renderButtons(); //HANDLES THE PROCESSING OF OUR HEROS ARRAY
    return false; //USER IS ABLE TO HIT ENTER INSTEAD OF CLICK 

});
renderButtons();

$(document).on('click', '.miyazaki', function(){
    var miyazaki = $(this).data('name');
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + miyazaki + "&api_key=dc6zaTOxFJmzC&limit=10";
    

//AJAX CALL TO THE API     
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response){
        console.log(queryURL);
        console.log(response);
        var results = response.data;
        $('#gifsAppearHere').empty();
        for(var i = 0; i < results.length; i++){ //CREATE BUTTONS FROM THE TOPICS ARRAY
            var miyazakiDiv = $('<div id="miyazakiDiv">');
            var p = $('<p>').text("Rating: " + results[i].rating);
            var miyazakiImage = $('<img>');
            miyazakiImage.attr('src', results[i].images.fixed_height_still.url);
            miyazakiImage.attr('data-still', results[i].images.fixed_height_still.url);
            miyazakiImage.attr('data-animate', results[i].images.fixed_height.url);
            miyazakiImage.attr('class', 'miyazakiImage');
            miyazakiImage.attr('data-state', 'still');
            miyazakiDiv.append(p);
            miyazakiDiv.append(miyazakiImage);
            $('#gifsAppearHere').append(miyazakiDiv);
        }

    });
//CAPTURE BUTTON CLICK HERE ON THE IMAGES
    $(document).on('click', '.miyazakiImage', function(){
            var state = $(this).attr('data-state');
            if(state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
                console.log(this);
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
                console.log(this);
            }

    });

});

});