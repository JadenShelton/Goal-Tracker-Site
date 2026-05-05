function loadGoals() {
    $.get("php/get_goals.php", function(data) {
        $('#goal-list').empty();

        let total = data.length;
        let completed = 0;
        let inProgress = 0;

        if(data.length === 0) {
            $('#empty-state').show();
        } else {
            $('#empty-state').hide();
            const today = new Date();

            $.each(data, function(i, goal) {
                let goalProgress;
                if(goal.target_value < goal.start_value) {
                    goalProgress = ((goal.start_value - goal.current_value) / (goal.start_value - goal.target_value)) * 100;
                } else {
                    goalProgress = ((goal.current_value - goal.start_value) / (goal.target_value - goal.start_value)) * 100;
                }
                let progress = Math.min(100, goalProgress).toFixed(1);

                const targetDate = new Date(goal.deadline);
                const differenceInMs = targetDate - today;
                const differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));

                let goalCard = $('<div class="goal-card">' + '<div class="goal-category">'+ goal.category +'</div>'
                    + '<div class="goal-title">' + goal.title + '</div>'
                    + '<div class="goal-description">' + goal.description + '</div>'
                    + '<div class="progress-bar-container"><div class="progress-bar-fill" style="width: ' + progress + '%">'+ progress + '%' +'</div></div>'
                    + '<div class="goal-status">'+ goal.current_value +'/'+ goal.target_value + ' ' + goal.unit +'</div>'
                    + '<div class="goal-remainingTime">'+ differenceInDays + ' days remaining</div>'
                    + '<div class="goal-buttons"><button class="update-btn" data-id="'+ goal.id +'">Update</button><button class="delete-btn" data-id="'+ goal.id +'">Delete</button><button class="print-btn" data-id="'+ goal.id +'">Print</button></div>'
                    + '</div>');

                $('#goal-list').append(goalCard);

                if(progress >= 100) {
                    completed++;
                } else {
                    inProgress++;
                }
            });
        }

        $('#total-goals').text('Total Goals: ' + total);
        $('#completed').text('Completed: ' + completed);
        $('#in-progress').text('In Progress: ' + inProgress);
    });
 }



$(document).ready(function() {
    loadGoals();
});