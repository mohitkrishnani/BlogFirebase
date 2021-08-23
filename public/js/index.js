async function checkIfLoggedin(){
  var user = await firebase.auth().currentUser;
  return user===null
}

async function signIn(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    await firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    alert("User Signed in",user.email)
    // ...
    //location.replace("index.html")
    window.location.replace("view.html")
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage)
  });
}


function signUp(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var name = document.getElementById("name").value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    var curr = firebase.auth().currentUser
    if(curr){
      curr.updateProfile({displayName: name}).then((s) => console.log(s)).catch((err) => console.log(err));
    }
    alert("User Created"+user.email)
    window.location.replace("view.html")
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });
  
  
}

function signInwithGoogle(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
        
    /* @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    window.location.replace("view.html")
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  
}


function removeAllChild(parentId){
  while(parentId.hasChildNodes()){
    parentId.removeChild(parentId.firstChild)
  }
}

function getBlog(){
  var filter = document.getElementById("filter").value;
  if(filter == "2"){
    var user = firebase.auth().currentUser;
    removeAllChild(document.getElementById("card-container"))
    firebase.firestore().collection('blogs').where('email','==',user.email).onSnapshot(ss => {
      ss.forEach(element => {
        const ele = element.data();
        const container = document.getElementById("card-container");
	    	const card = document.createElement('div');
        card.style.width = "28%" 
		    card.setAttribute('class','card m-4 border border-2 border-success');
        const image = document.createElement('img');
		    image.setAttribute('class','card-img-top');
        image.style.maxHeight = "200px";
        image.style.maxWidth = "300px";
        image.style.height = "auto";
        image.style.width = "auto";
        
		    image.src = ele.image;
	
		    const contentContainer = document.createElement('div');
		    contentContainer.setAttribute('class','card-body bg-light');
		    //contentContainer.innerHTML = element.title;
        
        const name = document.createElement('h4');
  		  name.setAttribute('class','card-title');
        name.innerHTML = ele.displayName;

	
		    const title = document.createElement('h5');
  		  title.setAttribute('class','card-title text-muted');
        title.innerHTML = ele.title;

		    const cardtext = document.createElement('p');
		    cardtext.setAttribute('class','card-text');
        var content = "";
        if(ele.content.length > 60){
          content = ele.content.substring(0,54) + "..."
        }
        else{
          content = ele.content
        }
		    cardtext.innerHTML = content;
	
        
        card.appendChild(image)
        contentContainer.appendChild(name)
        contentContainer.appendChild(title)
        contentContainer.appendChild(cardtext)
        
        card.appendChild(contentContainer);
        container.appendChild(card)	
      })
    });
  }
  else if(filter == "1"){
    getAllBlogs()
  }

}

function getAllBlogs(){
  const db = firebase.firestore();
  
    removeAllChild(document.getElementById("card-container"));
    db.collection('blogs').get().then((snapshot) =>{
      snapshot.docs.forEach((element) => {
        const ele = element.data();
        const container = document.getElementById("card-container");
	    	const card = document.createElement('div');
        card.style.width = "28%" 
		    card.setAttribute('class','card m-4 border border-2 border-success');
        const image = document.createElement('img');
		    image.setAttribute('class','card-img-top');
        image.style.maxHeight = "200px";
        image.style.maxWidth = "300px";
        image.style.height = "auto";
        image.style.width = "auto";
        
		    image.src = ele.image;
	
		    const contentContainer = document.createElement('div');
		    contentContainer.setAttribute('class','card-body bg-light');
		    //contentContainer.innerHTML = element.title;
        
        const name = document.createElement('h4');
  		  name.setAttribute('class','card-title');
        name.innerHTML = ele.displayName;

	
		    const title = document.createElement('h5');
  		  title.setAttribute('class','card-title text-muted');
        title.innerHTML = ele.title;

		    const cardtext = document.createElement('p');
		    cardtext.setAttribute('class','card-text');
        var content = "";
        if(ele.content.length > 60){
          content = ele.content.substring(0,54) + "..."
        }
        else{
          content = ele.content
        }
		    cardtext.innerHTML = content;
        
        
        card.appendChild(image)
        contentContainer.appendChild(name)
        contentContainer.appendChild(title)
        contentContainer.appendChild(cardtext)
        
        card.appendChild(contentContainer);
        container.appendChild(card)
	    	
      });
    });
}

function sortData(){
  var db = firebase.firestore();
  var sort = document.getElementById("sortby").value;
  removeAllChild(document.getElementById("card-container"));
  if(sort == "1"){
    
    db.collection('blogs').orderBy('DOI').get().then((snapshot) =>{
      snapshot.docs.forEach((element) => {
        const ele = element.data();
        const container = document.getElementById("card-container");
	    	const card = document.createElement('div');
        card.style.width = "28%" 
		    card.setAttribute('class','card m-4 border border-2 border-success');
        const image = document.createElement('img');
		    image.setAttribute('class','card-img-top');
        image.style.maxHeight = "200px";
        image.style.maxWidth = "300px";
        image.style.height = "auto";
        image.style.width = "auto";
        
		    image.src = ele.image;
	
		    const contentContainer = document.createElement('div');
		    contentContainer.setAttribute('class','card-body bg-light');
		    //contentContainer.innerHTML = element.title;
        
        const name = document.createElement('h4');
  		  name.setAttribute('class','card-title');
        name.innerHTML = ele.displayName;

	
		    const title = document.createElement('h5');
  		  title.setAttribute('class','card-title text-muted');
        title.innerHTML = ele.title;

		    const cardtext = document.createElement('p');
		    cardtext.setAttribute('class','card-text');
        var content = "";
        if(ele.content.length > 60){
          content = ele.content.substring(0,54) + "..."
        }
        else{
          content = ele.content
        }
		    cardtext.innerHTML = content;
        
        
        card.appendChild(image)
        contentContainer.appendChild(name)
        contentContainer.appendChild(title)
        contentContainer.appendChild(cardtext)
        
        card.appendChild(contentContainer);
        container.appendChild(card)
	    	
      });
    });
  }
  else if(sort == "2"){
    db.collection('blogs').orderBy('DOI','desc').get().then((snapshot) =>{
      snapshot.docs.forEach((element) => {
        const ele = element.data();
        const container = document.getElementById("card-container");
	    	const card = document.createElement('div');
        card.style.width = "28%" 
		    card.setAttribute('class','card m-4 border border-2 border-success');
        const image = document.createElement('img');
		    image.setAttribute('class','card-img-top');
        image.style.maxHeight = "200px";
        image.style.maxWidth = "300px";
        image.style.height = "auto";
        image.style.width = "auto";
        
		    image.src = ele.image;
	
		    const contentContainer = document.createElement('div');
		    contentContainer.setAttribute('class','card-body bg-light');
		    //contentContainer.innerHTML = element.title;
        
        const name = document.createElement('h4');
  		  name.setAttribute('class','card-title');
        name.innerHTML = ele.displayName;

	
		    const title = document.createElement('h5');
  		  title.setAttribute('class','card-title text-muted');
        title.innerHTML = ele.title;

		    const cardtext = document.createElement('p');
		    cardtext.setAttribute('class','card-text');
        var content = "";
        if(ele.content.length > 60){
          content = ele.content.substring(0,54) + "..."
        }
        else{
          content = ele.content
        }
		    cardtext.innerHTML = content;
        
        
        card.appendChild(image)
        contentContainer.appendChild(name)
        contentContainer.appendChild(title)
        contentContainer.appendChild(cardtext)
        
        card.appendChild(contentContainer);
        container.appendChild(card)
	    	
      });
    });
  }
}
function addBlog(){
  var file = document.getElementById("imagefile").files[0];

  var title = document.getElementById("title").value;
  var desc = document.getElementById("desc").value;
  if(title == ""){
    alert("Title Missing");
  }
  else if(desc == ""){
    alert("Description missing")  
  }
  else if(file == null || file == undefined){
    alert("File is missing")
  }
  else{
    const name = new Date() +"-"+file.name;
  const metadata = {contentType : file.type};
  var ref = firebase.storage().ref().child(name);
  ref.put(file,metadata)
  .then(snapshot=>snapshot.ref.getDownloadURL())
  .then((url) => {
    var user = firebase.auth().currentUser;
    var obj = {
      "displayName" : user.displayName,
      "email" : user.email,
      "DOI" : new Date(),
      "title": title,
      "content" : desc,
      "image" : url
    };
    var db = firebase.firestore();
    db.collection('blogs').add(obj).then((ref) => {
      console.log("Document written with ID"+ref.id);
      alert("Blog has been posted!");
      window.location.replace('view.html');
    }).catch((err) => {console.log(err)});
  });


  }
}

function logout(){
  if(firebase.auth().currentUser != null){
    firebase.auth().signOut().then(() => {
      alert("You have been signed out")
      window.location.replace('index.html');
    })
  }
  else{
    alert("No user is signed in")
  }
  
}