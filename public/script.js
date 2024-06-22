document.addEventListener('DOMContentLoaded', () => {
    let userId = localStorage.getItem('userId');
    if (!userId) {
        userId = uuidv4();
        localStorage.setItem('userId', userId);
    }

    document.getElementById('pickButton').addEventListener('click', () => {
        fetch('/pick-team', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId })
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    document.getElementById('result').innerText = data.message;
                } else {
                    document.getElementById('result').innerText = `Your team is: ${data.team}`;
                    document.getElementById('pickButton').disabled = true;
                }
            });
    });
});

// UUID generation function
function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}
