$(document).ready(function() {
    let debounceTimer;
    $('#search-bar').on('keyup', function() {
        clearTimeout(debounceTimer);
        const query = $(this).val();
        debounceTimer = setTimeout(function() {
            if (query.length > 0) {
                $.ajax({
                    url: 'http://localhost:3000/students',
                    method: 'GET',
                    success: function(data) {
                        const results = data.filter(student => student.name.toLowerCase().includes(query.toLowerCase()));
                        $('#search-results').empty()
                        results.forEach(student => {
                            $('#search-results').append(`<div class="result-item">${student.name}</div>`);
                        });
                    },
                    error: function() {
                        $('#search-results').empty();
                        $('#search-results').append('<div class="result-item">Error fetching results</div>');
                    }
                });
            } else {
                $('#search-results').empty();
            }
        }, 300);
    });
});