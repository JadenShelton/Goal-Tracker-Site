$(document).on('click', '.delete-btn', function() {
    if(!confirm('Are you sure you want to delete this goal?')) {
        return;
    }
    $.post('php/delete_goal.php', { id: $(this).data('id') }, function(data) {
        if(data.success) {
            loadGoals();
        } else {
            alert('Error deleting goal.');
        }
    });
});

$(document).on('click', '.update-btn', function() {
    let newValue = prompt('Enter your current progress:');
    if(newValue === null || newValue === '' || isNaN(newValue) || newValue < 0) {
        alert('Please enter a valid number.');
        return;
    } else {
        $.post('php/update_goal.php', { id: $(this).data('id'), current_value: newValue }, function(data) {
            if(data.success) {
                loadGoals();
            } else { 
                alert('Error updating goal.');
            }
        });
    }
});

$('#goal-form').on('submit', function(e) {
    e.preventDefault();

    let formData = $(this).serialize();

    $.post('php/create_goal.php', formData, function(data) {
        if(data.success) {
            window.location.href = 'index.html';
        } else {
            alert('Error creating goal.');
        }
    });
});

$(document).on('click', '.print-btn', function() {
    let card = $(this).closest('.goal-card');
    $('.goal-card').not(card).hide();
    window.print();
    $('.goal-card').show();
});
