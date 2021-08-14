//var user = await Moralis.Web3.authenticate();



async function init(){
    
    window.web3 = await Moralis.Web3.enable();
    let user = Moralis.User.current();

    if(!user){
        $('#connectToSignUp').show();
    }
     else {

        $('#login_btn').hide();   
        $('#connectToSignUp').hide();
        $('#profileBtn').show();
        $('#logout_btn').show();

        
    }

   // $('#logout_btn').hide();
  
   
}
 */




login = async () => {
    try{
        await Moralis.Web3.authenticate();
    } catch(error) {
        alert(error);
    }
}



async function login(){
   
    $('#logout_btn').hide();

    let user = await Moralis.Web3.authenticate();

    if(user){
        
        $('#login_btn').hide();
        $('#connectToSignUp').hide();
        $("#profileBtn").show();
        $('#logout_btn').show();
    }
}



 async function logout(){
     
    let user = await Moralis.User.logOut();

    $('#logout_btn').hide();
    $("#profileBtn").hide();
    $('#connectToSignUp').show();
    $('#login_btn').show();   

}

openUserInfo = async () => {
    user = await Moralis.User.current();

    if(user)
    {
        const username = user.get('username');
        if(username){
            userUsernameField.value = username;
        }
        else
        {
            userUsernameField.value = " ";
        }

        userEmailFeild.value = user.get('email');
        userPasswordFeild.value = user.get('password');
    }
}

saveUserInfo = async () => {
    
    user.set('username', userUserNameField.value);
    user.set('email', userEmailField.value);
    user.set('password', userPasswordField.value);

   await user.save();
    alert("your profile data has been saved");
    
}

async function signup(){

    let user = await Moralis.User.current();
   
    if(!user){
        login();

        $('#connectToSignUp').show();
    }
    
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let email = document.getElementById("email").value;
  


    user.set("username", username);
    user.set("password", password);
    user.set("email", email);

   await user.save();

  

   await Moralis.Cloud.run("sendEmail", {username, password, email,});
   logout();
   alert("Sign-up success! For your security you've been logged out. You can now login.");
 
   $('#box').hide();
   
}








    //helper methods
    hideElement = (element) => element.style.display = "none";
    showElement = (element) => element.style.display = "block";


     $('#profileInfo').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })



//const userConnectButton = document.getElementById("login_button");
//userConnectButton.onclick = login;

//const profileBtnInfo = document.getElementById('profileBtn');


init();

