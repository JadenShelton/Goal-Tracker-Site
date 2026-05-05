function loadGoals() {
    $.get("php/get_goals.php", function(data) {
        $('#goal-list').empty();
        if(data.length === 0) {
            $('#empty-state').show();
        } else {
            $('#empty-state').hide();
            const today = new Date();
            $.each(data, function(i, goal) {
                let goalProgress = ((goal.current_value - goal.start_value) / (goal.target_value - goal.start_value)) * 100;
                const targetDate = new Date(goal.deadline);
                const differenceInMs = targetDate - today;
                const differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));

                let goalCard = $('<div class="goal-card">' + '<div class="goal-category">'+ goal.category +'</div>'
                    + '<div class="goal-title">' + goal.title + '</div>'
                    + '<div class="goal-description">' + goal.description + '</div>'
                    + '<div class="goal-progress">'+ goalProgress + '%' +'</div>'
                    + '<div class="goal-status">'+ goal.current_value +'/'+ goal.target_value + ' ' + goal.unit +'</div>'
                    + '<div class="goal-remainingTime">'+ differenceInDays + ' days remaining</div>'
                    + '<div class="goal-buttons"><button class="update-btn" data-id="'+ goal.id +'">Update</button><button class="delete-btn" data-id="'+ goal.id +'">Delete</button><button class="print-btn" data-id="'+ goal.id +'">Print</button></div>'
                    + '</div>');

                $('#goal-list').append(goalCard);
            });
        }
    });
 }

$(document).ready(function() {
    loadGoals();
});