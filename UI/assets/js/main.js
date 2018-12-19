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
        alert('passwords do not match');
    }
}

submitBtn.addEventListener('click', signupValidation);