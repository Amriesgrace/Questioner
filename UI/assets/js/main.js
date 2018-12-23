

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
    
}


