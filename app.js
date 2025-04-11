// 🔥 Firebase Initialisieren (Deinen eigenen Code hier einfügen!)
const firebaseConfig = {
    apiKey: "AIzaSyAHDH2pk8DdZvorR0Tw-t8ZKO8bNZZ9PIg",
    authDomain: "chefsshareneo-96073.firebaseapp.com",
    projectId: "chefsshareneo-96073",
    storageBucket: "chefsshareneo-96073.firebasestorage.app",
    messagingSenderId: "142796578762",
    appId: "1:142796578762:web:e4e866a19513125361b933"
  };
  
  // Firebase initialisieren
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  // 📜 Rezepte aus der Datenbank holen
  function loadRecipes() {
    db.collection("recipes").get().then((querySnapshot) => {
      recipesGrid.innerHTML = "";
      querySnapshot.forEach((doc) => {
        const recipe = doc.data();
        addRecipeToDOM(recipe);
      });
    });
  }
  
  // ➕ Rezept zur Datenbank hinzufügen
  recipeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newRecipe = {
      title: document.getElementById('recipeTitle').value,
      ingredients: document.getElementById('recipeIngredients').value.split(','),
      instructions: document.getElementById('recipeInstructions').value,
      author: document.getElementById('recipeAuthor').value,
      timestamp: firebase.firestore.FieldValue.serverTimestamp() // Für Sortierung
    };
  
    // Rezept in Firebase speichern
    db.collection("recipes").add(newRecipe)
      .then(() => {
        recipeForm.reset();
        recipeForm.style.display = 'none';
      });
  });
  
  // 🔄 Echtzeit-Updates
  db.collection("recipes").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
    recipesGrid.innerHTML = "";
    snapshot.forEach((doc) => {
      addRecipeToDOM(doc.data());
    });
  });
  
  // 🖼️ Rezept anzeigen
  function addRecipeToDOM(recipe) {
    const recipeEl = document.createElement('div');
    recipeEl.className = 'recipe-card';
    recipeEl.innerHTML = `
      <h3>${recipe.title}</h3>
      <p><strong>Zutaten:</strong> ${recipe.ingredients.join(', ')}</p>
      <p><strong>Anleitung:</strong> ${recipe.instructions}</p>
      <p><strong>Autor:</strong> ${recipe.author}</p>
    `;
    recipesGrid.appendChild(recipeEl);
  }
  
  // 🔐 Login (Demo, ohne echte Authentifizierung)
  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    loginContainer.style.display = 'none';
    appContainer.style.display = 'block';
    loadRecipes();
  });