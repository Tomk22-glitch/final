// Initialize EmailJS with your User ID.
emailjs.init('YOUR_USER_ID');

const studentNameInput = document.getElementById('studentName');
const submitBtn = document.getElementById('submitBtn');
const timerElement = document.getElementById('timer');
const minutes = 35;
let timeInSeconds = minutes * 60;
let timerInterval = null;
let timerStarted = false;

function updateTimer() {
    const displayMinutes = Math.floor(timeInSeconds / 60);
    const displaySeconds = timeInSeconds % 60;
    timerElement.textContent = `Time Remaining: ${String(displayMinutes).padStart(2, '0')}:${String(displaySeconds).padStart(2, '0')}`;
    timeInSeconds--;
    
    if (timeInSeconds < 0) {
        clearInterval(timerInterval);
        timerElement.textContent = "Time's up!";
        submitExam();
    }
}

function startTimer() {
    if (!timerStarted) {
        // Check if the name field is not empty before starting the timer
        if (studentNameInput.value.trim().length > 0) {
            timerInterval = setInterval(updateTimer, 1000);
            timerStarted = true;
        }
    }
}

function submitExam() {
    const studentName = studentNameInput.value.trim();
    if (!studentName) {
        // If the name is not entered, we'll still submit
        // with a default name when the timer runs out.
    }

    const answers = {};
    for(let i = 1; i <= 30; i++){
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        answers[`q${i}`] = selected ? selected.value : 'Not Answered';
    }

    for(let i = 31; i <= 50; i++){
        const textarea = document.querySelector(`textarea[name="q${i}"]`);
        answers[`q${i}`] = textarea ? textarea.value.trim() || 'Not Answered' : 'Not Answered';
    }

    const templateParams = {
        student_name: studentName || 'Unnamed Student',
        quiz_answers: JSON.stringify(answers, null, 2)
    };
    
    // Use your Service ID and Template ID.
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response){
            console.log('SUCCESS!', response.status, response.text);
            alert('Time is up! Your exam has been submitted automatically.');
            submitBtn.style.display = 'none';
            document.getElementById('confirmation').style.display = 'block';
        }, function(error){
            console.error('FAILED...', error);
            alert('Submission failed. Please try again. Check the browser console for details.');
        });
}

// The timer now starts only when the student leaves the name input field
studentNameInput.addEventListener('blur', startTimer);

submitBtn.addEventListener('click', function(event){
    event.preventDefault();
    if (!studentNameInput.value.trim()) {
        alert('Please enter your name before submitting.');
        return;
    }
    clearInterval(timerInterval); // Stop the timer when the user submits early
    submitExam();
});