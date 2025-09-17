        // Current user state
        let currentUser = null;
        let currentDate = new Date(2023, 8, 1); // September 2023
        
        // Page Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const pageId = this.getAttribute('data-page');
                showPage(pageId);
            });
        });

        // Button event handlers
        document.getElementById('loginBtn').addEventListener('click', function(e) {
            e.preventDefault();
            showPage('login');
        });

        document.getElementById('registerBtn').addEventListener('click', function(e) {
            e.preventDefault();
            showPage('register');
        });

        document.getElementById('formBtn').addEventListener('click', function(e) {
            e.preventDefault();
            // In a real app, would check if user is logged in first
            showPage('dashboard');
        });

        document.getElementById('appointmentBtn').addEventListener('click', function(e) {
            e.preventDefault();
            // In a real app, would check if user is logged in first
            showPage('dashboard');
        });

        document.getElementById('goToRegister').addEventListener('click', function(e) {
            e.preventDefault();
            showPage('register');
        });

        document.getElementById('goToLogin').addEventListener('click', function(e) {
            e.preventDefault();
            showPage('login');
        });

        // Show the specified page and hide all others
        function showPage(pageId) {
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            document.getElementById(pageId).classList.add('active');
            
            // If showing dashboard, render the calendar
            if (pageId === 'dashboard') {
                renderCalendar();
            }
            
            // Scroll to top
            window.scrollTo(0, 0);
        }

        // Font size adjustment
        document.getElementById('fontIncrease').addEventListener('click', function() {
            changeFontSize(1);
        });

        document.getElementById('fontDecrease').addEventListener('click', function() {
            changeFontSize(-1);
        });

        document.getElementById('fontReset').addEventListener('click', function() {
            document.body.style.fontSize = '';
        });

        function changeFontSize(direction) {
            const currentSize = parseFloat(getComputedStyle(document.body).fontSize);
            document.body.style.fontSize = `${currentSize + direction}px`;
        }

        // Language selection
        document.getElementById('languageSelect').addEventListener('change', function() {
            // In a real application, this would change the language of the content
            alert(`Language changed to ${this.options[this.selectedIndex].text}`);
        });

        // Form validation
        document.getElementById('loginSubmit').addEventListener('click', function() {
            let isValid = true;
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // Validate email/phone
            if (!email) {
                document.getElementById('loginEmailGroup').classList.add('error');
                isValid = false;
            } else {
                document.getElementById('loginEmailGroup').classList.remove('error');
            }
            
            // Validate password
            if (!password) {
                document.getElementById('loginPasswordGroup').classList.add('error');
                isValid = false;
            } else {
                document.getElementById('loginPasswordGroup').classList.remove('error');
            }
            
            if (isValid) {
                // Show loading spinner
                document.getElementById('loginSpinner').style.display = 'block';
                
                // Simulate login process
                setTimeout(function() {
                    document.getElementById('loginSpinner').style.display = 'none';
                    document.getElementById('loginSuccess').style.display = 'block';
                    
                    // Set current user
                    currentUser = {
                        name: "John Doe",
                        email: email
                    };
                    
                    // Redirect to dashboard after success
                    setTimeout(function() {
                        showPage('dashboard');
                    }, 1500);
                }, 2000);
            }
        });
        
        document.getElementById('registerSubmit').addEventListener('click', function() {
            let isValid = true;
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Validate full name
            if (!fullName) {
                document.getElementById('fullNameGroup').classList.add('error');
                isValid = false;
            } else {
                document.getElementById('fullNameGroup').classList.remove('error');
            }
            
            // Validate email
            if (!email || !email.includes('@')) {
                document.getElementById('emailGroup').classList.add('error');
                isValid = false;
            } else {
                document.getElementById('emailGroup').classList.remove('error');
            }
            
            // Validate phone
            if (!phone || phone.length < 10) {
                document.getElementById('phoneGroup').classList.add('error');
                isValid = false;
            } else {
                document.getElementById('phoneGroup').classList.remove('error');
            }
            
            // Validate password
            if (!password || password.length < 8) {
                document.getElementById('passwordGroup').classList.add('error');
                isValid = false;
            } else {
                document.getElementById('passwordGroup').classList.remove('error');
            }
            
            // Validate confirm password
            if (password !== confirmPassword) {
                document.getElementById('confirmPasswordGroup').classList.add('error');
                isValid = false;
            } else {
                document.getElementById('confirmPasswordGroup').classList.remove('error');
            }
            
            if (isValid) {
                // Show loading spinner
                document.getElementById('registerSpinner').style.display = 'block';
                
                // Simulate registration process
                setTimeout(function() {
                    document.getElementById('registerSpinner').style.display = 'none';
                    document.getElementById('registerSuccess').style.display = 'block';
                    
                    // Redirect to login after success
                    setTimeout(function() {
                        showPage('login');
                    }, 2000);
                }, 2000);
            }
        });
        
        // Calendar functionality
        function renderCalendar() {
            const calendarGrid = document.getElementById('calendarGrid');
            const monthYearElement = document.getElementById('currentMonth');
            
            // Clear previous calendar
            calendarGrid.innerHTML = '';
            
            // Set month/year header
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            monthYearElement.textContent = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
            
            // Add day headers
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            days.forEach(day => {
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day';
                dayElement.textContent = day;
                calendarGrid.appendChild(dayElement);
            });
            
            // Get first day of month and number of days
            const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
            const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
            
            // Add empty cells for days before the first day of the month
            for (let i = 0; i < firstDay; i++) {
                const emptyDay = document.createElement('div');
                emptyDay.className = 'calendar-day';
                calendarGrid.appendChild(emptyDay);
            }
            
            // Add cells for each day of the month
            for (let i = 1; i <= daysInMonth; i++) {
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day';
                dayElement.textContent = i;
                
                // Mark today (if applicable)
                const today = new Date();
                if (currentDate.getMonth() === today.getMonth() && 
                    currentDate.getFullYear() === today.getFullYear() && 
                    i === today.getDate()) {
                    dayElement.classList.add('active');
                }
                
                // Randomly mark some days as having appointments (for demo)
                if (Math.random() > 0.7) {
                    dayElement.classList.add('has-appointment');
                }
                
                calendarGrid.appendChild(dayElement);
            }
        }
        
        // Calendar navigation
        document.getElementById('prevMonth').addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });
        
        document.getElementById('nextMonth').addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });
        
        // Appointment modal
        document.getElementById('scheduleAppointmentCard').addEventListener('click', function() {
            document.getElementById('appointmentModal').classList.add('active');
        });
        
        document.getElementById('submitFormCard').addEventListener('click', function() {
            alert('Form submission feature would open here.');
        });
        
        document.getElementById('closeModal').addEventListener('click', function() {
            document.getElementById('appointmentModal').classList.remove('active');
        });
        
        document.getElementById('confirmAppointment').addEventListener('click', function() {
            const type = document.getElementById('appointmentType').value;
            const date = document.getElementById('appointmentDate').value;
            const time = document.getElementById('appointmentTime').value;
            
            if (!type || !date || !time) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Show success message
            alert(`Appointment scheduled for ${date} at ${time}!`);
            
            // Close modal
            document.getElementById('appointmentModal').classList.remove('active');
            
            // Reset form
            document.getElementById('appointmentType').value = '';
            document.getElementById('appointmentDate').value = '';
            document.getElementById('appointmentTime').value = '';
            document.getElementById('appointmentNotes').value = '';
        });
        
        // Initialize calendar on page load
        window.addEventListener('load', function() {
            renderCalendar();
        });