
 // Application id 
//Server url


 

init = async () => {
    $('#profileInfo').hide();

}

 login = async() => {

     var user = await Moralis.User.current();
     
     if(!user){
         var user = await Moralis.Web3.authenticate();
         $('#goodLogin').show();
     }
   
     if(user){
        $('#metamaskBtn').hide();
        $('#secondLogin').hide();
        $('#profileBtn').show();  
        $('#goodLogin').show();
       
     
      }

}

Moralis.Web3.onAccountsChanged( async ([accounts]) => {
    
    const confirmed = confirm("You are about to Link this address to your account, do you want too?");

    if (confirmed) {
      await Moralis.Web3.link(accounts);
      await Moralis.ERD.link(address);
      console.log(user);
    }


  });



logout = async () => {
   
    let user = await Moralis.User.logOut();

    $('#profileBtn').hide();
    $('#secondLogin').show();
    $('#metamaskBtn').show();
    $('#box').show();
    $('#goodLogout').show();
}

saveUserInfo = async() => {
    
    let user = await Moralis.User.current();
    
    if(!user){
        alert("You must login first with either your email and password or connect with wallet");
        $('#loginInform').show();
    }else{

        
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let email = document.getElementById("email").value;

   
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);
    
    if(avatarFile.files.lenght > 0){
        const avatar = new Moralis.File("avatar.jpg", avatarFile[0]);
        user.set('avatar', avatar);
    }
   
    await user.save();
   
    logout();
    $('#profileInform').show();
    }  

}







let hideElement = (element) => element.style.display = "none";
let showElement = (element) => element.style.display = "block";






init();
 