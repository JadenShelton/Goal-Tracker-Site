function loadGoals() {
    $.get("php/get_goals.php", function(data) {
        console.log(data);
    });
 }

 loadGoals();
 