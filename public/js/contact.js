var config = {
    apiKey: process.env.FIREBASE_KEY,
    authDomain: process.env.FIREBASE_DOMAIN,
    databaseURL: process.env.FIREBASE_URL,
    projectId: process.env.FIREBASE_PROJECT,
    storageBucket: process.env.FIREBASE_STORAGE,
    messagingSenderId: process.env.FIREBASE_SENDER
};
firebase.initializeApp(config);
database = firebase.database();
$("#submit").on("click", function (event) {
    event.preventDefault();
    var name = $("#name-input").val().trim();
    var email = $("#email-input").val();
    var comment = $("#text-input").val();
    console.log(email);
    console.log(comment);
    database.ref().push({
        name: name,
        email: email,
        comment: comment
    })
    $("#email-input").val("");
    $("#text-input").val("");
})
database.ref().on("child_added", function (snapshot) {
    var name = snapshot.val().name;
    var email = snapshot.val().email;
    var comment = snapshot.val().comment;
    var key = snapshot.key;
    $("#comments").append("<div class='card' id='ind-comment' data-key='" + key + "'>" +
        "<h5 class='card-header'>" + name + " (" + email + ")" + "</h5>" +
        "<div class='card-body'>" +
        '<p class="card-text">' + comment + "</p>" +
        '<button type="remove" class="btn btn-primary" id="remove">Remove</button>' +
        "</div></div>" + "<br>");
});
$("#comments").on("click", "#remove", function () {

    var key = $(this).parent().parent().attr("data-key");
    console.log(key);
    database.ref().child(key).remove();
    $(this).parent().parent().remove();
});