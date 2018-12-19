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
    ev.preventDefault();
}

submitBtn.addEventListener('click', signupValidation);