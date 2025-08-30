    // Initialize EmailJS with placeholder public key. Replace before using.
    (function(){
      // use your public key here:
      emailjs.init('vicdmYtMuLYghrwuK');
    })();

    // Correct answers mapping for Q1–Q30 (as per the questions above)
    const correctAnswers = {
      q1: "b", q2: "a", q3: "a", q4: "b", q5: "a",
      q6: "c", q7: "a", q8: "b", q9: "c", q10: "b",
      q11: "b", q12: "a", q13: "a", q14: "a", q15: "a",
      q16: "b", q17: "a", q18: "b", q19: "a", q20: "a",
      q21: "a", q22: "c", q23: "b", q24: "b", q25: "d",
      q26: "a", q27: "a", q28: "b", q29: "b", q30: "a"
    };

    // Score checker for theory section
    document.getElementById('checkScoreBtn').addEventListener('click', function(){
      let score = 0;
      for (let i = 1; i <= 30; i++) {
        const sel = document.querySelector(`input[name="q${i}"]:checked`);
        if (sel && sel.value === correctAnswers[`q${i}`]) score++;
      }
      document.getElementById('result').textContent = `You scored ${score} out of 30 in Section A (Theory).`;
    });

    // Submit all answers via EmailJS (placeholders for service/template)
    document.getElementById('submitBtn').addEventListener('click', function(){
      const form = document.getElementById('quizForm');
      const studentName = document.getElementById('studentName').value.trim() || 'N/A';

      // Build answers text
      let answersText = '';
      for (let i = 1; i <= 30; i++) {
        const sel = form.querySelector(`input[name="q${i}"]:checked`);
        answersText += `Q${i}: ${sel ? sel.value : 'Not answered'}\n`;
      }
      for (let i = 31; i <= 50; i++) {
        const ta = form.querySelector(`textarea[name="q${i}"]`);
        answersText += `Q${i}: ${ta ? (ta.value.trim() || 'Not answered') : 'Not answered'}\n`;
      }

      const templateParams = {
        student_name: studentName,
        quiz_answers: answersText
      };

      // Replace the placeholders below with your actual EmailJS service ID and template ID
      const SERVICE_ID = 'service_7dkh1i6';
      const TEMPLATE_ID = 'template_ieram59';

      // Basic validation: ensure student name is filled
      if (studentName === 'N/A') {
        alert('Please enter student name before submitting.');
        return;
      }

      emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
        .then(function(response){
          alert('✅ Submission sent to teacher successfully!');
        }, function(error){
          console.error('EmailJS error:', error);
          alert('❌ Failed to send. Check console for details and ensure you replaced EmailJS placeholders.');
        });
    });

    // Simple progress bar update on scroll
    window.addEventListener('scroll', function(){
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (height > 0) ? (winScroll / height) * 100 : 0;
      document.getElementById('progress-bar').style.width = scrolled + '%';
    });