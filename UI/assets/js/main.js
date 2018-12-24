

const app ={
    signupValidation: () => {
        const submitBtn = document.getElementById('signup_btn');
        const register = {
            phoneNumber: document.getElementById('phone_number'),
            password: document.getElementById('password'),
            confirmPassword: document.getElementById('password2')
        }

        const signupValidation = (ev) => {
            const phoneVal = register.phoneNumber.value
            console.log(phoneVal);
            if( phoneVal.length != 11) {
                console.log('your phone number should be 11 digits');
            }
            passwordCheck();
            ev.preventDefault();
        }

        const passwordCheck = () => {
            if(register.password.value !== register.confirmPassword.value) {
                register.confirmPassword.setCustomValidity('Passwords do not match!');
            }
        }

        submitBtn.addEventListener('click', signupValidation);
    },
    navbarToggler: () => {
        const navBtn = document.getElementById('navbar_toggler');
        const navMenu = document.getElementById('nav_menu');
        
        const navHandler = () => {
            if (navMenu.classList.contains('collapse')) {
                showCollapsedNav();
                console.log('yes');
                
            } else{
                console.log('no');
                hideNav();
              }
            };
            const showCollapsedNav = () => {
              navMenu.classList.remove('collapse');
              navMenu.classList.add('show');
            };
            const hideNav = () => {
              navMenu.classList.remove('show');
              navMenu.classList.add('collapse');
        };
        navBtn.addEventListener('click', navHandler);
        
    },
    initQuestionModal: () => {
        const modal = document.getElementById('question_modal');
        const startQuestionModal = document.getElementById('question_btn');
        const cancelBtn = document.getElementById('cancel_btn');
        const closeModal = document.getElementById('close');
        
    
        const activateModal = (ev) => {
          modal.style.display = 'block';
        };
        const activateCloseModal = (ev) => {
          modal.style.display = 'none';
        };
        const modalBackdrop = (ev) => {
          if (ev.target == modal) {
            modal.style.display = 'none';
          }
        };
        const altCloseModal = () => {
            modal.style.display= 'none';
        }

    
        startQuestionModal.addEventListener('click', activateModal);
        cancelBtn.addEventListener('click', activateCloseModal);
        window.addEventListener('click', modalBackdrop);
        closeModal.addEventListener('click', altCloseModal);
        // deleteProductBtn.addEventListener('click', confirmAction);
    }
    
}


