const inputUsername = document.getElementById("input-user-name");
const inputPassword = document.getElementById("input-password");

const logInFunction=()=>{
    const userName= inputUsername.value;
    const userPassword= inputPassword.value;

    if(userName==="admin" && userPassword=="admin123"){
        window.location.href = "./home.html";
    }else{
        alert("Please enter the correct password!")
    }
    

}